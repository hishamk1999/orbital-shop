import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Container, Footer, Header } from "@/shared/layouts";

type InformationPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  visual: ReactNode;
  children: ReactNode;
};

const informationLinks = [
  { href: "/shipping-returns", label: "Shipping & returns" },
  { href: "/faqs", label: "FAQs" },
  { href: "/our-story", label: "Our story" },
];

export function InformationPageShell({
  eyebrow,
  title,
  description,
  visual,
  children,
}: InformationPageShellProps) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#fafafa] text-foreground">
      <Header />
      <main>
        <section className="relative isolate overflow-hidden border-b border-slate-200/80 py-14 sm:py-18 lg:py-22">
          <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
            <div className="absolute -left-24 top-10 size-72 rounded-full bg-primary-soft/70 blur-3xl" />
            <div className="absolute -right-20 bottom-0 size-80 rounded-full bg-sky-soft/45 blur-3xl" />
          </div>
          <Container className="grid items-center gap-10 lg:grid-cols-[1fr_0.88fr] lg:gap-16">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-green-700">
                {eyebrow}
              </p>
              <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.04] tracking-[-0.06em] sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                {description}
              </p>
            </div>
            {visual}
          </Container>
        </section>

        <nav aria-label="Information pages" className="border-b border-slate-200 bg-white">
          <Container className="flex gap-2 overflow-x-auto py-3">
            {informationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="shrink-0 rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </Container>
        </nav>

        {children}

        <section className="pb-18 pt-4 sm:pb-22">
          <Container>
            <div className="relative overflow-hidden rounded-[28px] bg-[#111827] px-6 py-9 text-white sm:px-10 sm:py-11">
              <div
                className="absolute -right-16 -top-20 size-64 rounded-full bg-[#7c3aed] opacity-75"
                aria-hidden="true"
              />
              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-primary-soft">Ready when you are</p>
                  <h2 className="mt-2 max-w-xl text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                    Find technology that earns its place.
                  </h2>
                </div>
                <Link
                  href="/shop"
                  className="inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-foreground transition hover:bg-primary-soft"
                >
                  Browse the shop <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </div>
  );
}
