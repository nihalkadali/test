'use client'

import {
  AudioLines,
  BrainCircuit,
  Database,
  Grid2x2,
  Layers,
  Mic,
  Sigma,
  Table2,
  Users,
} from 'lucide-react'
import {
  Card,
  FlowDiagram,
  IconCircle,
  Pill,
  Reveal,
  Section,
  StatusTag,
} from '@/components/kit'

const audioBranch = [
  { label: 'Cough Audio', icon: <Mic />, tone: 'teal' as const },
  { label: 'Preprocessing', icon: <AudioLines />, tone: 'teal' as const },
  { label: 'Mel Spectrogram', icon: <Grid2x2 />, tone: 'teal' as const },
  { label: 'ResNet18', icon: <BrainCircuit />, tone: 'teal' as const },
  { label: 'Audio Features', icon: <Layers />, tone: 'teal' as const },
]

const clinicalBranch = [
  {
    label: 'Age · Gender · Symptoms',
    icon: <Users />,
    tone: 'muted' as const,
  },
  { label: 'Tabular ML Model', icon: <Table2 />, tone: 'muted' as const },
  { label: 'Clinical Features', icon: <Layers />, tone: 'muted' as const },
]

const datasetFacts = [
  {
    k: 'Source',
    v: 'Coswara — crowdsourced respiratory sound dataset',
  },
  {
    k: 'Modalities',
    v: 'Cough and other respiratory sound recordings',
  },
  {
    k: 'Metadata',
    v: 'Demographic and symptom-related fields',
  },
  {
    k: 'Real-world factor',
    v: 'Genuine audio-quality and recording variation',
  },
]

export function Architecture() {
  return (
    <Section
      id="architecture"
      eyebrow="Architecture & Dataset"
      title="One branch is built. The second one is honestly still on paper."
      lead="The audio branch is implemented and produced the results below. The clinical/demographic branch and the fusion step are planned and not yet built — nothing on this page depends on them."
    >
      <div className="flex flex-col gap-8">
        {/* audio branch */}
        <Reveal>
          <Card hover={false} className="border-primary/25 p-5 sm:p-8">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <IconCircle tone="teal" size="sm">
                <AudioLines />
              </IconCircle>
              <h3 className="text-lg font-semibold tracking-tight">
                Audio Branch
              </h3>
              <StatusTag status="implemented" />
            </div>
            <FlowDiagram nodes={audioBranch} compact />
          </Card>
        </Reveal>

        {/* clinical branch */}
        <Reveal delay={0.06}>
          <Card
            hover={false}
            className="border-dashed border-border p-5 sm:p-8"
          >
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <IconCircle tone="muted" size="sm">
                <Table2 />
              </IconCircle>
              <h3 className="text-lg font-semibold tracking-tight text-muted-foreground">
                Clinical / Demographic Branch
              </h3>
              <StatusTag status="planned" />
            </div>
            <FlowDiagram nodes={clinicalBranch} compact />
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Age, gender, symptoms and any available health info would feed a
              tabular model. This branch does not exist in the current
              prototype.
            </p>
          </Card>
        </Reveal>

        {/* fusion */}
        <Reveal delay={0.1}>
          <Card hover={false} className="p-5 sm:p-8">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <IconCircle tone="muted" size="sm">
                <Sigma />
              </IconCircle>
              <h3 className="text-lg font-semibold tracking-tight text-muted-foreground">
                Fusion
              </h3>
              <StatusTag status="planned" />
            </div>

            <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-center">
              <div className="flex flex-1 flex-col gap-3">
                <div className="flex items-center gap-3 rounded-xl border border-primary/25 bg-primary/[0.06] px-4 py-3">
                  <IconCircle tone="teal" size="sm">
                    <Layers />
                  </IconCircle>
                  <span className="text-sm font-medium">Audio Features</span>
                  <Pill tone="teal" className="ml-auto">
                    built
                  </Pill>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-3">
                  <IconCircle tone="muted" size="sm">
                    <Layers />
                  </IconCircle>
                  <span className="text-sm font-medium text-muted-foreground">
                    Clinical Features
                  </span>
                  <Pill tone="muted" className="ml-auto">
                    planned
                  </Pill>
                </div>
              </div>

              <div
                className="flex items-center justify-center px-2 font-mono text-muted-foreground"
                aria-hidden="true"
              >
                <span className="hidden lg:inline">→</span>
                <span className="lg:hidden">↓</span>
              </div>

              <div className="flex flex-1 items-center gap-3 rounded-xl border border-dashed border-secondary/30 bg-secondary/[0.05] px-4 py-4">
                <IconCircle tone="blue" size="sm">
                  <Sigma />
                </IconCircle>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">
                    Final Screening Score
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    audio + clinical, once fusion exists
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </Reveal>

        {/* dataset */}
        <Reveal delay={0.14}>
          <Card hover={false} className="p-5 sm:p-8">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <IconCircle tone="blue" size="sm">
                <Database />
              </IconCircle>
              <h3 className="text-lg font-semibold tracking-tight">
                Coswara Dataset
              </h3>
              <StatusTag status="implemented" />
            </div>
            <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {datasetFacts.map((f) => (
                <div key={f.k} className="flex flex-col gap-1.5">
                  <dt className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                    {f.k}
                  </dt>
                  <dd className="text-sm leading-relaxed text-pretty">
                    {f.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}
