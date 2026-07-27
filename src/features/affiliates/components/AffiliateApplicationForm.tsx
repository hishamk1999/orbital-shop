"use client";

import { CheckCircle2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button, Input } from "@/shared/components";

type FormValues = {
  name: string;
  email: string;
  channel: string;
  website: string;
  audience: string;
  focus: string;
  message: string;
  agreed: boolean;
};

type FieldErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  channel: "",
  website: "",
  audience: "",
  focus: "",
  message: "",
  agreed: false,
};

const fieldClassName =
  "rounded-2xl border-border bg-white px-4 text-sm shadow-sm transition hover:border-slate-300 focus:border-primary-bright focus:outline-none focus:ring-4 focus:ring-green-100";

function validate(values: FormValues) {
  const errors: FieldErrors = {};

  if (values.name.trim().length < 2) errors.name = "Enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.channel) errors.channel = "Choose your primary channel.";
  if (!/^https?:\/\/.+/i.test(values.website.trim())) {
    errors.website = "Enter a full URL beginning with http:// or https://.";
  }
  if (!values.audience) errors.audience = "Choose your audience size.";
  if (!values.focus) errors.focus = "Choose your content focus.";
  if (values.message.trim().length < 30) {
    errors.message = "Tell us a little more using at least 30 characters.";
  }
  if (!values.agreed) errors.agreed = "Confirm that your application is accurate.";

  return errors;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-danger">
      {message}
    </p>
  );
}

export function AffiliateApplicationForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function setValue<Key extends keyof FormValues>(key: Key, value: FormValues[Key]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setSubmitting(true);
      await new Promise((resolve) => window.setTimeout(resolve, 350));
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-[24px] bg-primary-soft p-7 sm:p-9" role="status">
        <span className="grid size-12 place-items-center rounded-2xl bg-white text-green-700 shadow-sm">
          <CheckCircle2 className="size-6" />
        </span>
        <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">
          Your application is in orbit.
        </h3>
        <p className="mt-3 max-w-lg leading-7 text-green-950/75">
          Thanks, {values.name.split(" ")[0]}. We&apos;ll review your channel and reply to{" "}
          {values.email} within five business days.
        </p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-700">
          Full name
          <Input
            value={values.name}
            onChange={(event) => setValue("name", event.target.value)}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "affiliate-name-error" : undefined}
            className="mt-2 h-12 rounded-2xl"
          />
          <FieldError id="affiliate-name-error" message={errors.name} />
        </label>
        <label className="block text-sm font-semibold text-slate-700">
          Email address
          <Input
            type="email"
            value={values.email}
            onChange={(event) => setValue("email", event.target.value)}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "affiliate-email-error" : undefined}
            className="mt-2 h-12 rounded-2xl"
          />
          <FieldError id="affiliate-email-error" message={errors.email} />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-700">
          Primary channel
          <select
            value={values.channel}
            onChange={(event) => setValue("channel", event.target.value)}
            aria-invalid={Boolean(errors.channel)}
            aria-describedby={errors.channel ? "affiliate-channel-error" : undefined}
            className={`mt-2 h-12 w-full ${fieldClassName}`}
          >
            <option value="">Choose a channel</option>
            <option>YouTube</option>
            <option>Blog or publication</option>
            <option>Instagram</option>
            <option>TikTok</option>
            <option>Newsletter</option>
            <option>Other</option>
          </select>
          <FieldError id="affiliate-channel-error" message={errors.channel} />
        </label>
        <label className="block text-sm font-semibold text-slate-700">
          Website or profile URL
          <Input
            type="url"
            value={values.website}
            onChange={(event) => setValue("website", event.target.value)}
            placeholder="https://"
            aria-invalid={Boolean(errors.website)}
            aria-describedby={errors.website ? "affiliate-website-error" : undefined}
            className="mt-2 h-12 rounded-2xl"
          />
          <FieldError id="affiliate-website-error" message={errors.website} />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-slate-700">
          Audience size
          <select
            value={values.audience}
            onChange={(event) => setValue("audience", event.target.value)}
            aria-invalid={Boolean(errors.audience)}
            aria-describedby={errors.audience ? "affiliate-audience-error" : undefined}
            className={`mt-2 h-12 w-full ${fieldClassName}`}
          >
            <option value="">Choose a range</option>
            <option>Under 5,000</option>
            <option>5,000–25,000</option>
            <option>25,000–100,000</option>
            <option>100,000+</option>
          </select>
          <FieldError id="affiliate-audience-error" message={errors.audience} />
        </label>
        <label className="block text-sm font-semibold text-slate-700">
          Content focus
          <select
            value={values.focus}
            onChange={(event) => setValue("focus", event.target.value)}
            aria-invalid={Boolean(errors.focus)}
            aria-describedby={errors.focus ? "affiliate-focus-error" : undefined}
            className={`mt-2 h-12 w-full ${fieldClassName}`}
          >
            <option value="">Choose a focus</option>
            <option>Consumer technology</option>
            <option>Gaming</option>
            <option>Workspace and productivity</option>
            <option>Smart home</option>
            <option>Design and lifestyle</option>
            <option>Other</option>
          </select>
          <FieldError id="affiliate-focus-error" message={errors.focus} />
        </label>
      </div>

      <div>
        <label
          htmlFor="affiliate-message"
          className="block text-sm font-semibold text-slate-700"
        >
          Why is Orbital a fit for your audience?
        </label>
        <textarea
          id="affiliate-message"
          value={values.message}
          onChange={(event) => setValue("message", event.target.value)}
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "affiliate-message-error" : "affiliate-message-help"}
          className={`mt-2 w-full resize-y py-3 ${fieldClassName}`}
        />
        <span id="affiliate-message-help" className="mt-1.5 block text-xs font-normal text-slate-500">
          Share what you make and the kinds of products your audience trusts you to recommend.
        </span>
        <FieldError id="affiliate-message-error" message={errors.message} />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm leading-6 text-slate-600">
          <input
            type="checkbox"
            checked={values.agreed}
            onChange={(event) => setValue("agreed", event.target.checked)}
            aria-invalid={Boolean(errors.agreed)}
            aria-describedby={errors.agreed ? "affiliate-agreed-error" : undefined}
            className="mt-1 size-4 rounded border-slate-300 accent-green-600"
          />
          I confirm these details are accurate and that my content follows clear disclosure
          practices.
        </label>
        <FieldError id="affiliate-agreed-error" message={errors.agreed} />
      </div>

      <Button
        type="submit"
        variant="dark"
        disabled={submitting}
        className="min-h-12 w-full sm:w-fit"
      >
        {submitting ? "Sending application…" : "Send application"}
        {!submitting && <Send className="size-4" />}
      </Button>
    </form>
  );
}
