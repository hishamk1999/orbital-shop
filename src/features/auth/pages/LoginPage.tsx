"use client";

import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";

import { Button } from "@/shared/components";
import { AuthField } from "../components/AuthField";
import { AuthMessage } from "../components/AuthMessage";
import { AuthShell } from "../components/AuthShell";
import { loginUser } from "../lib/auth-storage";
import { validateEmail } from "../lib/auth-validation";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [message, setMessage] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = {
      email: validateEmail(email) || undefined,
      password: password ? undefined : "Enter your password.",
    };
    setErrors(nextErrors);
    setMessage("");

    if (nextErrors.email || nextErrors.password) return;

    setSubmitting(true);
    try {
      const result = await loginUser(email, password);
      if (!result.ok) {
        setMessage(result.message);
        return;
      }
      setSignedIn(true);
    } catch {
      setMessage("Browser storage is unavailable. Enable site storage and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Sign in. Pick up where you left off."
      description="Your saved Orbital account lives on this device, ready for the next useful find."
    >
      {signedIn ? (
        <div className="py-2">
          <span className="grid size-12 place-items-center rounded-2xl bg-primary-soft text-green-700">
            <Check className="size-6" />
          </span>
          <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">You&apos;re signed in.</h2>
          <p className="mt-2 leading-6 text-slate-600">
            Your local session is ready on this browser.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Browse the shop <ArrowRight className="size-4" />
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <AuthField
            id="login-email"
            name="email"
            label="Email address"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            error={errors.email}
            onChange={(value) => {
              setEmail(value);
              setErrors((current) => ({ ...current, email: undefined }));
              setMessage("");
            }}
          />
          <AuthField
            id="login-password"
            name="password"
            label="Password"
            labelAccessory={
              <Link href="/forgot-password" className="text-sm font-semibold text-green-700 hover:text-green-800">
                Forgot password?
              </Link>
            }
            type="password"
            autoComplete="current-password"
            placeholder="Your password"
            value={password}
            error={errors.password}
            onChange={(value) => {
              setPassword(value);
              setErrors((current) => ({ ...current, password: undefined }));
              setMessage("");
            }}
          />
          {message && <AuthMessage tone="error">{message}</AuthMessage>}
          <Button type="submit" variant="dark" className="h-12 w-full" disabled={submitting}>
            {submitting ? "Signing in…" : "Sign in"}
            {!submitting && <ArrowRight className="size-4" />}
          </Button>
          <p className="text-center text-sm text-slate-600">
            New to Orbital?{" "}
            <Link href="/register" className="font-semibold text-green-700 hover:text-green-800">
              Create an account
            </Link>
          </p>
        </form>
      )}
    </AuthShell>
  );
}
