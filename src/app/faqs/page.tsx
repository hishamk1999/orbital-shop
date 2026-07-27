import type { Metadata } from "next";

import { FaqsPage } from "@/features/information";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description:
    "Find clear answers about Orbital orders, delivery, returns, products, and local accounts.",
};

export default function Page() {
  return <FaqsPage />;
}
