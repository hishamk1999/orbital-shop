import {
  BatteryCharging,
  Box,
  Check,
  Headphones,
  Keyboard,
  MousePointer2,
  PackageCheck,
  Search,
  Sparkles,
} from "lucide-react";

import { Container } from "@/shared/layouts";
import { InformationPageShell } from "../components/InformationPageShell";
import { SectionHeading } from "../components/SectionHeading";

const principles = [
  {
    title: "Useful before impressive",
    description: "A product should solve an everyday problem before it asks for attention.",
    icon: Check,
    tone: "bg-primary-soft text-green-800",
  },
  {
    title: "Clear before clever",
    description: "Specifications matter only when they help someone make a confident choice.",
    icon: Search,
    tone: "bg-sky-soft text-blue-900",
  },
  {
    title: "Considered end to end",
    description: "The product, packaging, delivery, and support should all feel equally thoughtful.",
    icon: PackageCheck,
    tone: "bg-peach-soft text-amber-950",
  },
];

const selectionSteps = [
  {
    title: "Notice the friction",
    description: "We begin with a real inconvenience: tangled cables, tired wrists, noisy rooms.",
  },
  {
    title: "Test the difference",
    description: "We look for the details that change daily use, not features made for the box.",
  },
  {
    title: "Explain it plainly",
    description: "We keep the useful context and leave out the wall of technical noise.",
  },
];

export function OurStoryPage() {
  return (
    <InformationPageShell
      eyebrow="Our story"
      title="Less tech noise. More things worth keeping."
      description="Orbital is a thoughtful electronics shop built around one idea: technology should earn the space it takes in your day."
      visual={<DeviceConstellation />}
    >
      <section className="py-18 sm:py-22">
        <Container className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-18">
          <SectionHeading
            eyebrow="Why Orbital exists"
            title="Shopping for useful tech should feel lighter."
          />
          <div className="space-y-5 text-base leading-8 text-slate-600">
            <p>
              The electronics aisle often asks you to compare too much and understand too little.
              More models, longer specification tables, and louder claims do not always lead to a
              better choice.
            </p>
            <p>
              Orbital started with a simpler question: what if a shop helped you understand which
              products genuinely improve an ordinary day? That question shapes the way we select,
              describe, and present everything here.
            </p>
            <p>
              We are interested in the quiet wins—a charger that lives neatly on your desk,
              headphones that make a commute calmer, or a stand that leaves your shoulders feeling
              better at the end of the day.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-[#f4f7f5] py-18 sm:py-22">
        <Container>
          <SectionHeading
            eyebrow="What guides us"
            title="Three filters for every find."
            description="These principles keep the catalogue focused and the experience easy to understand."
          />
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {principles.map(({ title, description, icon: Icon, tone }) => (
              <article
                key={title}
                className="rounded-[22px] bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
              >
                <span className={`grid size-11 place-items-center rounded-2xl ${tone}`}>
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-[-0.03em]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-18 sm:py-22">
        <Container className="grid items-start gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              eyebrow="How something earns a place"
              title="A selection process built around real use."
              description="Order matters here: each product starts with a problem and ends with a clear reason to exist."
            />
          </div>
          <ol className="space-y-5">
            {selectionSteps.map((step, index) => (
              <li
                key={step.title}
                className="relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-6 sm:p-7"
              >
                <span className="font-mono text-sm font-bold text-green-700">
                  0{index + 1}
                </span>
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.035em]">{step.title}</h3>
                <p className="mt-2 max-w-xl leading-7 text-slate-600">{step.description}</p>
                <span
                  className="absolute -bottom-10 -right-8 size-28 rounded-full bg-primary-soft"
                  aria-hidden="true"
                />
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="pb-18 sm:pb-22">
        <Container>
          <blockquote className="rounded-[28px] bg-[#111827] px-7 py-10 text-white sm:px-12 sm:py-14">
            <Sparkles className="size-7 text-primary-soft" />
            <p className="mt-6 max-w-4xl text-2xl font-semibold leading-snug tracking-[-0.045em] sm:text-4xl">
              “The best piece of technology is not the one with the longest feature list. It is the
              one you stop thinking about because it simply works.”
            </p>
            <footer className="mt-6 text-sm font-semibold text-slate-400">
              The idea behind every Orbital shelf
            </footer>
          </blockquote>
        </Container>
      </section>
    </InformationPageShell>
  );
}

function DeviceConstellation() {
  const devices = [
    { label: "Audio", icon: Headphones, className: "left-[8%] top-[24%] bg-primary-soft" },
    { label: "Workspace", icon: Keyboard, className: "right-[8%] top-[12%] bg-sky-soft" },
    { label: "Power", icon: BatteryCharging, className: "right-[14%] bottom-[12%] bg-peach-soft" },
    { label: "Details", icon: MousePointer2, className: "left-[14%] bottom-[10%] bg-[#ede9fe]" },
  ];

  return (
    <div className="relative min-h-84 overflow-hidden rounded-[28px] bg-white shadow-[0_24px_70px_rgba(15,23,42,0.1)] ring-1 ring-slate-200">
      <div
        className="absolute left-1/2 top-1/2 size-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-slate-300"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-200"
        aria-hidden="true"
      />
      <div className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[24px] bg-[#111827] text-white shadow-xl">
        <Box className="size-8" />
        <span className="sr-only">Orbital selection</span>
      </div>
      {devices.map(({ label, icon: Icon, className }) => (
        <div
          key={label}
          className={`absolute grid size-16 place-items-center rounded-[20px] text-foreground shadow-md ${className}`}
        >
          <Icon className="size-6" />
          <span className="sr-only">{label}</span>
        </div>
      ))}
      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
        Chosen for daily life
      </p>
    </div>
  );
}
