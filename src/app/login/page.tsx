import type { Metadata } from "next";

import { LoginPage } from "@/features/auth";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your local Orbital shopping account.",
};

export default function Page() {
  return <LoginPage />;
}
