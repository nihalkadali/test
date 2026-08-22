'use client'

import { Activity } from 'lucide-react'
import { IconCircle, Pill } from '@/components/kit'

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-14 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <IconCircle tone="teal" size="sm">
              <Activity />
            </IconCircle>
            <div className="flex flex-col">
              <span className="font-serif text-lg leading-none tracking-tight">
                Cough<span className="text-primary">Sense</span>
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">
                pre-screening triage aid
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Pill tone="teal">Error 404</Pill>
            <Pill tone="blue">Hacks 11.0</Pill>
            <Pill tone="warning">Healthcare track</Pill>
          </div>
        </div>

        <p className="max-w-2xl font-serif text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
          &ldquo;CoughSense is not replacing the doctor. It is helping the right
          patient reach human attention sooner.&rdquo;
        </p>

        <div className="flex flex-col gap-2 border-t border-border/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs tracking-wider text-muted-foreground">
            CoughSense | Error 404 | Hacks 11.0
          </p>
          <p className="text-xs text-muted-foreground italic">
            Screening support only — not a clinical diagnosis.
          </p>
        </div>
      </div>
    </footer>
  )
}
