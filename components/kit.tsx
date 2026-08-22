'use client'

import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useReducedMotion,
  animate,
  type Variants,
} from 'motion/react'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------ */
/*  Scroll reveal                                                      */
/* ------------------------------------------------------------------ */

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = 'div',
}: {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'span'
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] as typeof motion.div

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: reduce ? 0 : 0.65,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  )
}

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
}

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

/* ------------------------------------------------------------------ */
/*  Layout primitives                                                  */
/* ------------------------------------------------------------------ */

export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  className,
}: {
  id: string
  eyebrow?: string
  title?: React.ReactNode
  lead?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      className={cn(
        'relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28',
        className,
      )}
    >
      {(eyebrow || title || lead) && (
        <header className="mb-12 flex max-w-3xl flex-col gap-5 sm:mb-16">
          {eyebrow && (
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
          )}
          {title && (
            <Reveal delay={0.05}>
              <h2 className="font-serif text-3xl leading-tight tracking-tight text-balance sm:text-4xl lg:text-5xl">
                {title}
              </h2>
            </Reveal>
          )}
          {lead && (
            <Reveal delay={0.1}>
              <p className="max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
                {lead}
              </p>
            </Reveal>
          )}
        </header>
      )}
      {children}
    </section>
  )
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center gap-2 font-mono text-xs tracking-[0.22em] text-primary uppercase">
      <span className="h-px w-8 bg-primary/60" aria-hidden="true" />
      {children}
    </span>
  )
}

