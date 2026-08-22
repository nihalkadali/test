'use client'

import { motion, useReducedMotion } from 'motion/react'
import {
  Activity,
  AudioLines,
  BrainCircuit,
  ChevronDown,
  Mic,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react'
import { IconCircle, Pill, Reveal } from '@/components/kit'
import { PulseRings, Waveform } from '@/components/waveform'

const stages = [
  { label: 'Cough', icon: <Mic />, tone: 'teal' as const },
  { label: 'Waveform', icon: <AudioLines />, tone: 'teal' as const },
  { label: 'ML Model', icon: <BrainCircuit />, tone: 'blue' as const },
  { label: 'Screening Flag', icon: <ShieldCheck />, tone: 'warning' as const },
]

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <header className="relative overflow-hidden">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, color-mix(in oklab, var(--primary) 30%, transparent), transparent)',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pt-20 pb-24 sm:px-8 sm:pt-28 lg:grid-cols-[1.05fr_1fr] lg:pb-28">
        <div className="flex flex-col gap-7">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2">
              <Pill tone="teal">Team Error 404</Pill>
              <Pill tone="blue">Hacks 11.0 · Healthcare</Pill>
            </div>
          </Reveal>

          <div className="flex flex-col gap-5">
            <Reveal delay={0.06}>
              <h1 className="font-serif text-5xl leading-[0.95] tracking-tight text-balance sm:text-6xl lg:text-7xl">
                Cough
                <span className="text-primary">Sense</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl">
                AI-Powered Cough-Sound Respiratory Distress Pre-Screener
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.18}>
            <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-warning/30 bg-warning/[0.08] px-4 py-2">
              <span
                className="relative flex size-2 items-center justify-center"
                aria-hidden="true"
              >
                <span className="absolute size-2 animate-ping rounded-full bg-warning/70" />
                <span className="size-2 rounded-full bg-warning" />
              </span>
              <span className="text-sm font-medium text-warning">
                Pre-screening, not diagnosis
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="max-w-xl text-base leading-relaxed text-pretty text-muted-foreground/90">
              CoughSense analyzes a cough recording and produces a
              confidence-scored screening flag that routes potentially
              concerning cases to a human health worker. It is explicitly a
              pre-screening triage nudge, not a clinical diagnosis.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <blockquote className="max-w-xl border-l-2 border-primary/50 pl-5 font-serif text-lg leading-relaxed text-pretty text-foreground/90 sm:text-xl">
              &ldquo;CoughSense is not replacing the doctor. It is helping the
              right patient reach human attention sooner.&rdquo;
            </blockquote>
          </Reveal>

          <Reveal delay={0.36}>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#demo"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:brightness-110 hover:shadow-[0_16px_40px_-16px_color-mix(in_oklab,var(--primary)_80%,transparent)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
              >
                <Mic className="size-4" aria-hidden="true" />
                Try the demo
              </a>
              <a
                href="#results"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/[0.06] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                <Activity className="size-4" aria-hidden="true" />
                See prototype results
              </a>
            </div>
          </Reveal>
        </div>

        {/* animated visual */}
        <Reveal delay={0.2} y={32}>
          <div className="surface glow-teal relative flex flex-col gap-6 rounded-3xl border border-primary/20 p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                live signal
              </span>
              <span className="flex items-center gap-2 font-mono text-[11px] text-primary">
                <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                capturing
              </span>
            </div>

            {/* mic + rings */}
            <div className="flex items-center gap-5">
              <div className="relative flex size-20 shrink-0 items-center justify-center">
                <PulseRings />
                <span className="relative flex size-14 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/40">
                  <Mic className="size-6 text-primary" aria-hidden="true" />
                </span>
              </div>
              <div className="h-20 min-w-0 flex-1">
                <Waveform bars={40} />
              </div>
            </div>

            {/* stage chain */}
            <ol className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stages.map((s, i) => (
                <motion.li
                  key={s.label}
                  className="flex flex-col items-center gap-2 rounded-xl border border-border/70 bg-background/40 px-2 py-3 text-center"
                  animate={
                    reduce
                      ? {}
                      : {
                          borderColor: [
                            'color-mix(in oklab, var(--border) 100%, transparent)',
                            'color-mix(in oklab, var(--primary) 55%, transparent)',
                            'color-mix(in oklab, var(--border) 100%, transparent)',
                          ],
                        }
                  }
                  transition={{
                    duration: 3.2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.8,
                    times: [0, 0.2, 1],
                  }}
                >
                  <IconCircle tone={s.tone} size="sm">
                    {s.icon}
                  </IconCircle>
                  <span className="text-[11px] leading-tight font-medium text-balance">
                    {s.label}
                  </span>
                </motion.li>
              ))}
            </ol>

            {/* mock verdict strip */}
            <div className="flex items-center justify-between gap-4 rounded-xl border border-warning/25 bg-warning/[0.07] px-4 py-3">
              <span className="flex items-center gap-2.5 text-sm font-medium text-warning">
                <Stethoscope className="size-4" aria-hidden="true" />
                Routed for human review
              </span>
              <span className="font-mono text-sm text-warning/90">86%</span>
            </div>
          </div>
        </Reveal>
      </div>

      {/* scroll cue */}
      <div className="relative flex justify-center pb-10">
        <motion.a
          href="#problem"
          className="flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY }}
        >
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase">
            scroll
          </span>
          <ChevronDown className="size-4" aria-hidden="true" />
        </motion.a>
      </div>
    </header>
  )
}
