"use client";

import { ArrowLeft, ArrowRight, Check, Clock3, Copy, KeyRound } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";

import { Button } from "@/shared/components";
import { AuthField } from "../components/AuthField";
import { AuthMessage } from "../components/AuthMessage";
import { AuthShell } from "../components/AuthShell";
import { createPasswordReset, resetPassword, verifyPasswordResetCode } from "../lib/auth-storage";
import { validateEmail, validatePassword } from "../lib/auth-validation";

type RecoveryStep = "request" | "verify" | "reset" | "complete";

const stepCopy: Record<RecoveryStep, { eyebrow: string; title: string; description: string }> = {
  request: {
    eyebrow: "Password recovery",
    title: "Let’s get you back into orbit.",
    description: "Enter the email used for your local account and we’ll prepare a recovery code.",
  },
  verify: {
    eyebrow: "Check your code",
    title: "One quick check.",
    description: "Use the six-digit demo code below to confirm this reset on your device.",
  },
  reset: {
    eyebrow: "Choose a new password",
    title: "Make your next sign-in easy.",
    description: "Create a strong password you’ll remember. Your old password will stop working.",
  },
  complete: {
    eyebrow: "Password updated",
    title: "You’re ready to sign in again.",
    description: "Your locally stored account now uses the new password.",
  },
};

