import {
  Camera,
  Gamepad2,
  Headphones,
  Keyboard,
  Monitor,
  Mouse,
  Smartphone,
  Speaker,
  Sun,
  Watch,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/shared/lib/utils";
import type { ProductTone, ProductVisual as VisualKind } from "../types/product.types";

const tones: Record<ProductTone, string> = {
  mint: "bg-primary-soft",
  sky: "bg-sky-soft",
  peach: "bg-peach-soft",
  violet: "bg-violet-200",
  rose: "bg-rose-200",
  sand: "bg-amber-100",
};

const visualIcons: Record<VisualKind, LucideIcon> = {
  headphones: Headphones,
  keyboard: Keyboard,
  watch: Watch,
  camera: Camera,
  controller: Gamepad2,
  speaker: Speaker,
  phone: Smartphone,
  charger: Zap,
  lamp: Sun,
  mouse: Mouse,
  display: Monitor,
  buds: Headphones,
};

export function ProductVisual({
  kind,
  tone,
  name,
  className,
  iconClassName,
  decorative = false,
}: {
  kind: VisualKind;
  tone: ProductTone;
  name: string;
  className?: string;
  iconClassName?: string;
  decorative?: boolean;
}) {
  const Icon = visualIcons[kind];

  return (
    <div
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : `${name} product illustration`}
      className={cn(
        "relative grid h-52 place-items-center overflow-hidden rounded-[18px] sm:h-60",
        tones[tone],
        className,
      )}
    >
      <span className="absolute -right-8 -top-10 size-36 rounded-full bg-white/35" />
      <span className="absolute -bottom-12 -left-6 size-28 rounded-full bg-white/25" />
      <Icon
        aria-hidden="true"
        strokeWidth={1.45}
        className={cn(
          "relative size-24 text-foreground drop-shadow-xl transition-transform duration-300 group-hover:scale-110",
          iconClassName,
        )}
      />
    </div>
  );
}
