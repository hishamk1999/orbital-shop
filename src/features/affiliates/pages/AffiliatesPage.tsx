import {
  BadgeCheck,
  BarChart3,
  CircleDollarSign,
  Link2,
  MessageCircleQuestion,
  PackageCheck,
  Sparkles,
} from "lucide-react";

import { Container, Footer, Header } from "@/shared/layouts";
import { AffiliateApplicationForm } from "../components/AffiliateApplicationForm";
import { AffiliateHero } from "../components/AffiliateHero";

const benefits = [
  {
    title: "Up to 12% commission",
    description: "Earn on every qualified order placed through your unique links.",
    icon: CircleDollarSign,
    tone: "bg-primary-soft text-green-800",
  },
  {
    title: "A 30-day window",
    description: "Your recommendation keeps working long after someone first clicks.",
    icon: Link2,
    tone: "bg-sky-soft text-blue-900",
  },
  {
    title: "Reporting that makes sense",
    description: "See clicks, orders, and commission without digging through clutter.",
    icon: BarChart3,
    tone: "bg-peach-soft text-amber-950",
  },
];

const steps = [
  {
    title: "Tell us what you make",
    description: "Share your channel, audience, and the kind of technology you cover.",
  },
  {
    title: "Build your product edit",
    description: "Choose genuinely useful Orbital products and create trackable links.",
  },
  {
    title: "Share and earn",
    description: "Publish in your own voice, track results, and receive monthly payouts.",
  },
];

const faqs = [
  {
    question: "Do I need a minimum audience size?",
    answer:
      "No. We care more about trust, useful content, and a clear fit with our products than a headline follower count.",
  },
  {
    question: "When are commissions paid?",
    answer:
      "Approved commission is paid monthly after the return window closes. Your dashboard shows pending and approved amounts separately.",
  },
  {
    question: "Can I request products to review?",
    answer:
      "Selected partners may be invited to product seeding campaigns. Joining the program does not guarantee free review products.",
  },
];

export function AffiliatesPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fafafa] text-foreground">
      <Header />
      <main>
        <AffiliateHero />

        <section className="py-18 sm:py-22">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-green-700">
                A useful partnership
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">
                The tools to recommend with confidence.
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Built for thoughtful creators, publishers, and communities—not link spam.
              </p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {benefits.map(({ title, description, icon: Icon, tone }) => (
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
          <Container>
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-green-300">
                  How it works
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">
                  From your first link to your first payout.
                </h2>
                <p className="mt-4 max-w-md leading-7 text-slate-300">
                  We keep the program understandable so you can focus on making useful content.
                </p>
              </div>
              <ol className="grid gap-4">
                {steps.map((step, index) => (
                  <li
                    key={step.title}
                    className="grid gap-4 rounded-[20px] border border-white/10 bg-white/5 p-5 sm:grid-cols-[auto_1fr] sm:items-start"
                  >
                    <span className="grid size-9 place-items-center rounded-full bg-green-400/15 font-mono text-sm font-bold text-green-300">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold">{step.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-300">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </section>

        <section id="apply" className="scroll-mt-28 py-18 sm:py-22">
          <Container className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr] lg:gap-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-violet-700">
                Join the program
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">
                Let&apos;s see if we&apos;re a good fit.
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Applications are reviewed by a person. We usually reply within five business days.
              </p>
              <ul className="mt-7 grid gap-4 text-sm text-slate-700">
                <li className="flex gap-3">
                  <BadgeCheck className="mt-0.5 size-5 shrink-0 text-green-700" />
                  Original, audience-first content
                </li>
                <li className="flex gap-3">
                  <PackageCheck className="mt-0.5 size-5 shrink-0 text-green-700" />
                  A natural fit with technology and everyday gear
                </li>
                <li className="flex gap-3">
                  <Sparkles className="mt-0.5 size-5 shrink-0 text-green-700" />
                  Clear and honest affiliate disclosures
                </li>
              </ul>
            </div>
            <div className="rounded-[28px] bg-white p-6 shadow-[0_18px_55px_rgba(15,23,42,0.07)] ring-1 ring-slate-200 sm:p-8">
              <AffiliateApplicationForm />
            </div>
          </Container>
        </section>

        <section className="border-t border-slate-200 bg-white py-18 sm:py-22">
          <Container className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16">
            <div>
              <MessageCircleQuestion className="size-7 text-green-700" />
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.055em]">
                A few good questions.
              </h2>
            </div>
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {faqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-semibold marker:content-none">
                    {faq.question}
                    <span
                      className="grid size-8 shrink-0 place-items-center rounded-full bg-slate-100 text-lg transition-transform group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-2xl pt-3 text-sm leading-7 text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
