import { Check, LockKeyhole, PackageCheck, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

const trustPoints = [
  { icon: ShieldCheck, label: "Private to this browser" },
  { icon: PackageCheck, label: "Faster checkout next time" },
  { icon: LockKeyhole, label: "Password stored as a hash" },
];

export function AuthShell({ eyebrow, title, description, children }: AuthShellProps) {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#fafafa] px-4 py-5 text-foreground sm:px-6 sm:py-8 lg:px-8">
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-20 top-24 size-72 rounded-full bg-primary-soft/70 blur-3xl" />
        <div className="absolute -right-28 bottom-8 size-96 rounded-full bg-sky-soft/50 blur-3xl" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <Link
          href="/"
          aria-label="Orbital home"
          className="flex items-center gap-2 text-xl font-bold tracking-[-0.06em]"
        >
          <span className="grid size-8 place-items-center rounded-xl bg-primary-bright font-normal text-white">
            o
          </span>
          orbital<span className="text-primary-bright">.</span>
        </Link>
        <Link
          href="/shop"
          className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-foreground bg-green-50"
        >
          Continue shopping
        </Link>
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-6.5rem)] w-full max-w-6xl items-center gap-8 py-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14">
        <section className="mx-auto w-full max-w-md lg:mx-0">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-green-700">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-[1.04] tracking-[-0.06em] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-sm leading-7 text-slate-600">{description}</p>
          <div className="mt-8 rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.07)] sm:p-7">
            {children}
          </div>
          <p className="mt-4 text-center text-xs leading-5 text-slate-500">
            Demo mode: account data stays in this browser and is not sent to a server.
          </p>
        </section>

        <aside className="relative hidden min-h-152.5 overflow-hidden rounded-[32px] bg-[#111827] p-10 text-white lg:flex lg:flex-col">
          <div className="absolute -right-20 -top-24 size-80 rounded-full bg-[#7c3aed] opacity-80 blur-sm" />
          <div className="absolute -bottom-24 left-8 size-64 rounded-full bg-primary-bright/35 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-primary-soft ring-1 ring-white/15">
              Your Orbital account
            </span>
            <h2 className="mt-7 max-w-md text-4xl font-semibold leading-tight tracking-[-0.055em]">
              Keep the good tech within reach.
            </h2>
            <p className="mt-4 max-w-md leading-7 text-slate-300">
              Save your details now, then move through wishlists and checkout with less friction.
            </p>
          </div>

          <div className="relative mt-auto">
            <div className="ml-auto w-[82%] -rotate-2 rounded-[26px] bg-white p-5 text-foreground shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Account status
                  </p>
                  <p className="mt-1 font-semibold">Ready for your next find</p>
                </div>
                <span className="grid size-10 place-items-center rounded-2xl bg-primary-soft text-green-700">
                  <Check className="size-5" />
                </span>
              </div>
              <ul className="mt-4 space-y-3">
                {trustPoints.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3 text-sm text-slate-600">
                    <span className="grid size-8 place-items-center rounded-xl bg-slate-100 text-slate-700">
                      <Icon className="size-4" />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>
            </div>
            <div className="absolute -left-1 bottom-16 rounded-2xl bg-peach-soft px-4 py-3 text-sm font-semibold text-amber-950 shadow-lg">
              Built for this demo
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
