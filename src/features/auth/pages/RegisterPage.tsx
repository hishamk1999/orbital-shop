"use client";

import { ArrowRight, Check, Circle } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";

import { Button } from "@/shared/components";
import { AuthField } from "../components/AuthField";
import { AuthMessage } from "../components/AuthMessage";
import { AuthShell } from "../components/AuthShell";
import { registerUser } from "../lib/auth-storage";
import { validateRegistration, type AuthFieldErrors } from "../lib/auth-validation";

const passwordChecks = [
  { label: "8+ characters", test: (password: string) => password.length >= 8 },
  { label: "Upper & lowercase", test: (password: string) => /[A-Z]/.test(password) && /[a-z]/.test(password) },
  { label: "One number", test: (password: string) => /\d/.test(password) },
];

export function RegisterPage() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<AuthFieldErrors>({});
  const [message, setMessage] = useState("");
  const [created, setCreated] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function updateValue(field: keyof typeof values, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateRegistration(values);
    setErrors(nextErrors);
    setMessage("");
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const result = await registerUser(values);
      if (!result.ok) {
        if (result.field) setErrors({ [result.field]: result.message });
        else setMessage(result.message);
        return;
      }
      setCreated(true);
    } catch {
      setMessage("Browser storage is unavailable. Enable site storage and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Create your account"
      title="A smoother route to your next upgrade."
      description="Keep your details close on this browser, so the useful parts of shopping stay quick."
    >
      {created ? (
        <div className="py-2">
          <span className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-green-700">
            <Check className="size-6" />
          </span>
          <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">Account created.</h2>
          <p className="mt-2 leading-6 text-slate-600">
            You&apos;re signed in locally and ready to browse.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Find something useful <ArrowRight className="size-4" />
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <AuthField
            id="register-name"
            name="name"
            label="Full name"
            autoComplete="name"
            placeholder="Your name"
            value={values.name}
            error={errors.name}
            onChange={(value) => updateValue("name", value)}
          />
          <AuthField
            id="register-email"
            name="email"
            label="Email address"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            error={errors.email}
            onChange={(value) => updateValue("email", value)}
          />
          <AuthField
            id="register-password"
            name="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            placeholder="Create a password"
            value={values.password}
            error={errors.password}
            onChange={(value) => updateValue("password", value)}
          />
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500" aria-label="Password requirements">
            {passwordChecks.map(({ label, test }) => {
              const met = test(values.password);
              return (
                <li key={label} className={`flex items-center gap-1.5 ${met ? "text-green-700" : ""}`}>
                  {met ? <Check className="size-3.5" /> : <Circle className="size-3 fill-current opacity-40" />}
                  {label}
                </li>
              );
            })}
          </ul>
          <AuthField
            id="register-confirm-password"
            name="confirmPassword"
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            placeholder="Repeat your password"
            value={values.confirmPassword}
            error={errors.confirmPassword}
            onChange={(value) => updateValue("confirmPassword", value)}
          />
          {message && <AuthMessage tone="error">{message}</AuthMessage>}
          <Button type="submit" variant="dark" className="h-12 w-full" disabled={submitting}>
            {submitting ? "Creating account…" : "Create account"}
            {!submitting && <ArrowRight className="size-4" />}
          </Button>
          <p className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-green-700 hover:text-green-800">
              Sign in
            </Link>
          </p>
        </form>
      )}
    </AuthShell>
  );
}
