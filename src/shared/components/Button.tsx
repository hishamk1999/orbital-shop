import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "dark" | "outline" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-green-700 disabled:bg-green-300",
  dark: "bg-foreground text-white hover:bg-slate-700 disabled:bg-slate-400",
  outline:
    "border border-border bg-white text-foreground hover:border-primary-bright hover:text-primary",
  ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-foreground",
};

export function Button({
  className = "",
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
