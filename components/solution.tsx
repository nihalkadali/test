'use client'

import {
  AudioLines,
  BrainCircuit,
  Gauge,
  Smartphone,
  Sparkles,
  Stethoscope,
  TriangleAlert,
  User,
} from 'lucide-react'
import {
  Callout,
  Card,
  FlowDiagram,
  IconCircle,
  Pill,
  Reveal,
  Section,
} from '@/components/kit'

const pipeline = [
  { label: 'Patient', icon: <User />, tone: 'teal' as const },
  {
    label: 'Smartphone Recording',
    icon: <Smartphone />,
    tone: 'teal' as const,
  },
  {
    label: 'Audio Preprocessing',
    icon: <AudioLines />,
    tone: 'teal' as const,
  },
  { label: 'ML Model', icon: <BrainCircuit />, tone: 'blue' as const },
  {
    label: 'Confidence-Scored Result',
    icon: <Gauge />,
    tone: 'warning' as const,
  },
  {
    label: 'Human Health Worker',
    icon: <Stethoscope />,
    tone: 'blue' as const,
  },
]

export function Solution() {
  return (
    <Section
      id="solution"
      eyebrow="Our Solution"
      title="A confidence-scored screening flag that routes cases to a human"
      lead="A cough is recorded on any phone, standardized, and classified by a deep-learning model. The output is not a verdict — it is a score that decides whether a case deserves human attention now."
    >
      <div className="flex flex-col gap-14">
        <Reveal>
          <Card hover={false} className="p-5 sm:p-8">
            <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-primary uppercase">
              coughsense path
            </p>
            <FlowDiagram nodes={pipeline} compact />
          </Card>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <Card
              hover={false}
              className="glow-teal border-primary/25 p-6 sm:p-7"
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                  screening result
                </span>
                <Pill tone="muted">mock output</Pill>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-warning/30 bg-warning/[0.08] px-4 py-3.5">
                <IconCircle tone="warning" size="sm">
                  <TriangleAlert />
                </IconCircle>
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] tracking-wider text-warning/80 uppercase">
                    status
                  </span>
                  <span className="text-base font-semibold text-warning">
                    Potentially Concerning
                  </span>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-muted-foreground">
                    Confidence
                  </span>
                  <span className="font-mono text-2xl font-semibold text-foreground">
                    86%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-warning"
                    style={{ width: '86%' }}
                  />
                </div>
              </div>

              <p className="mt-5 flex items-center gap-2 text-sm font-medium text-primary">
                <Stethoscope className="size-4" aria-hidden="true" />
                Human review recommended
              </p>

              <p className="mt-4 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground italic">
                Pre-screening aid only. This is not a clinical diagnosis and
                does not replace assessment by a qualified health worker.
              </p>
            </Card>
          </Reveal>

          <div className="flex flex-col gap-5">
            <Reveal delay={0.08}>
              <Callout
                tone="teal"
                icon={<Sparkles />}
                title="Key differentiator"
              >
                CoughSense does not try to answer &ldquo;what disease is
                this?&rdquo; It answers a narrower, more useful question:
                should a human look at this patient sooner? A confidence
                threshold decides that, and uncertain cases stay in human hands.
              </Callout>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    k: 'Input',
                    v: 'One cough, any phone mic',
                  },
                  { k: 'Output', v: 'Flag + confidence score' },
                  { k: 'Decision maker', v: 'The health worker' },
                  { k: 'Scope', v: 'Triage support only' },
                ].map((item) => (
                  <Card key={item.k} className="p-4">
                    <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                      {item.k}
                    </p>
                    <p className="mt-1.5 text-sm font-medium">{item.v}</p>
                  </Card>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  )
}
