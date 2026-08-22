'use client'

import { motion } from 'motion/react'
import {
  Clock,
  HeartPulse,
  Mic,
  SearchX,
  Stethoscope,
  User,
  UsersRound,
  Info,
} from 'lucide-react'
import {
  Callout,
  Card,
  FlowDiagram,
  IconCircle,
  Reveal,
  Section,
  staggerChild,
  staggerParent,
} from '@/components/kit'

const flow = [
  { label: 'Patient', icon: <User />, tone: 'teal' as const },
  { label: 'Cough', icon: <Mic />, tone: 'teal' as const },
  {
    label: 'Limited Screening',
    icon: <SearchX />,
    tone: 'muted' as const,
  },
  {
    label: 'Delayed Attention',
    icon: <Clock />,
    tone: 'warning' as const,
  },
  {
    label: 'Human Health Worker',
    icon: <Stethoscope />,
    tone: 'blue' as const,
  },
]

const cards = [
  {
    icon: <HeartPulse />,
    title: 'Limited Access',
    body: 'In rural and semi-urban clinics, doctor access and diagnostic support are often limited, so a first-level check may never happen.',
    tone: 'teal' as const,
  },
  {
    icon: <SearchX />,
    title: 'Hard to Identify Early',
    body: 'Serious conditions like TB or pneumonia can present with symptoms that look like an ordinary cold, making early triage hard.',
    tone: 'warning' as const,
  },
  {
    icon: <UsersRound />,
    title: 'Frontline Workers Need Support',
    body: 'Community health workers carry the first contact with patients but lack an accessible first-level screening aid.',
    tone: 'blue' as const,
  },
]

export function Problem() {
  return (
    <Section
      id="problem"
      eyebrow="The Problem"
      title="Early Respiratory Risk Can Go Unnoticed"
      lead="In rural and semi-urban clinics, doctor access and diagnostic support are often limited. Serious conditions like TB or pneumonia can present with symptoms that look like an ordinary cold, making early triage hard — and frontline community health workers lack an accessible first-level screening aid."
    >
      <div className="flex flex-col gap-14">
        <Reveal>
          <Card hover={false} className="p-5 sm:p-8">
            <p className="mb-6 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
              today&apos;s path
            </p>
            <FlowDiagram nodes={flow} compact />
          </Card>
        </Reveal>

        <motion.ul
          className="grid gap-5 sm:grid-cols-3"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {cards.map((c) => (
            <motion.li key={c.title} variants={staggerChild}>
              <Card className="flex h-full flex-col gap-4">
                <IconCircle tone={c.tone}>{c.icon}</IconCircle>
                <h3 className="text-lg leading-snug font-semibold tracking-tight">
                  {c.title}
                </h3>
                <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                  {c.body}
                </p>
              </Card>
            </motion.li>
          ))}
        </motion.ul>

        <Reveal>
          <Callout tone="teal" icon={<Info />} title="To be clear">
            Not a replacement for doctors — the goal is an early warning that
            helps prioritize human review.
          </Callout>
        </Reveal>
      </div>
    </Section>
  )
}
