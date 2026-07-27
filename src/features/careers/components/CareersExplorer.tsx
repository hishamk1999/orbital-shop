"use client";

import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  Clock3,
  MapPin,
  Search,
  Upload,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Button, Input } from "@/shared/components";
import { Container } from "@/shared/layouts";
import { careerDepartments, careerLocations, careerRoles } from "../data/career-roles";
import type { CareerApplication, CareerRole } from "../types/career.types";

type ApplicationErrors = Partial<Record<keyof CareerApplication | "resume", string>>;

const initialApplication: CareerApplication = {
  roleId: "",
  firstName: "",
  lastName: "",
  email: "",
  linkedIn: "",
  note: "",
  consent: false,
};

export function CareersExplorer() {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("All teams");
  const [location, setLocation] = useState("All locations");
  const [selectedRole, setSelectedRole] = useState<CareerRole | null>(null);
  const [showApplication, setShowApplication] = useState(false);

  const filteredRoles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return careerRoles.filter((role) => {
      const matchesQuery =
        !normalizedQuery ||
        `${role.title} ${role.department} ${role.summary}`.toLowerCase().includes(normalizedQuery);
      const matchesDepartment = department === "All teams" || role.department === department;
      const matchesLocation = location === "All locations" || role.location === location;

      return matchesQuery && matchesDepartment && matchesLocation;
    });
  }, [department, location, query]);

  function openRole(role: CareerRole) {
    setSelectedRole(role);
    setShowApplication(false);
  }

  const closeRole = useCallback(() => {
    setSelectedRole(null);
    setShowApplication(false);
  }, []);

  function resetFilters() {
    setQuery("");
    setDepartment("All teams");
    setLocation("All locations");
  }

  return (
    <>
      <section id="open-roles" className="scroll-mt-28 py-18 sm:py-22">
        <Container>
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-green-700">
              Open roles
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">
              Find your place in the team.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Search by craft or narrow the list by team and location. Every opening below is active
              in this demo.
            </p>
          </div>

          <div className="mt-9 grid gap-3 rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)] md:grid-cols-[1.25fr_0.8fr_0.8fr]">
            <div className="relative">
              <label className="sr-only" htmlFor="role-search">
                Search open roles
              </label>
              <Search
                className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <Input
                id="role-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search roles or skills"
                className="h-12 rounded-2xl pl-11 shadow-none"
              />
            </div>
            <label>
              <span className="sr-only">Filter by team</span>
              <select
                value={department}
                onChange={(event) => setDepartment(event.target.value)}
                className="h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm font-medium text-foreground shadow-none"
              >
                {careerDepartments.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label>
              <span className="sr-only">Filter by location</span>
              <select
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm font-medium text-foreground shadow-none"
              >
                {careerLocations.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 text-sm text-slate-500">
            <p aria-live="polite">
              {filteredRoles.length} {filteredRoles.length === 1 ? "role" : "roles"} found
            </p>
            {(query || department !== "All teams" || location !== "All locations") && (
              <button
                type="button"
                onClick={resetFilters}
                className="font-semibold text-green-700 hover:text-green-800"
              >
                Clear filters
              </button>
            )}
          </div>

          {filteredRoles.length > 0 ? (
            <div className="mt-5 divide-y divide-slate-200 overflow-hidden rounded-[24px] border border-slate-200 bg-white">
              {filteredRoles.map((role) => (
                <article
                  key={role.id}
                  className="group grid gap-5 p-5 transition hover:bg-[#f7faf8] sm:p-7 md:grid-cols-[1fr_auto] md:items-center"
                >
                  <div>
                    <div className="flex flex-wrap gap-2 text-xs font-semibold">
                      <span className="rounded-full bg-primary-soft px-3 py-1 text-green-800">
                        {role.department}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                        {role.employmentType}
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold tracking-[-0.035em]">{role.title}</h3>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                      {role.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="size-4" aria-hidden="true" />
                        {role.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <BriefcaseBusiness className="size-4" aria-hidden="true" />
                        {role.workplace}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => openRole(role)}
                    className="w-full md:w-auto"
                  >
                    View role
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-[24px] border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
              <Search className="mx-auto size-7 text-slate-400" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold">No roles match those filters</h3>
              <p className="mt-2 text-sm text-slate-500">Try another keyword, team, or location.</p>
              <Button variant="outline" onClick={resetFilters} className="mt-5">
                Show all roles
              </Button>
            </div>
          )}
        </Container>
      </section>

      {selectedRole && (
        <RoleDialog
          role={selectedRole}
          showApplication={showApplication}
          onShowApplication={() => setShowApplication(true)}
          onBack={() => setShowApplication(false)}
          onClose={closeRole}
        />
      )}
    </>
  );
}

type RoleDialogProps = {
  role: CareerRole;
  showApplication: boolean;
  onShowApplication: () => void;
  onBack: () => void;
  onClose: () => void;
};

function RoleDialog({
  role,
  showApplication,
  onShowApplication,
  onBack,
  onClose,
}: RoleDialogProps) {
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-0 backdrop-blur-sm sm:items-center sm:p-5"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="career-dialog-title"
        tabIndex={-1}
        className="max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-t-[28px] bg-white shadow-2xl sm:rounded-[28px]"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur sm:px-7">
          {showApplication ? (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-2 text-sm font-semibold text-slate-600 hover:text-foreground"
            >
              <ArrowLeft className="size-4" /> Role details
            </button>
          ) : (
            <p className="text-sm font-semibold text-green-700">Orbital careers</p>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close role details"
            className="grid size-11 place-items-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
          >
            <X className="size-5" />
          </button>
        </div>
        {showApplication ? (
          <ApplicationForm role={role} onClose={onClose} />
        ) : (
          <RoleDetails role={role} onApply={onShowApplication} />
        )}
      </section>
    </div>
  );
}

function RoleDetails({ role, onApply }: { role: CareerRole; onApply: () => void }) {
  return (
    <div className="p-6 sm:p-9">
      <div className="flex flex-wrap gap-2 text-xs font-semibold">
        <span className="rounded-full bg-primary-soft px-3 py-1 text-green-800">
          {role.department}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
          {role.employmentType}
        </span>
      </div>
      <h2 id="career-dialog-title" className="mt-5 text-3xl font-semibold tracking-tighter">
        {role.title}
      </h2>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="size-4" /> {role.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock3 className="size-4" /> {role.employmentType}, {role.workplace.toLowerCase()}
        </span>
      </div>
      <p className="mt-7 text-base leading-7 text-slate-600">{role.summary}</p>
      <RoleList title="What you will do" items={role.responsibilities} />
      <RoleList title="What you will bring" items={role.qualifications} />
      <div className="mt-9 rounded-[22px] bg-[#f4f7f5] p-5 sm:flex sm:items-center sm:justify-between sm:gap-5">
        <div>
          <p className="font-semibold">This sounds like you?</p>
          <p className="mt-1 text-sm text-slate-600">The application takes about five minutes.</p>
        </div>
        <Button onClick={onApply} className="mt-4 bg-[#16a34a] hover:bg-green-700 sm:mt-0">
          Apply for this role <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}

function RoleList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold tracking-[-0.03em]">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
            <Check className="mt-1 size-4 shrink-0 text-green-700" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ApplicationForm({ role, onClose }: { role: CareerRole; onClose: () => void }) {
  const [application, setApplication] = useState({
    ...initialApplication,
    roleId: role.id,
  });
  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<ApplicationErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  function updateField<Key extends keyof CareerApplication>(
    field: Key,
    value: CareerApplication[Key],
  ) {
    setApplication((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validate() {
    const nextErrors: ApplicationErrors = {};
    if (!application.firstName.trim()) nextErrors.firstName = "Enter your first name.";
    if (!application.lastName.trim()) nextErrors.lastName = "Enter your last name.";
    if (!/^\S+@\S+\.\S+$/.test(application.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    const resumeError = getResumeError(resume);
    if (resumeError) nextErrors.resume = resumeError;
    if (!application.consent) nextErrors.consent = "Confirm that Orbital may review your details.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function submitApplication(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    timerRef.current = setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  }

  if (submitted) {
    return (
      <div className="p-7 text-center sm:p-12">
        <span className="mx-auto grid size-16 place-items-center rounded-[22px] bg-primary-soft text-green-800">
          <Check className="size-7" />
        </span>
        <h2 id="career-dialog-title" className="mt-6 text-3xl font-semibold tracking-tighter">
          Application received.
        </h2>
        <p className="mx-auto mt-3 max-w-md leading-7 text-slate-600">
          Thanks, {application.firstName}. Our hiring team will review your application for{" "}
          {role.title} and email you within two weeks.
        </p>
        <Button onClick={onClose} variant="dark" className="mt-7">
          Back to open roles
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submitApplication} noValidate className="p-6 sm:p-9">
      <p className="text-sm font-semibold text-green-700">Apply for</p>
      <h2 id="career-dialog-title" className="mt-2 text-3xl font-semibold tracking-tighter">
        {role.title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-500">
        Fields marked with an asterisk are required. This demo keeps your information in this
        browser and does not send it anywhere.
      </p>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <ApplicationField label="First name" htmlFor="career-first-name" error={errors.firstName}>
          <Input
            id="career-first-name"
            value={application.firstName}
            onChange={(event) => updateField("firstName", event.target.value)}
            autoComplete="given-name"
            aria-invalid={Boolean(errors.firstName)}
            required
          />
        </ApplicationField>
        <ApplicationField label="Last name" htmlFor="career-last-name" error={errors.lastName}>
          <Input
            id="career-last-name"
            value={application.lastName}
            onChange={(event) => updateField("lastName", event.target.value)}
            autoComplete="family-name"
            aria-invalid={Boolean(errors.lastName)}
            required
          />
        </ApplicationField>
        <ApplicationField
          label="Email address"
          htmlFor="career-email"
          error={errors.email}
          className="sm:col-span-2"
        >
          <Input
            id="career-email"
            type="email"
            value={application.email}
            onChange={(event) => updateField("email", event.target.value)}
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            required
          />
        </ApplicationField>
        <ApplicationField
          label="LinkedIn profile"
          htmlFor="career-linkedin"
          hint="Optional"
          className="sm:col-span-2"
        >
          <Input
            id="career-linkedin"
            type="url"
            value={application.linkedIn}
            onChange={(event) => updateField("linkedIn", event.target.value)}
            placeholder="https://linkedin.com/in/your-name"
          />
        </ApplicationField>
        <ApplicationField
          label="Resume"
          htmlFor="career-resume"
          error={errors.resume}
          className="sm:col-span-2"
        >
          <label
            htmlFor="career-resume"
            className="flex min-h-24 cursor-pointer items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 text-center text-sm font-medium text-slate-600 transition hover:border-green-500 hover:bg-green-50"
          >
            <Upload className="size-5 text-green-700" />
            {resume ? resume.name : "Choose a PDF, DOC, or DOCX file (max 5 MB)"}
          </label>
          <input
            id="career-resume"
            type="file"
            className="sr-only"
            accept=".pdf,.doc,.docx"
            onChange={(event) => {
              const selectedFile = event.target.files?.[0] ?? null;
              setResume(selectedFile);
              setErrors((current) => ({
                ...current,
                resume: getResumeError(selectedFile),
              }));
            }}
            required
          />
        </ApplicationField>
        <ApplicationField
          label="A short note"
          htmlFor="career-note"
          hint="Optional"
          className="sm:col-span-2"
        >
          <textarea
            id="career-note"
            value={application.note}
            onChange={(event) => updateField("note", event.target.value)}
            rows={4}
            placeholder="What draws you to this role?"
            className="w-full resize-y rounded-2xl border border-border bg-white px-4 py-3 text-sm shadow-sm transition placeholder:text-slate-400 focus:border-primary-bright focus:outline-none focus:ring-4 focus:ring-green-100"
          />
        </ApplicationField>
      </div>
      <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-slate-600">
        <input
          type="checkbox"
          checked={application.consent}
          onChange={(event) => updateField("consent", event.target.checked)}
          className="mt-1 size-4 rounded border-slate-300 accent-green-600"
          aria-invalid={Boolean(errors.consent)}
        />
        <span>
          I agree that Orbital may review and store my application details for this hiring process.
          {errors.consent && (
            <span className="mt-1 block font-medium text-danger" role="alert">
              {errors.consent}
            </span>
          )}
        </span>
      </label>
      <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting} className="bg-[#16a34a] hover:bg-green-700">
          {submitting ? "Sending application…" : "Send application"}
        </Button>
      </div>
    </form>
  );
}

function getResumeError(file: File | null) {
  if (!file) return "Add your resume as a PDF, DOC, or DOCX file.";

  const extension = file.name.split(".").pop()?.toLowerCase();
  if (!extension || !["pdf", "doc", "docx"].includes(extension)) {
    return "Use a PDF, DOC, or DOCX file.";
  }

  if (file.size > 5 * 1024 * 1024) {
    return "Choose a resume smaller than 5 MB.";
  }

  return undefined;
}

function ApplicationField({
  label,
  htmlFor,
  hint,
  error,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-2 flex items-center justify-between text-sm font-semibold"
      >
        <span>
          {label}
          {!hint && <span aria-hidden="true"> *</span>}
        </span>
        {hint && <span className="font-normal text-slate-400">{hint}</span>}
      </label>
      {children}
      {error && (
        <p className="mt-2 text-sm font-medium text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
