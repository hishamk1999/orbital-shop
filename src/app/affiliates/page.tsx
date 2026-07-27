import type { Metadata } from "next";

import { AffiliatesPage } from "@/features/affiliates";

export const metadata: Metadata = {
  title: "Affiliates",
  description:
    "Join the Orbital affiliate program and earn commission by sharing thoughtful technology with your audience.",
  alternates: {
    canonical: "/affiliates",
  },
};

export default function Page() {
  return <AffiliatesPage />;
}
