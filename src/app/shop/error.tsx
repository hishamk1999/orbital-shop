"use client";

import { useEffect } from "react";

import { ShopErrorState } from "@/features/products";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return <ShopErrorState reset={reset} />;
}
