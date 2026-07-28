import { ArrowRight, Headphones, Mouse, Play, Sparkles, Watch } from "lucide-react";
import { motion } from "framer-motion";

import { Badge, Button } from "@/shared/components";

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-350 px-5 pt-8 lg:px-8 lg:pt-12">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.85fr)_minmax(320px,1fr)]">
        <div className="relative overflow-hidden rounded-[28px] bg-[#D1FAE5] px-7 py-9 sm:px-12 sm:py-12 md:min-h-140 xl:min-h-152.5">
          <div className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-[#BFDBFE]/80 blur-3xl" />
          <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-[#FED7AA]/80 blur-3xl" />
          <div className="relative z-10 md:max-w-[52%]">
            <Badge className="rounded-full border-0 bg-white/80 px-3 py-1 text-[#16803d] shadow-sm">
              <Sparkles className="mr-1 h-3 w-3" /> CURATED TECH, CLEARLY BETTER
            </Badge>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.02] tracking-[-0.065em] text-[#111827] sm:text-5xl md:text-6xl xl:text-7xl">
              The joy of <span className="text-[#16A34A]">better</span> tech.
            </h1>
            <p className="mt-6 max-w-sm text-base leading-7 text-slate-600 sm:text-lg">
              Fresh essentials for your desk, home, and everywhere in between — thoughtfully
              selected to keep up with you.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3 min-[420px]:flex-row min-[420px]:flex-wrap">
              <Button className="h-12 rounded-full bg-[#16A34A] px-6 text-white hover:bg-[#12803a]">
                Shop the edit <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-12 rounded-full border-white bg-white/60 px-5 text-[#111827] hover:bg-white"
              >
                <Play className="mr-2 h-4 w-4 fill-current" />
                See what&apos;s new
              </Button>
            </div>
            <div className="mt-10 flex max-w-xs items-center gap-3 text-sm leading-5 text-slate-600">
              <div className="flex -space-x-2">
                <span className="h-7 w-7 rounded-full border-2 border-[#D1FAE5] bg-[#7C3AED]" />
                <span className="h-7 w-7 rounded-full border-2 border-[#D1FAE5] bg-[#22C55E]" />
                <span className="h-7 w-7 rounded-full border-2 border-[#D1FAE5] bg-[#FB923C]" />
              </div>
              <span>
                <b className="font-semibold text-[#111827]">48k+</b> happy early adopters
              </span>
            </div>
          </div>
          <div
            aria-hidden="true"
            data-hero-visual
            className="relative z-10 mt-8 h-72 md:absolute md:inset-y-0 md:right-[4%] md:mt-0 md:w-[40%]"
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 24,
                rotate: -6,
              }}
              animate={{
                opacity: 1,
                y: 0,
                rotate: -6,
              }}
              transition={{
                duration: 0.7,
                delay: 0.15,
              }}
              className="absolute bottom-0 right-0 grid h-64 w-48 place-items-center rounded-[42px] border-10 border-[#111827] bg-slate-100 shadow-2xl md:bottom-8 md:h-80 md:w-60"
            >
              <div className="absolute top-3 h-5 w-20 rounded-full bg-[#111827]" />
              <div className="grid h-28 w-28 place-items-center rounded-full bg-[#BFDBFE] text-[#305997]">
                <Headphones className="h-16 w-16" />
              </div>
              <div className="absolute bottom-6 text-center">
                <span className="text-xs font-semibold text-slate-400">SONIC ARC</span>
                <p className="text-base font-bold text-[#111827]">Noise off. World on.</p>
              </div>
            </motion.div>
            <motion.div
              animate={{
                y: [0, -9, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-20 left-0 grid h-16 w-16 place-items-center rounded-2xl border border-white/70 bg-white/70 text-[#7C3AED] shadow-lg backdrop-blur md:bottom-24"
            >
              <Watch className="h-7 w-7" />
            </motion.div>
            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-3 left-10 grid h-14 w-14 place-items-center rounded-2xl border border-white/70 bg-white/80 text-[#16A34A] shadow-lg md:bottom-8"
            >
              <Mouse className="h-6 w-6" />
            </motion.div>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
          <article className="relative min-h-65 overflow-hidden rounded-[28px] bg-[#FED7AA] p-7 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a45210]">
              The weekly drop
            </p>
            <h2 className="mt-4 max-w-48 text-3xl font-semibold leading-tight tracking-tighter text-[#3f2b1c]">
              Sound, dialed in.
            </h2>
            <a
              href="#deals"
              className="mt-7 inline-flex items-center text-sm font-semibold text-[#3f2b1c] hover:underline"
            >
              Explore audio <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <Headphones className="absolute -bottom-3 -right-3 h-40 w-40 text-[#f59e0b] opacity-80" />
          </article>
          <article className="relative min-h-65 overflow-hidden rounded-[28px] bg-[#BFDBFE] p-7 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#3d64a0]">
              Designed for focus
            </p>
            <h2 className="mt-4 max-w-48 text-3xl font-semibold leading-tight tracking-tighter text-[#142d50]">
              Your desk, upgraded.
            </h2>
            <a
              href="#collections"
              className="mt-7 inline-flex items-center text-sm font-semibold text-[#142d50] hover:underline"
            >
              Build your setup <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <div className="absolute -bottom-7 -right-8 h-32 w-44 rounded-t-4xl border-10 border-[#305997] bg-[#dcecff] shadow-xl" />
          </article>
        </div>
      </div>
    </section>
  );
}
