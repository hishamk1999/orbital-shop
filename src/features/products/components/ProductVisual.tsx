import type { ProductTone, ProductVisual as VisualKind } from "../types/product.types";

const tones: Record<ProductTone, string> = {
  mint: "bg-primary-soft",
  sky: "bg-sky-soft",
  peach: "bg-peach-soft",
  violet: "bg-violet-200",
  rose: "bg-rose-200",
  sand: "bg-amber-100",
};

export function ProductVisual({
  kind,
  tone,
  name,
}: {
  kind: VisualKind;
  tone: ProductTone;
  name: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${name} product illustration`}
      className={`relative grid h-52 place-items-center overflow-hidden rounded-[18px] sm:h-60 ${tones[tone]}`}
    >
      <span className="absolute -right-8 -top-10 size-36 rounded-full bg-white/35" />
      <span className="absolute -bottom-12 -left-6 size-28 rounded-full bg-white/25" />
      <VisualShape kind={kind} />
    </div>
  );
}

function VisualShape({ kind }: { kind: VisualKind }) {
  if (kind === "headphones")
    return (
      <div className="relative h-28 w-32 rounded-t-full border-10 border-b-0 border-slate-900">
        <span className="absolute -bottom-10 -left-4 h-16 w-9 rounded-2xl bg-slate-900" />
        <span className="absolute -bottom-10 -right-4 h-16 w-9 rounded-2xl bg-slate-900" />
      </div>
    );
  if (kind === "keyboard")
    return (
      <div className="grid h-24 w-40 rotate-[-4deg] grid-cols-5 gap-1.5 rounded-2xl border-[7px] border-slate-900 bg-white/70 p-3 shadow-xl">
        {Array.from({ length: 15 }, (_, index) => (
          <span className="rounded-sm bg-slate-900/75" key={index} />
        ))}
      </div>
    );
  if (kind === "watch")
    return (
      <div className="relative h-32 w-20 rounded-[26px] border-8 border-slate-900 bg-white/70 shadow-xl before:absolute before:-top-12 before:left-1/2 before:bg-slate-900 after:-bottom-12 after:h-12 after:w-9 after:-translate-x-1/2">
        <span className="absolute left-1/2 top-1/2 size-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-primary" />
      </div>
    );
  if (kind === "camera")
    return (
      <div className="relative h-24 w-36 rotate-2 rounded-3xl bg-slate-900 shadow-xl">
        <span className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-[9px] border-white/80 bg-sky-200" />
        <span className="absolute right-4 top-4 size-3 rounded-full bg-primary-bright" />
      </div>
    );
  if (kind === "controller")
    return (
      <div className="relative h-24 w-40 rounded-[45%_45%_38%_38%] bg-slate-900 shadow-xl">
        <span className="absolute left-8 top-9 h-3 w-10 rounded-full bg-white after:absolute after:left-0 after:-top-3 after:h-10 after:w-3 after:rounded-full after:bg-white" />
        <span className="absolute right-9 top-8 size-4 rounded-full bg-primary-bright shadow-[20px_10px_0_#fff]" />
      </div>
    );
  if (kind === "speaker")
    return (
      <div className="relative h-36 w-24 rounded-[28px] bg-slate-900 p-4 shadow-xl">
        <span className="block size-16 rounded-full border-8 border-white/70 bg-slate-700" />
        <span className="absolute bottom-4 left-1/2 size-3 -translate-x-1/2 rounded-full bg-primary-bright" />
      </div>
    );
  if (kind === "phone")
    return (
      <div className="relative h-40 w-24 rotate-3 rounded-[28px] border-8 border-slate-900 bg-linear-to-br from-white via-sky-100 to-violet-300 shadow-xl">
        <span className="absolute left-1/2 top-1 h-2 w-10 -translate-x-1/2 rounded-full bg-slate-900" />
      </div>
    );
  if (kind === "charger")
    return (
      <div className="relative h-24 w-24 -rotate-6 rounded-[26px] bg-slate-900 shadow-xl">
        <span className="absolute -top-6 left-6 h-7 w-2 rounded-full bg-slate-500 shadow-[28px_0_0_#64748b]" />
        <span className="absolute bottom-5 left-1/2 h-3 w-8 -translate-x-1/2 rounded-full bg-primary-bright" />
      </div>
    );
  if (kind === "lamp")
    return (
      <div className="relative h-36 w-36">
        <span className="absolute left-5 top-1 h-20 w-24 -rotate-12 rounded-t-full rounded-br-[60%] bg-slate-900" />
        <span className="absolute bottom-4 left-1/2 h-24 w-3 -translate-x-1/2 rotate-18 bg-slate-900" />
        <span className="absolute bottom-0 left-1/2 h-4 w-24 -translate-x-1/2 rounded-full bg-slate-900" />
      </div>
    );
  if (kind === "mouse")
    return (
      <div className="relative h-32 w-20 rounded-[45px] bg-slate-900 shadow-xl">
        <span className="absolute left-1/2 top-5 h-8 w-1.5 -translate-x-1/2 rounded-full bg-white/70" />
      </div>
    );
  if (kind === "display")
    return (
      <div className="relative h-28 w-44 rounded-2xl border-[9px] border-slate-900 bg-linear-to-br from-white/90 to-sky-200 shadow-xl after:absolute after:left-1/2 after:top-full after:h-10 after:w-3 after:-translate-x-1/2 after:bg-slate-900">
        <span className="absolute -bottom-13 left-1/2 h-3 w-20 -translate-x-1/2 rounded-full bg-slate-900" />
      </div>
    );
  return (
    <div className="relative h-32 w-32">
      <span className="absolute left-3 top-2 h-24 w-12 -rotate-12 rounded-[28px] bg-slate-900 shadow-xl" />
      <span className="absolute bottom-2 right-3 h-24 w-12 rotate-12 rounded-[28px] bg-slate-900 shadow-xl" />
      <span className="absolute left-7 top-6 size-4 rounded-full bg-white/80" />
      <span className="absolute right-7 top-10 size-4 rounded-full bg-white/80" />
    </div>
  );
}
