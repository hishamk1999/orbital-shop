import type { Metadata } from "next";

import { ForgotPasswordPage } from "@/features/auth";

export const metadata: Metadata = {
  title: "Reset your password",
  description: "Recover your local Orbital account and choose a new password.",
};

export default function Page() {
  return <ForgotPasswordPage />;
}