export function ForgotPasswordPage() {
  const [step, setStep] = useState<RecoveryStep>("request");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [demoCode, setDemoCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [errorField, setErrorField] = useState<
    "email" | "code" | "password" | "confirmPassword" | ""
  >("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const copy = stepCopy[step];

  function clearFeedback() {
    setFieldError("");
    setErrorField("");
    setMessage("");
  }

  async function handleRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const emailError = validateEmail(email);
    setFieldError(emailError);
    setErrorField(emailError ? "email" : "");
    setMessage("");
    if (emailError) return;

    setSubmitting(true);
    try {
      const { result, code: generatedCode } = await createPasswordReset(email);
      if (!result.ok) {
        setFieldError(result.message);
        setErrorField("email");
        return;
      }
      setDemoCode(generatedCode ?? "");
      setStep("verify");
    } catch {
      setMessage("Browser storage is unavailable. Enable site storage and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleVerify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^\d{6}$/.test(code)) {
      setFieldError("Enter the complete 6-digit code.");
      setErrorField("code");
      return;
    }

    setSubmitting(true);
    try {
      const result = await verifyPasswordResetCode(code);
      if (!result.ok) {
        setFieldError(result.message);
        setErrorField("code");
        return;
      }
      setStep("reset");
      clearFeedback();
    } catch {
      setMessage("Browser storage is unavailable. Enable site storage and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const passwordError = validatePassword(password);
    if (passwordError) {
      setFieldError(passwordError);
      setErrorField("password");
      return;
    }
    if (password !== confirmPassword) {
      setFieldError("Passwords do not match.");
      setErrorField("confirmPassword");
      return;
    }

    setSubmitting(true);
    try {
      const result = await resetPassword(password);
      if (!result.ok) {
        setMessage(result.message);
        return;
      }
      setStep("complete");
      clearFeedback();
    } catch {
      setMessage("Browser storage is unavailable. Enable site storage and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(demoCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setMessage("Copy is unavailable. Enter the displayed code manually.");
    }
  }

  return (
    <AuthShell eyebrow={copy.eyebrow} title={copy.title} description={copy.description}>
      <ol className="mb-6 flex items-center gap-2" aria-label="Password recovery progress">
        {(["request", "verify", "reset"] as const).map((item, index) => {
          const currentIndex = ["request", "verify", "reset", "complete"].indexOf(step);
          const done = index < currentIndex || step === "complete";
          const current = item === step;
          return (
            <li key={item} className={`flex ${index < 2 ? "flex-1" : ""} items-center gap-2`}>
              <span
                aria-current={current ? "step" : undefined}
                className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold ${
                  done
                    ? "bg-primary-bright text-white"
                    : current
                      ? "bg-foreground text-white"
                      : "bg-slate-100 text-slate-400"
                }`}
              >
                {done ? <Check className="size-3.5" /> : index + 1}
              </span>
              {index < 2 && (
                <span className={`h-px flex-1 ${done ? "bg-primary-bright" : "bg-slate-200"}`} />
              )}
            </li>
          );
        })}
      </ol>

      {step === "request" && (
        <form onSubmit={handleRequest} noValidate className="space-y-5">
          <AuthField
            id="recovery-email"
            name="email"
            label="Account email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            error={errorField === "email" ? fieldError : undefined}
            onChange={(value) => {
              setEmail(value);
              clearFeedback();
            }}
          />
          {message && <AuthMessage tone="error">{message}</AuthMessage>}
          <Button type="submit" variant="dark" className="h-12 w-full" disabled={submitting}>
            {submitting ? "Preparing code…" : "Get recovery code"}
            {!submitting && <ArrowRight className="size-4" />}
          </Button>
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-600 hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Back to sign in
          </Link>
        </form>
      )}

      {step === "verify" && (
        <form onSubmit={handleVerify} noValidate className="space-y-5">
          <div className="rounded-[20px] border border-green-200 bg-primary-soft p-4">
            <div className="flex items-start gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white text-green-700">
                <KeyRound className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.13em] text-green-800">
                  Demo recovery code
                </p>
                <div className="mt-1 flex items-center justify-between gap-3">
                  <code className="text-2xl font-bold tracking-[0.22em] text-green-950">
                    {demoCode}
                  </code>
                  <button
                    type="button"
                    onClick={copyCode}
                    className="grid size-9 place-items-center rounded-xl bg-white text-green-800 hover:bg-green-50"
                    aria-label="Copy recovery code"
                  >
                    {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                  </button>
                </div>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-green-800">
                  <Clock3 className="size-3.5" /> Expires in 10 minutes
                </p>
              </div>
            </div>
          </div>
          <AuthField
            id="recovery-code"
            name="code"
            label="Enter recovery code"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="000000"
            maxLength={6}
            value={code}
            error={errorField === "code" ? fieldError : undefined}
            onChange={(value) => {
              setCode(value.replace(/\D/g, "").slice(0, 6));
              clearFeedback();
            }}
          />
          {message && <AuthMessage tone="error">{message}</AuthMessage>}
          <Button type="submit" variant="dark" className="h-12 w-full" disabled={submitting}>
            {submitting ? "Checking code…" : "Verify code"}
            {!submitting && <ArrowRight className="size-4" />}
          </Button>
          <button
            type="button"
            onClick={() => {
              setStep("request");
              setCode("");
              setDemoCode("");
              clearFeedback();
            }}
            className="w-full text-sm font-semibold text-slate-600 hover:text-foreground"
          >
            Use a different email
          </button>
        </form>
      )}

      {step === "reset" && (
        <form onSubmit={handleReset} noValidate className="space-y-5">
          <AuthField
            id="new-password"
            name="password"
            label="New password"
            type="password"
            autoComplete="new-password"
            placeholder="Create a new password"
            value={password}
            error={errorField === "password" ? fieldError : undefined}
            onChange={(value) => {
              setPassword(value);
              clearFeedback();
            }}
          />
          <AuthField
            id="confirm-new-password"
            name="confirmPassword"
            label="Confirm new password"
            type="password"
            autoComplete="new-password"
            placeholder="Repeat your new password"
            value={confirmPassword}
            error={errorField === "confirmPassword" ? fieldError : undefined}
            onChange={(value) => {
              setConfirmPassword(value);
              clearFeedback();
            }}
          />
          {message && <AuthMessage tone="error">{message}</AuthMessage>}
          <p className="text-xs leading-5 text-slate-500">
            Use at least 8 characters with uppercase, lowercase, and a number.
          </p>
          <Button type="submit" variant="dark" className="h-12 w-full" disabled={submitting}>
            {submitting ? "Updating password…" : "Update password"}
            {!submitting && <ArrowRight className="size-4" />}
          </Button>
        </form>
      )}

      {step === "complete" && (
        <div>
          <AuthMessage tone="success">
            Password updated. Sign in with your new password whenever you&apos;re ready.
          </AuthMessage>
          <Link
            href="/login"
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Sign in now <ArrowRight className="size-4" />
          </Link>
        </div>
      )}
    </AuthShell>
  );
}
