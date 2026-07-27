import { Boxes, Code2, Headphones, PenTool, ShoppingBag } from "lucide-react";

import { Container } from "@/shared/layouts";

const disciplines = [
  { label: "Design", icon: PenTool, position: "left-[7%] top-[14%]", tone: "bg-sky-soft" },
  { label: "Engineering", icon: Code2, position: "right-[7%] top-[10%]", tone: "bg-primary-soft" },
  {
    label: "Merchandising",
    icon: ShoppingBag,
    position: "bottom-[10%] left-[11%]",
    tone: "bg-peach-soft",
  },
  {
    label: "Customer care",
    icon: Headphones,
    position: "bottom-[13%] right-[8%]",
    tone: "bg-[#ede9fe]",
  },
];

export function CareerHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-slate-200/80 py-14 sm:py-18 lg:py-22">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -left-24 top-10 size-72 rounded-full bg-primary-soft/70 blur-3xl" />
        <div className="absolute -right-20 bottom-0 size-80 rounded-full bg-sky-soft/45 blur-3xl" />
      </div>
      <Container className="grid items-center gap-10 lg:grid-cols-[1fr_0.88fr] lg:gap-16">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-green-700">
            Careers at Orbital
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.04] tracking-[-0.06em] sm:text-5xl lg:text-6xl">
            Do work that makes tech feel more human.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            We are building a calmer, clearer way to discover technology—and a team where
            thoughtful people can do their best work.
          </p>
          <a
            href="#open-roles"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#111827] px-6 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            See open roles
          </a>
        </div>
        <div className="relative min-h-84 overflow-hidden rounded-[28px] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.1)] ring-1 ring-slate-200">
          <svg
            className="absolute inset-0 size-full text-slate-200"
            viewBox="0 0 500 340"
            fill="none"
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            <path d="M92 74H200V170H250" stroke="currentColor" strokeWidth="2" />
            <path d="M408 70H304V170H250" stroke="currentColor" strokeWidth="2" />
            <path d="M102 276H200V170" stroke="currentColor" strokeWidth="2" />
            <path d="M405 274H304V170" stroke="currentColor" strokeWidth="2" />
          </svg>
          <div className="absolute left-1/2 top-1/2 grid size-22 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[26px] bg-[#111827] text-white shadow-xl">
            <Boxes className="size-8" />
            <span className="sr-only">One connected Orbital team</span>
          </div>
          {disciplines.map(({ label, icon: Icon, position, tone }) => (
            <div
              key={label}
              className={`absolute ${position} grid size-16 place-items-center rounded-[20px] text-foreground shadow-md ${tone}`}
            >
              <Icon className="size-6" />
              <span className="sr-only">{label}</span>
            </div>
          ))}
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
            Different crafts, one orbit
          </p>
        </div>
      </Container>
    </section>
  );
}
