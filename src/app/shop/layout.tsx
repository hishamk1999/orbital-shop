import type { ReactNode } from "react";

import { Footer, Header } from "@/shared/layouts";

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
