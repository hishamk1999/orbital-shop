import type { Metadata } from "next";

import { OurStoryPage } from "@/features/information";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "Learn why Orbital selects thoughtful technology that earns its place in everyday life.",
};

export default function Page() {
  return <OurStoryPage />;
}
