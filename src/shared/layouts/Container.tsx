import type { HTMLAttributes } from "react";

export function Container({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`mx-auto w-full max-w-350 px-5 lg:px-8 ${className}`} {...props} />;
}
