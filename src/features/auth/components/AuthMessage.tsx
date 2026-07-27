import { AlertCircle, CheckCircle2 } from "lucide-react";

export function AuthMessage({
  tone,
  children,
}: {
  tone: "error" | "success";
  children: React.ReactNode;
}) {
  const Icon = tone === "success" ? CheckCircle2 : AlertCircle;
  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={`flex gap-3 rounded-2xl p-3.5 text-sm leading-5 ${
        tone === "success"
          ? "bg-primary-soft text-green-900"
          : "bg-red-50 text-red-800"
      }`}
    >
      <Icon className="mt-0.5 size-4 shrink-0" />
      <span>{children}</span>
    </div>
  );
}
