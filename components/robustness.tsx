'use client'

import { motion } from 'motion/react'
import {
  Activity,
  AudioLines,
  Gauge,
  Mic,
  Quote,
  ScanLine,
  ShieldCheck,
  Signal,
  Smartphone,
  Sparkles,
  Stethoscope,
  UserRoundCheck,
  Volume2,
  Waves,
  Zap,
} from 'lucide-react'
import {
  Card,
  FlowDiagram,
  IconCircle,
  Reveal,
  Section,
  StatusTag,
  staggerChild,
  staggerParent,
} from '@/components/kit'

const robustFlow = [
  { label: 'Clean Recording', icon: <Mic />, tone: 'teal' as const },
  {
    label: 'Noise / Cheap Mic',
    icon: <Volume2 />,
    tone: 'warning' as const,
  },
  {
    label: 'Preprocessing + Augmentation',
    icon: <Waves />,
    tone: 'blue' as const,
  },
  { label: 'Robust Model', icon: <ShieldCheck />, tone: 'teal' as const },
]

const features = [
  {
    icon: <Waves />,
    title: 'Background-noise augmentation',
    body: 'Train with realistic clinic and street noise mixed into samples.',
  },
  {
    icon: <AudioLines />,
    title: 'Audio normalization',
    body: 'Level and length standardization so loud and quiet clips compare fairly.',
  },
  {
    icon: <Signal />,
    title: 'Varied mic & volume handling',
    body: 'Tolerate the range of cheap phone microphones found in the field.',
  },
  {
    icon: <ScanLine />,
    title: 'Audio-quality checking',
    body: 'Reject unusable recordings before inference instead of scoring noise.',
  },
  {
    icon: <Gauge />,
    title: 'Confidence thresholding',
    body: 'Only flag when the score clears a threshold worth a human’s time.',
  },
  {
    icon: <UserRoundCheck />,
    title: 'Human-in-the-loop review',
    body: 'Uncertain or concerning results always route to a person.',
  },
]

const useCase = [
  {
    label: 'Rural Clinic / Health Worker',
    icon: <Stethoscope />,
    tone: 'blue' as const,
  },
  { label: 'Phone Recording', icon: <Smartphone />, tone: 'teal' as const },
  { label: 'CoughSense', icon: <Activity />, tone: 'teal' as const },
  { label: 'Screening Flag', icon: <ShieldCheck />, tone: 'warning' as const },
  {
    label: 'Human Assessment',
    icon: <UserRoundCheck />,
    tone: 'blue' as const,
  },
]

const impact = [
  'Faster first-level screening at the point of contact',
  'Low-cost and accessible — a phone is the only hardware',
  'Supports frontline health workers instead of replacing them',
  'Helps prioritize cases that deserve further attention',
]

export function Robustness() {
  return (
    <Section
      id="real-world"
      eyebrow="Built for the Real World"
      title="Cheap phone mics. Noisy rooms. That is the actual operating environment."
    >
      <div className="flex flex-col gap-12">
        <Reveal>
          <Card
            hover={false}
            className="flex items-start gap-4 border-warning/25 bg-warning/[0.05] p-6 sm:p-8"
          >
            <IconCircle tone="warning" size="sm">
              <Quote />
            </IconCircle>
            <p className="font-serif text-xl leading-relaxed text-pretty sm:text-2xl">
              A model that only works on a studio-quality cough is useless in a
              rural clinic. The challenge is cheap phone microphones recording
              in noisy environments.
            </p>
          </Card>
        </Reveal>

        <Reveal>
          <Card hover={false} className="p-5 sm:p-8">
            <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
              robustness path
            </p>
            <FlowDiagram nodes={robustFlow} compact />
          </Card>
        </Reveal>

        <div className="flex flex-col gap-5">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-lg font-semibold tracking-tight">
                Robustness features
              </h3>
              <StatusTag status="planned" />
            </div>
          </Reveal>
          <motion.ul
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {features.map((f) => (
              <motion.li key={f.title} variants={staggerChild}>
                <Card className="flex h-full flex-col gap-3 p-5">
                  <IconCircle tone="muted" size="sm">
                    {f.icon}
                  </IconCircle>
                  <h4 className="text-sm font-semibold tracking-tight text-balance">
                    {f.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                    {f.body}
                  </p>
                </Card>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <Reveal>
          <Card hover={false} className="border-primary/20 p-5 sm:p-8">
            <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-primary uppercase">
              use case flow
            </p>
            <FlowDiagram nodes={useCase} compact />
          </Card>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-[auto_1fr] lg:items-center">
          <Reveal>
            <div className="flex items-center gap-3">
              <IconCircle tone="teal" size="sm">
                <Sparkles />
              </IconCircle>
              <h3 className="text-lg font-semibold tracking-tight">Impact</h3>
            </div>
          </Reveal>
          <motion.ul
            className="grid gap-3 sm:grid-cols-2"
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {impact.map((i) => (
              <motion.li
                key={i}
                variants={staggerChild}
                className="flex items-start gap-3 rounded-xl border border-border/70 bg-card/60 px-4 py-3"
              >
                <Zap
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span className="text-sm leading-relaxed text-pretty">{i}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </Section>
  )
}
