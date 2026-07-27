import { ArrowRight, BarChart3, Boxes, CircleDollarSign, Link2 } from "lucide-react";

import { Container } from "@/shared/layouts";

const signalPoints = [
  {
    label: "Your edit",
    icon: Boxes,
    position: "left-[7%] top-[12%]",
    tone: "bg-sky-soft text-blue-900",
  },
  {
    label: "A useful link",
    icon: Link2,
    position: "right-[7%] top-[12%]",
    tone: "bg-peach-soft text-amber-950",
  },
  {
    label: "Clear insights",
    icon: BarChart3,
    position: "bottom-[10%] left-[10%]",
    tone: "bg-white text-slate-800",
  },
  {
    label: "Your payout",
    icon: CircleDollarSign,
    position: "bottom-[10%] right-[9%]",
    tone: "bg-[#ede9fe] text-violet-800",
  },
];

export function AffiliateHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-slate-200/80 py-14 sm:py-18 lg:py-22">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -left-24 top-0 size-80 rounded-full bg-primary-soft/80 blur-3xl" />
        <div className="absolute -right-20 bottom-0 size-72 rounded-full bg-peach-soft/40 blur-3xl" />
      </div>
      <Container className="grid items-center gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-green-700">
            Orbital affiliates
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.04] tracking-[-0.06em] sm:text-5xl lg:text-6xl">
            Good tech is better when it&apos;s shared well.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Recommend products you genuinely rate. We&apos;ll give you useful tools, clear
            reporting, and a fair share of every qualified sale.
          </p>
          <a
            href="#apply"
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#111827] px-6 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            Apply to join
            <ArrowRight className="size-4" />
          </a>
        </div>

        <div className="relative min-h-84 overflow-hidden rounded-[28px] bg-primary-soft shadow-[0_24px_70px_rgba(15,23,42,0.1)] ring-1 ring-green-200">
          <svg
            className="absolute inset-0 size-full text-green-700/20"
            viewBox="0 0 500 340"
            fill="none"
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            <path d="M88 68H194V170H250" stroke="currentColor" strokeWidth="2" />
            <path d="M412 68H306V170H250" stroke="currentColor" strokeWidth="2" />
            <path d="M98 278H194V170" stroke="currentColor" strokeWidth="2" />
            <path d="M404 278H306V170" stroke="currentColor" strokeWidth="2" />
          </svg>
          <div className="absolute left-1/2 top-1/2 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[28px] bg-[#111827] text-white shadow-xl">
            <span className="text-3xl font-bold tracking-[-0.08em]">
              o<span className="text-primary-bright">.</span>
            </span>
            <span className="sr-only">Orbital connects your recommendations to rewards</span>
          </div>
          {signalPoints.map(({ label, icon: Icon, position, tone }) => (
            <div
              key={label}
              className={`absolute ${position} grid size-16 place-items-center rounded-[20px] shadow-md ${tone}`}
            >
              <Icon className="size-6" />
              <span className="sr-only">{label}</span>
            </div>
          ))}
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.14em] text-green-900/55">
            Share clearly. Earn fairly.
          </p>
        </div>
      </Container>
    </section>
  );
}
