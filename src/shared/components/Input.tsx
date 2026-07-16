import type { InputHTMLAttributes } from "react";

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`h-11 w-full rounded-xl border border-border bg-white px-4 text-sm text-foreground shadow-sm transition placeholder:text-slate-400 hover:border-slate-300 focus:border-primary-bright focus:outline-none focus:ring-4 focus:ring-green-100 ${className}`}
      {...props}
    />
  );
}
