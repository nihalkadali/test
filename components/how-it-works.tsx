'use client'

import { motion } from 'motion/react'
import {
  AudioLines,
  BrainCircuit,
  Grid2x2,
  Mic,
  ShieldCheck,
} from 'lucide-react'
import {
  Card,
  IconCircle,
  Pill,
  Reveal,
  Section,
  staggerChild,
  staggerParent,
} from '@/components/kit'

const steps = [
  {
    n: '1',
    icon: <Mic />,
    tone: 'teal' as const,
    title: 'Record',
    body: 'The patient records a cough on a phone or a basic microphone — no specialist hardware needed.',
  },
  {
    n: '2',
    icon: <AudioLines />,
    tone: 'teal' as const,
    title: 'Preprocess',
    body: 'The audio is standardized and normalized so recordings from different devices are comparable.',
  },
  {
    n: '3',
    icon: <Grid2x2 />,
    tone: 'blue' as const,
    title: 'Feature Extraction',
    body: 'Cough audio is converted into a Mel spectrogram — frequency patterns over time.',
  },
  {
    n: '4',
    icon: <BrainCircuit />,
    tone: 'blue' as const,
    title: 'ML Classification',
    body: 'A ResNet18 deep-learning model classifies the spectrogram to identify learned respiratory patterns.',
  },
  {
    n: '5',
    icon: <ShieldCheck />,
    tone: 'warning' as const,
    title: 'Screening',
    body: 'A confidence-scored output decides whether to flag the case for human review.',
  },
]

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      eyebrow="How It Works"
      title="From a cough to a triage decision, in five steps"
      lead="The model never hears raw audio as a doctor would. It reads a picture of the sound — a Mel spectrogram — and looks for the frequency patterns it was trained on."
    >
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <motion.ol
          className="flex flex-col gap-4"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {steps.map((s) => (
            <motion.li key={s.n} variants={staggerChild}>
              <Card className="flex items-start gap-4 p-5">
                <IconCircle tone={s.tone}>{s.icon}</IconCircle>
                <div className="flex min-w-0 flex-col gap-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs text-muted-foreground">
                      Step {s.n}
                    </span>
                    <h3 className="text-base font-semibold tracking-tight">
                      {s.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              </Card>
            </motion.li>
          ))}
        </motion.ol>

        <Reveal delay={0.1}>
          <Card hover={false} className="flex flex-col gap-5 p-5 sm:p-6 lg:sticky lg:top-8">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                mel spectrogram
              </span>
              <Pill tone="blue">what the model sees</Pill>
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-black">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MEL%20Spectogram%20Cough-HtZy3aKkaqoHiIiDlMweA8dFObhIYb.png"
                alt="Cough Mel Spectrogram showing frequency energy over time"
                className="h-auto w-full"
              />
            </div>

            <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
              <span>time →</span>
              <span>↑ frequency (mel)</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-border pt-4">
              {[
                { c: 'var(--warning)', l: 'high energy' },
                { c: 'var(--primary)', l: 'mid' },
                { c: 'var(--secondary)', l: 'low' },
                { c: 'var(--muted)', l: 'quiet' },
              ].map((k) => (
                <span
                  key={k.l}
                  className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground"
                >
                  <span
                    className="size-2.5 rounded-[2px]"
                    style={{ background: k.c }}
                    aria-hidden="true"
                  />
                  {k.l}
                </span>
              ))}
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground italic">
              Illustrative visualization of a two-burst cough. Swap in your own
              spectrogram export in the results section below.
            </p>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}