export function Card({
  children,
  className,
  hover = true,
}: {
  children: React.ReactNode
  className?: string
  hover?: boolean
}) {
  return (
    <div
      className={cn(
        'surface relative rounded-2xl border border-border/70 p-6 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.9)] transition-all duration-300',
        hover &&
          'hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_28px_70px_-40px_color-mix(in_oklab,var(--primary)_60%,transparent)]',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function IconCircle({
  children,
  tone = 'teal',
  size = 'md',
  className,
}: {
  children: React.ReactNode
  tone?: 'teal' | 'blue' | 'muted' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const tones = {
    teal: 'text-primary bg-primary/10 ring-primary/25 shadow-[0_0_28px_-8px_color-mix(in_oklab,var(--primary)_60%,transparent)]',
    blue: 'text-secondary bg-secondary/10 ring-secondary/25 shadow-[0_0_28px_-8px_color-mix(in_oklab,var(--secondary)_60%,transparent)]',
    muted: 'text-muted-foreground bg-muted/60 ring-border',
    warning:
      'text-warning bg-warning/10 ring-warning/25 shadow-[0_0_28px_-8px_color-mix(in_oklab,var(--warning)_60%,transparent)]',
  }
  const sizes = {
    sm: 'size-9 [&_svg]:size-4',
    md: 'size-12 [&_svg]:size-5',
    lg: 'size-16 [&_svg]:size-7',
  }
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full ring-1',
        tones[tone],
        sizes[size],
        className,
      )}
      aria-hidden="true"
    >
      {children}
    </span>
  )
}

export function Pill({
  children,
  tone = 'muted',
  className,
}: {
  children: React.ReactNode
  tone?: 'teal' | 'blue' | 'muted' | 'warning'
  className?: string
}) {
  const tones = {
    teal: 'text-primary border-primary/30 bg-primary/10',
    blue: 'text-secondary border-secondary/30 bg-secondary/10',
    muted: 'text-muted-foreground border-border bg-muted/50',
    warning: 'text-warning border-warning/30 bg-warning/10',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] tracking-wider uppercase',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function StatusTag({ status }: { status: 'implemented' | 'planned' }) {
  return status === 'implemented' ? (
    <Pill tone="teal">
      <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
      Implemented
    </Pill>
  ) : (
    <Pill tone="muted">
      <span
        className="size-1.5 rounded-full bg-muted-foreground"
        aria-hidden="true"
      />
      Planned
    </Pill>
  )
}

export function Callout({
  children,
  tone = 'teal',
  icon,
  title,
}: {
  children: React.ReactNode
  tone?: 'teal' | 'blue' | 'warning'
  icon?: React.ReactNode
  title?: string
}) {
  const tones = {
    teal: 'border-primary/25 bg-primary/[0.06]',
    blue: 'border-secondary/25 bg-secondary/[0.06]',
    warning: 'border-warning/25 bg-warning/[0.06]',
  }
  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-2xl border p-6 sm:flex-row sm:items-start sm:gap-5',
        tones[tone],
      )}
    >
      {icon && (
        <IconCircle tone={tone} size="sm">
          {icon}
        </IconCircle>
      )}
      <div className="flex flex-col gap-1.5">
        {title && (
          <p className="font-medium tracking-tight text-foreground">{title}</p>
        )}
        <p className="text-sm leading-relaxed text-pretty text-muted-foreground sm:text-base">
          {children}
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Animated counter                                                   */
/* ------------------------------------------------------------------ */

export function Counter({
  to,
  suffix = '',
  prefix = '',
  duration = 1.6,
  className,
}: {
  to: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setValue(to)
      return
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to, duration, reduce])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Animated flow / pipeline diagram                                   */
/* ------------------------------------------------------------------ */

export type FlowNode = {
  label: string
  sub?: string
  icon?: React.ReactNode
  tone?: 'teal' | 'blue' | 'muted' | 'warning'
}

export function FlowDiagram({
  nodes,
  className,
  compact = false,
}: {
  nodes: FlowNode[]
  className?: string
  compact?: boolean
}) {
  const ref = useRef<HTMLOListElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })
  const reduce = useReducedMotion()
  const step = reduce ? 0 : 0.22

  return (
    <ol
      ref={ref}
      className={cn(
        'flex flex-col items-stretch gap-0 lg:flex-row lg:items-stretch',
        className,
      )}
    >
      {nodes.map((node, i) => {
        const tone = node.tone ?? 'teal'
        return (
          <li
            key={node.label}
            className="flex flex-1 flex-col items-center lg:flex-row"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{
                duration: reduce ? 0 : 0.45,
                delay: i * step,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                'surface flex w-full flex-1 flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-colors duration-300',
                tone === 'teal' && 'border-primary/25',
                tone === 'blue' && 'border-secondary/25',
                tone === 'warning' && 'border-warning/25',
                tone === 'muted' && 'border-border',
                compact ? 'min-h-[104px]' : 'min-h-[132px]',
              )}
            >
              {node.icon && (
                <IconCircle tone={tone} size={compact ? 'sm' : 'md'}>
                  {node.icon}
                </IconCircle>
              )}
              <span className="text-sm leading-snug font-medium tracking-tight text-balance">
                {node.label}
              </span>
              {node.sub && (
                <span className="font-mono text-[11px] leading-snug text-muted-foreground">
                  {node.sub}
                </span>
              )}
            </motion.div>

            {i < nodes.length - 1 && (
              <>
                {/* vertical connector (mobile) */}
                <span
                  className="relative flex h-8 w-px shrink-0 justify-center lg:hidden"
                  aria-hidden="true"
                >
                  <motion.span
                    className="w-px origin-top bg-gradient-to-b from-primary/70 to-secondary/40"
                    initial={{ scaleY: 0 }}
                    animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{
                      duration: reduce ? 0 : 0.3,
                      delay: i * step + 0.2,
                    }}
                    style={{ height: '100%' }}
                  />
                </span>
                {/* horizontal connector (desktop) */}
                <span
                  className="relative hidden h-px w-6 shrink-0 items-center xl:w-10 lg:flex"
                  aria-hidden="true"
                >
                  <motion.span
                    className="h-px w-full origin-left bg-gradient-to-r from-primary/70 to-secondary/40"
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{
                      duration: reduce ? 0 : 0.3,
                      delay: i * step + 0.2,
                    }}
                  />
                </span>
              </>
            )}
          </li>
        )
      })}
    </ol>
  )
}
