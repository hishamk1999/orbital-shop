import { HeartHandshake, Lightbulb, PackageCheck } from "lucide-react";

import { Container, Footer, Header } from "@/shared/layouts";
import { CareerHero } from "../components/CareerHero";
import { CareersExplorer } from "../components/CareersExplorer";

const values = [
  {
    title: "Make the useful choice",
    description:
      "We care about work that makes a real customer moment clearer, easier, or more enjoyable.",
    icon: PackageCheck,
    tone: "bg-primary-soft text-green-800",
  },
  {
    title: "Stay curious together",
    description:
      "Good questions travel freely here. We share context, invite critique, and improve the idea.",
    icon: Lightbulb,
    tone: "bg-sky-soft text-blue-900",
  },
  {
    title: "Care in the details",
    description:
      "From a line of copy to a warehouse handoff, the small things shape how Orbital feels.",
    icon: HeartHandshake,
    tone: "bg-peach-soft text-amber-950",
  },
];

const benefits = [
  "30 days of annual leave",
  "Flexible hybrid working",
  "£1,200 learning budget",
  "Private health cover",
  "Enhanced family leave",
  "Orbital product allowance",
];

export function CareersPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fafafa] text-foreground">
      <Header />
      <main>
        <CareerHero />

        <section className="py-18 sm:py-22">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-green-700">
                  How we work
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">
                  Small team. Clear standards. Plenty of trust.
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-8 text-slate-600">
                Orbital brings together retail craft, technology, service, and good judgement. We
                set a clear direction, give people room to own their work, and stay close enough to
                customers to know whether it is helping.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {values.map(({ title, description, icon: Icon, tone }) => (
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

        <section className="bg-[#111827] py-18 text-white sm:py-22">
          <Container className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-green-300">
                What you can expect
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">
                Support for the work—and life around it.
              </h2>
              <p className="mt-4 max-w-lg leading-7 text-slate-300">
                These are the benefits offered to permanent UK team members. Local packages are
                explained clearly in every offer.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex min-h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm font-semibold"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-green-400/15 text-green-300">
                    <PackageCheck className="size-4" />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <CareersExplorer />
      </main>
      <Footer />
    </div>
  );
}
