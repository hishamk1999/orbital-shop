import type { Metadata } from "next";

import { ShippingReturnsPage } from "@/features/information";

export const metadata: Metadata = {
  title: "Shipping & returns",
  description:
    "Review Orbital delivery options, estimated arrival times, and the 30-day return process.",
};

export default function Page() {
  return <ShippingReturnsPage />;
}
