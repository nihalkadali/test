'use client'

import { motion } from 'motion/react'
import { Check, CircleDashed } from 'lucide-react'
import {
  Card,
  Reveal,
  Section,
  StatusTag,
  staggerChild,
  staggerParent,
} from '@/components/kit'

const current = [
  'Cough audio → Mel spectrogram feature pipeline',
  'ResNet18 classifier trained on the Coswara dataset',
  'Confidence-scored screening output with human-review routing',
]

const next = [
  'Add age, gender, symptoms and clinical metadata',
  'Multimodal audio + demographic fusion',
  'Additional Coswara sound modalities (e.g. breathing)',
  'Automatic audio-quality detection',
  'Noise-robust training and testing',
  'Better confidence calibration',
  'Mobile / low-resource deployment',
]

export function Roadmap() {
  return (
    <Section
      id="roadmap"
      eyebrow="Roadmap"
      title="What exists today, and what comes next"
      lead="We are keeping the line between these two columns very visible. Everything in the right column is not built yet."
    >
      <div className="flex flex-col gap-12">
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <Card
              hover={false}
              className="glow-teal h-full border-primary/25 p-6 sm:p-7"
            >
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <h3 className="text-lg font-semibold tracking-tight">
                  Current
                </h3>
                <StatusTag status="implemented" />
              </div>
              <motion.ul
                className="flex flex-col gap-3"
                variants={staggerParent}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
              >
                {current.map((c) => (
                  <motion.li
                    key={c}
                    variants={staggerChild}
                    className="flex items-start gap-3"
                  >
                    <span
                      className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 ring-1 ring-primary/40"
                      aria-hidden="true"
                    >
                      <Check className="size-3 text-primary" />
                    </span>
                    <span className="text-sm leading-relaxed text-pretty">
                      {c}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </Card>
          </Reveal>

          <Reveal delay={0.08}>
            <Card
              hover={false}
              className="h-full border-dashed border-border p-6 sm:p-7"
            >
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <h3 className="text-lg font-semibold tracking-tight text-muted-foreground">
                  Next
                </h3>
                <StatusTag status="planned" />
              </div>
              <motion.ul
                className="flex flex-col gap-3"
                variants={staggerParent}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                {next.map((n) => (
                  <motion.li
                    key={n}
                    variants={staggerChild}
                    className="flex items-start gap-3"
                  >
                    <span
                      className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-muted ring-1 ring-border"
                      aria-hidden="true"
                    >
                      <CircleDashed className="size-3 text-muted-foreground" />
                    </span>
                    <span className="text-sm leading-relaxed text-pretty text-muted-foreground">
                      {n}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </Card>
          </Reveal>
        </div>

        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/[0.05] px-6 py-12 text-center sm:px-12 sm:py-16">
            <div
              className="pointer-events-none absolute inset-x-0 -top-24 h-48 opacity-40 blur-3xl"
              style={{
                background:
                  'radial-gradient(closest-side, color-mix(in oklab, var(--primary) 40%, transparent), transparent)',
              }}
              aria-hidden="true"
            />
            <blockquote className="relative mx-auto max-w-3xl font-serif text-2xl leading-snug text-balance sm:text-3xl lg:text-4xl">
              &ldquo;CoughSense is not replacing the doctor. It is helping the
              right patient reach human attention sooner.&rdquo;
            </blockquote>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
