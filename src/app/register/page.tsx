import type { Metadata } from "next";

import { RegisterPage } from "@/features/auth";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Create a local Orbital shopping account on this browser.",
};

export default function Page() {
  return <RegisterPage />;
}
