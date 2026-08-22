'use client'

import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'

/** Deterministic pseudo-random so SSR and client agree. */
function amp(i: number, count: number) {
  const center = 1 - Math.abs(i - count / 2) / (count / 2)
  const wobble =
    (Math.sin(i * 1.7) + Math.sin(i * 0.53) * 0.6 + Math.sin(i * 3.1) * 0.35) /
    2
  return Math.max(0.12, Math.min(1, 0.35 + center * 0.55 + wobble * 0.28))
}

export function Waveform({
  bars = 48,
  className,
  tone = 'teal',
  active = true,
}: {
  bars?: number
  className?: string
  tone?: 'teal' | 'blue'
  active?: boolean
}) {
  const reduce = useReducedMotion()
  const color = tone === 'teal' ? 'bg-primary' : 'bg-secondary'

  return (
    <div
      className={cn('flex h-full w-full items-center gap-[3px]', className)}
      aria-hidden="true"
    >
      {Array.from({ length: bars }).map((_, i) => {
        const base = amp(i, bars)
        return (
          <motion.span
            key={i}
            className={cn('flex-1 rounded-full', color)}
            style={{ opacity: 0.35 + base * 0.55 }}
            initial={{ height: `${base * 100}%` }}
            animate={
              reduce || !active
                ? { height: `${base * 100}%` }
                : {
                    height: [
                      `${base * 100}%`,
                      `${Math.max(8, base * 42)}%`,
                      `${Math.min(100, base * 118)}%`,
                      `${base * 100}%`,
                    ],
                  }
            }
            transition={{
              duration: 1.6 + (i % 5) * 0.22,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
              delay: (i % 9) * 0.07,
            }}
          />
        )
      })}
    </div>
  )
}

/** Pulsing concentric rings around a microphone-style core. */
export function PulseRings({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  return (
    <div className={cn('absolute inset-0', className)} aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute inset-0 rounded-full border border-primary/30"
          initial={{ scale: 0.6, opacity: 0.6 }}
          animate={
            reduce
              ? { scale: 1, opacity: 0.2 }
              : { scale: [0.6, 1.35], opacity: [0.55, 0] }
          }
          transition={{
            duration: 3.2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 1.05,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}

/**
 * Illustrative Mel spectrogram: a grid of cells whose intensity follows a
 * frequency-over-time energy function typical of a cough burst.
 */
export function MelSpectrogram({
  cols = 40,
  rows = 14,
  className,
}: {
  cols?: number
  rows?: number
  className?: string
}) {
  const reduce = useReducedMotion()

  const energy = (x: number, y: number) => {
    const t = x / cols
    const f = 1 - y / rows
    // two cough bursts: sharp onset, decaying tail, low-frequency heavy
    const burst = (c: number, w: number) => Math.exp(-((t - c) ** 2) / w)
    const env = burst(0.22, 0.006) * 1 + burst(0.58, 0.01) * 0.85
    const freqShape = Math.exp(-((f - 0.22) ** 2) / 0.09) + f * 0.18
    const noise = (Math.sin(x * 2.3 + y * 1.7) + 1) / 2
    return Math.min(1, env * freqShape * (0.75 + noise * 0.5) + noise * 0.06)
  }

  return (
    <div
      className={cn(
        'grid w-full gap-[2px] rounded-xl bg-background/60 p-2',
        className,
      )}
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      role="img"
      aria-label="Illustrative Mel spectrogram of a cough recording: frequency bands over time, with two high-energy cough bursts"
    >
      {Array.from({ length: rows }).map((_, y) =>
        Array.from({ length: cols }).map((__, x) => {
          const e = energy(x, y)
          return (
            <motion.span
              key={`${x}-${y}`}
              className="aspect-square rounded-[2px]"
              style={{
                background:
                  e > 0.66
                    ? 'var(--warning)'
                    : e > 0.4
                      ? 'var(--primary)'
                      : e > 0.2
                        ? 'var(--secondary)'
                        : 'var(--muted)',
                opacity: 0.18 + e * 0.82,
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.18 + e * 0.82 }}
              viewport={{ once: true }}
              transition={{
                duration: reduce ? 0 : 0.4,
                delay: reduce ? 0 : (x / cols) * 0.7,
              }}
            />
          )
        }),
      )}
    </div>
  )
}
