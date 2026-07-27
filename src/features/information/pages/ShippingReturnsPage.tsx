import {
  BadgeCheck,
  Box,
  Clock3,
  PackageCheck,
  RotateCcw,
  Truck,
} from "lucide-react";

import { Container } from "@/shared/layouts";
import { InformationPageShell } from "../components/InformationPageShell";
import { SectionHeading } from "../components/SectionHeading";

const deliveryOptions = [
  {
    name: "Standard delivery",
    timing: "3–5 business days",
    price: "$6 or free over $75",
    tone: "bg-primary-soft text-green-800",
    icon: Truck,
  },
  {
    name: "Express delivery",
    timing: "1–2 business days",
    price: "$14",
    tone: "bg-sky-soft text-blue-900",
    icon: Clock3,
  },
  {
    name: "Alaska & Hawaii",
    timing: "5–8 business days",
    price: "Calculated at checkout",
    tone: "bg-peach-soft text-amber-950",
    icon: Box,
  },
];

const returnSteps = [
  {
    title: "Start the return",
    description: "Contact us within 30 days of delivery with your order number and reason.",
  },
  {
    title: "Pack it safely",
    description: "Include the product, accessories, and original packaging whenever possible.",
  },
  {
    title: "Send it back",
    description: "Use the provided label and drop the parcel with the named carrier.",
  },
  {
    title: "Receive your refund",
    description: "We inspect the return, then refund the original payment method in 3–5 days.",
  },
];

export function ShippingReturnsPage() {
  return (
    <InformationPageShell
      eyebrow="Shipping & returns"
      title="From our shelf to yours, without the guesswork."
      description="Clear delivery windows, careful packing, and a 30-day return path when something is not quite right."
      visual={<ParcelJourney />}
    >
      <section className="py-18 sm:py-22">
        <Container>
          <SectionHeading
            eyebrow="Delivery at a glance"
            title="Choose the pace that suits the parcel."
            description="Orders placed before 2 PM ET usually leave our warehouse within one business day. Delivery estimates begin after dispatch."
          />
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {deliveryOptions.map(({ name, timing, price, tone, icon: Icon }) => (
              <article
                key={name}
                className="rounded-[22px] border border-slate-200/80 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
              >
                <span className={`grid size-11 place-items-center rounded-2xl ${tone}`}>
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{name}</h3>
                <p className="mt-2 text-sm font-semibold text-slate-700">{timing}</p>
                <p className="mt-1 text-sm leading-6 text-slate-500">{price}</p>
              </article>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-slate-500">
            Delivery windows are estimates for US addresses. Weekends, holidays, weather, and
            carrier delays can affect arrival times.
          </p>
        </Container>
      </section>

      <section className="bg-[#f4f7f5] py-18 sm:py-22">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <SectionHeading
              eyebrow="A simple return path"
              title="Four steps, kept straightforward."
              description="Unused products in their original condition can be returned within 30 days of delivery."
            />
            <ol className="grid gap-4">
              {returnSteps.map((step, index) => (
                <li
                  key={step.title}
                  className="grid grid-cols-[auto_1fr] gap-4 rounded-[20px] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.035)]"
                >
                  <span className="grid size-9 place-items-center rounded-full bg-foreground text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="py-18 sm:py-22">
        <Container className="grid gap-5 lg:grid-cols-2">
          <article className="rounded-[24px] bg-primary-soft p-7 sm:p-8">
            <BadgeCheck className="size-7 text-green-800" />
            <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">What qualifies</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-green-950">
              <li>Products returned within 30 days of delivery</li>
              <li>All included accessories, manuals, and components</li>
              <li>Items in resalable condition with proof of purchase</li>
              <li>Faulty products reported as soon as the issue appears</li>
            </ul>
          </article>
          <article className="rounded-[24px] bg-peach-soft p-7 sm:p-8">
            <RotateCcw className="size-7 text-amber-900" />
            <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em]">A few exceptions</h2>
            <p className="mt-4 text-sm leading-6 text-amber-950">
              Opened personal-audio items, gift cards, downloadable products, and final-sale
              products cannot be returned unless faulty. Return shipping may be deducted when the
              product is not defective.
            </p>
          </article>
        </Container>
      </section>
    </InformationPageShell>
  );
}

function ParcelJourney() {
  const stages = [
    { label: "Packed", icon: Box },
    { label: "On the way", icon: Truck },
    { label: "Delivered", icon: PackageCheck },
  ];

  return (
    <div className="relative overflow-hidden rounded-[28px] bg-[#111827] p-6 text-white shadow-[0_24px_70px_rgba(15,23,42,0.16)] sm:p-8">
      <div
        className="absolute -right-16 -top-20 size-56 rounded-full bg-[#7c3aed] opacity-80"
        aria-hidden="true"
      />
      <p className="relative text-xs font-semibold uppercase tracking-[0.15em] text-primary-soft">
        Your parcel journey
      </p>
      <ol className="relative mt-8 space-y-4">
        {stages.map(({ label, icon: Icon }, index) => (
          <li key={label} className="flex items-center gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15">
              <Icon className="size-5" />
            </span>
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <span className="font-semibold">{label}</span>
              <span
                className={`h-px flex-1 ${index === stages.length - 1 ? "bg-primary-bright" : "bg-white/20"}`}
              />
              <span className="font-mono text-xs text-slate-400">0{index + 1}</span>
            </div>
          </li>
        ))}
      </ol>
      <div className="relative mt-7 rounded-2xl bg-white p-4 text-foreground">
        <p className="text-xs font-semibold uppercase tracking-[0.13em] text-slate-400">
          Orbital promise
        </p>
        <p className="mt-1 text-sm font-semibold">Useful updates, no mystery statuses.</p>
      </div>
    </div>
  );
}
