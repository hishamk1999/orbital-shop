import type { Metadata } from "next";

import { CareersPage } from "@/features/careers";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore open roles at Orbital and help build a calmer, clearer way to shop for technology.",
  alternates: {
    canonical: "/careers",
  },
};

export default function Page() {
  return <CareersPage />;
}
