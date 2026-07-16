import Link from "next/link";

import { Container } from "./Container";

const columns = [
  { title: "Shop", links: ["New arrivals", "Audio", "Gaming", "Workspace"] },
  { title: "Company", links: ["Our story", "Journal", "Careers", "Affiliates"] },
  { title: "Help", links: ["Shipping & returns", "Track your order", "Contact", "FAQs"] },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-[-0.06em]">
              <span className="grid size-8 place-items-center rounded-xl bg-primary-bright text-sm text-white">o</span>
              orbital<span className="text-primary-bright">.</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-6 text-slate-500">
              The enjoyable way to find technology that earns its place in your life.
            </p>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm font-semibold">{column.title}</h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((label) => (
                  <li key={label}>
                    <Link href="/shop" className="text-sm text-slate-500 hover:text-primary">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:justify-between">
          <p>© 2026 Orbital Goods. All rights reserved.</p>
          <div className="flex gap-5"><span>Privacy</span><span>Terms</span><span>Accessibility</span></div>
        </div>
      </Container>
    </footer>
  );
}
