import {
  ChevronDown,
  CircleHelp,
  CreditCard,
  Headphones,
  PackageSearch,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { ElementType } from "react";

import { Container } from "@/shared/layouts";
import { InformationPageShell } from "../components/InformationPageShell";
import { SectionHeading } from "../components/SectionHeading";

type FaqGroup = {
  id: string;
  title: string;
  description: string;
  icon: ElementType;
  tone: string;
  items: Array<{ question: string; answer: string }>;
};

const faqGroups: FaqGroup[] = [
  {
    id: "orders",
    title: "Orders & payment",
    description: "Placing, changing, and paying for an order.",
    icon: CreditCard,
    tone: "bg-primary-soft text-green-800",
    items: [
      {
        question: "Can I change or cancel an order?",
        answer:
          "Contact us as soon as possible. We can usually update or cancel an order before warehouse processing begins. Once dispatched, the order follows the standard return process.",
      },
      {
        question: "When will my card be charged?",
        answer:
          "Payment is authorized when you place the order and finalized when processing begins. A declined authorization does not create an order.",
      },
      {
        question: "Which payment methods are supported?",
        answer:
          "The demo storefront does not process real payments. A production Orbital checkout would list the available cards and wallet options before confirmation.",
      },
    ],
  },
  {
    id: "delivery",
    title: "Delivery",
    description: "Dispatch, tracking, and arrival times.",
    icon: PackageSearch,
    tone: "bg-sky-soft text-blue-900",
    items: [
      {
        question: "How quickly will my order arrive?",
        answer:
          "Standard delivery typically takes 3–5 business days after dispatch. Express delivery typically takes 1–2 business days. Destination and carrier conditions can affect these estimates.",
      },
      {
        question: "How do I track my parcel?",
        answer:
          "When an order ships, its dispatch message includes the carrier and tracking link. Tracking can take a few hours to show the first scan.",
      },
      {
        question: "What if my parcel arrives damaged?",
        answer:
          "Keep the packaging and contact us promptly with the order number and clear photos of the parcel and product. We will guide you through replacement or refund options.",
      },
    ],
  },
  {
    id: "returns",
    title: "Returns & products",
    description: "Returns, warranties, and product questions.",
    icon: RotateCcw,
    tone: "bg-peach-soft text-amber-950",
    items: [
      {
        question: "How long do I have to make a return?",
        answer:
          "Eligible products can be returned within 30 days of delivery. Keep the accessories and original packaging so the return can be checked quickly.",
      },
      {
        question: "Do products include a warranty?",
        answer:
          "Warranty coverage varies by product and manufacturer. The product page and included documentation provide the exact term and coverage.",
      },
      {
        question: "How does Orbital choose products?",
        answer:
          "We prioritize clear everyday usefulness, thoughtful construction, repairability where possible, and documentation that helps you understand what you are buying.",
      },
    ],
  },
  {
    id: "account",
    title: "Your local account",
    description: "How this browser-only demo stores account details.",
    icon: ShieldCheck,
    tone: "bg-[#ede9fe] text-violet-900",
    items: [
      {
        question: "Where is my account stored?",
        answer:
          "In this demo, account and session data remain in local browser storage on this device. Orbital does not send those details to a backend.",
      },
      {
        question: "Why is my account missing on another device?",
        answer:
          "Local browser storage does not sync between devices or browsers. Clearing site data also removes the locally stored demo account.",
      },
    ],
  },
];

export function FaqsPage() {
  return (
    <InformationPageShell
      eyebrow="Frequently asked questions"
      title="Useful answers, without the support maze."
      description="Start with the topic that matches your question. Each answer is short, specific, and designed to point you toward the next step."
      visual={<QuestionSignal />}
    >
      <section className="py-18 sm:py-22">
        <Container>
          <SectionHeading
            eyebrow="Choose a topic"
            title="What can we help you untangle?"
            description="Open any question for the practical answer. Your place stays easy to find as you move between topics."
          />
          <nav className="mt-8 flex gap-2 overflow-x-auto pb-2" aria-label="FAQ topics">
            {faqGroups.map((group) => (
              <a
                key={group.id}
                href={`#${group.id}`}
                className="shrink-0 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-primary-bright hover:text-green-800"
              >
                {group.title}
              </a>
            ))}
          </nav>

          <div className="mt-10 space-y-6">
            {faqGroups.map(({ id, title, description, icon: Icon, tone, items }) => (
              <section
                id={id}
                key={id}
                className="scroll-mt-36 rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,0.035)] sm:p-7"
                aria-labelledby={`${id}-heading`}
              >
                <div className="grid gap-5 lg:grid-cols-[0.42fr_1fr] lg:gap-10">
                  <div>
                    <span className={`grid size-11 place-items-center rounded-2xl ${tone}`}>
                      <Icon className="size-5" />
                    </span>
                    <h2
                      id={`${id}-heading`}
                      className="mt-4 text-xl font-semibold tracking-[-0.035em]"
                    >
                      {title}
                    </h2>
                    <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
                      {description}
                    </p>
                  </div>
                  <div className="divide-y divide-slate-200">
                    {items.map((item) => (
                      <details key={item.question} className="group py-1">
                        <summary className="flex min-h-14 list-none items-center justify-between gap-5 rounded-xl py-3 font-semibold marker:hidden">
                          <span>{item.question}</span>
                          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-500 transition group-open:rotate-180">
                            <ChevronDown className="size-4" />
                          </span>
                        </summary>
                        <p className="max-w-2xl pb-5 pr-10 text-sm leading-7 text-slate-600">
                          {item.answer}
                        </p>
                      </details>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </Container>
      </section>
    </InformationPageShell>
  );
}

function QuestionSignal() {
  return (
    <div className="relative min-h-80 overflow-hidden rounded-[28px] bg-[#7c3aed] p-6 text-white shadow-[0_24px_70px_rgba(76,29,149,0.18)] sm:p-8">
      <div className="absolute -right-16 -top-16 size-60 rounded-full bg-[#a855f7]" aria-hidden="true" />
      <div
        className="absolute -bottom-20 left-8 size-52 rounded-full bg-primary-bright/45 blur-2xl"
        aria-hidden="true"
      />
      <div className="relative flex items-center justify-between">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold ring-1 ring-white/20">
          <Sparkles className="size-3.5" /> Answer signal
        </span>
        <CircleHelp className="size-7 text-violet-200" />
      </div>
      <div className="relative mt-10 space-y-3">
        <div className="mr-10 rounded-2xl rounded-bl-md bg-white p-4 text-sm font-semibold text-foreground shadow-lg">
          Where is my order?
        </div>
        <div className="ml-12 rounded-2xl rounded-br-md bg-[#111827] p-4 text-sm leading-6 text-slate-200 shadow-lg">
          Check the dispatch message for the carrier link. The first scan can take a few hours.
        </div>
      </div>
      <div className="relative mt-6 flex items-center gap-2 text-xs font-medium text-violet-100">
        <Headphones className="size-4" />
        Plain answers. Clear next steps.
      </div>
    </div>
  );
}
