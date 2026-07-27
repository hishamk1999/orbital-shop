import Link from "next/link";
import { InstagramLogoIcon, TwitterLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

import { Container } from "./Container";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "New arrivals", href: "/shop" },
      { label: "Audio", href: "/shop" },
      { label: "Gaming", href: "/shop" },
      { label: "Workspace", href: "/shop" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our story", href: "/our-story" },
      { label: "Journal", href: "/shop" },
      { label: "Careers", href: "/careers" },
      { label: "Affiliates", href: "/affiliates" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping & returns", href: "/shipping-returns" },
      { label: "Track your order", href: "/shipping-returns" },
      { label: "Contact", href: "/faqs" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-[-0.06em]">
              <div className="flex items-center justify-center size-8 rounded-xl bg-primary-bright">
                <span className="inline-block h-7.5 text-xl font-normal text-white">o</span>
              </div>
              orbital<span className="text-primary-bright">.</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-6 text-slate-500">
              The enjoyable way to find technology that earns its place in your life.
            </p>
            <div className="mt-6 flex gap-2">
              <a
                aria-label="Instagram"
                className="rounded-full bg-slate-100 p-2.5 text-slate-500 hover:bg-[#D1FAE5] hover:text-[#16803d]"
                href="#instagram"
              >
                <InstagramLogoIcon className="h-4 w-4" />
              </a>
              <a
                aria-label="Twitter"
                className="rounded-full bg-slate-100 p-2.5 text-slate-500 hover:bg-[#D1FAE5] hover:text-[#16803d]"
                href="#twitter"
              >
                <TwitterLogoIcon className="h-4 w-4" />
              </a>
              <a
                aria-label="LinkedIn"
                className="rounded-full bg-slate-100 p-2.5 text-slate-500 hover:bg-[#D1FAE5] hover:text-[#16803d]"
                href="#linkedin"
              >
                <LinkedInLogoIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-sm font-semibold">{column.title}</h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:justify-between">
          <p>© 2026 Orbital Goods. All rights reserved.</p>
          <p>
            Made with ❤️ by{" "}
            <a
              className="text-[#16803d] underline font-bold"
              href="https://www.hishamkhaled.com"
              target="_blank"
            >
              Hisham Khaled
            </a>
          </p>
          <div className="flex gap-5">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Accessibility</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
