'use client'

import { motion, useReducedMotion } from 'motion/react'
import { ImageIcon, TrendingDown, TriangleAlert } from 'lucide-react'
import {
  Callout,
  Card,
  Counter,
  IconCircle,
  Pill,
  Reveal,
  Section,
  staggerChild,
  staggerParent,
} from '@/components/kit'

const matrix = [
  {
    label: 'True Negatives',
    value: 672,
    hint: 'predicted normal · actually normal',
    tone: 'teal' as const,
  },
  {
    label: 'False Positives',
    value: 27,
    hint: 'flagged · actually normal',
    tone: 'blue' as const,
  },
  {
    label: 'False Negatives',
    value: 45,
    hint: 'missed · actually concerning',
    tone: 'warning' as const,
  },
  {
    label: 'True Positives',
    value: 14,
    hint: 'flagged · actually concerning',
    tone: 'teal' as const,
  },
]

const losses = [
  { epoch: 1, loss: 0.6931 },
  { epoch: 2, loss: 0.3047 },
  { epoch: 3, loss: 0.1304 },
]

const placeholders = [
  {
    title: 'Mel Spectrogram',
    file: 'MEL Spectogram Cough.png',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/MEL%20Spectogram%20Cough-HtZy3aKkaqoHiIiDlMweA8dFObhIYb.png',
    note: 'Real cough sample converted to a Mel spectrogram.',
  },
  {
    title: 'Confusion Matrix',
    file: 'Confusion Matrix.png',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Confusion%20Matrix-UUmuObrUKkFcvojINaikJJDvmmnkZe.png',
    note: 'The plotted matrix from the test-set evaluation run.',
  },
]

function LossChart() {
  const reduce = useReducedMotion()
  const w = 320
  const h = 150
  const pad = 18
  const max = 0.75
  const points = losses.map((d, i) => {
    const x = pad + (i * (w - pad * 2)) / (losses.length - 1)
    const y = pad + (1 - d.loss / max) * (h - pad * 2)
    return { ...d, x, y }
  })
  const path = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`)
    .join(' ')

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="h-auto w-full"
      role="img"
      aria-label="Training loss across three epochs: 0.6931, then 0.3047, then 0.1304"
    >
      {[0.25, 0.5, 0.75].map((g) => {
        const y = pad + (1 - g / max) * (h - pad * 2)
        return (
          <line
            key={g}
            x1={pad}
            x2={w - pad}
            y1={y}
            y2={y}
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="3 5"
          />
        )
      })}
      <motion.path
        d={path}
        fill="none"
        stroke="var(--primary)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: reduce ? 0 : 1.3, ease: 'easeInOut' }}
      />
      {points.map((p, i) => (
        <motion.g
          key={p.epoch}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{
            duration: reduce ? 0 : 0.35,
            delay: reduce ? 0 : 0.35 + i * 0.4,
          }}
          style={{ transformOrigin: `${p.x}px ${p.y}px` }}
        >
          <circle r="4.5" cx={p.x} cy={p.y} fill="var(--primary)" />
          <text
            x={p.x}
            y={p.y - 12}
            textAnchor="middle"
            className="font-mono"
            fontSize="10"
            fill="var(--foreground)"
          >
            {p.loss.toFixed(4)}
          </text>
          <text
            x={p.x}
            y={h - 4}
            textAnchor="middle"
            className="font-mono"
            fontSize="9"
            fill="var(--muted-foreground)"
          >
            epoch {p.epoch}
          </text>
        </motion.g>
      ))}
    </svg>
  )
}

export function Results() {
  return (
    <Section
      id="results"
      eyebrow="Prototype Testing & Results"
      title="Real numbers from the prototype — including the uncomfortable ones"
      lead="These are the actual test-set results from the implemented audio branch. The dataset is imbalanced, so we are showing the full confusion matrix rather than hiding behind a single accuracy figure."
    >
      <div className="flex flex-col gap-10">
        <div className="grid gap-5 lg:grid-cols-[1fr_1.35fr]">
          <Reveal>
            <Card
              hover={false}
              className="glow-teal flex h-full flex-col justify-center gap-3 border-primary/25 p-7"
            >
              <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                test-set accuracy
              </span>
              <span className="font-serif text-6xl leading-none tracking-tight text-primary sm:text-7xl">
                ~<Counter to={91} suffix="%" />
              </span>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Measured on the held-out test set of the Coswara-trained
                ResNet18 audio model.
              </p>
            </Card>
          </Reveal>

          <motion.ul
            className="grid grid-cols-2 gap-4"
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {matrix.map((m) => (
              <motion.li key={m.label} variants={staggerChild}>
                <Card className="flex h-full flex-col gap-1.5 p-5">
                  <span
                    className={
                      m.tone === 'warning'
                        ? 'font-serif text-4xl leading-none text-warning sm:text-5xl'
                        : m.tone === 'blue'
                          ? 'font-serif text-4xl leading-none text-secondary sm:text-5xl'
                          : 'font-serif text-4xl leading-none text-primary sm:text-5xl'
                    }
                  >
                    <Counter to={m.value} />
                  </span>
                  <span className="text-sm font-semibold tracking-tight">
                    {m.label}
                  </span>
                  <span className="font-mono text-[11px] leading-snug text-muted-foreground">
                    {m.hint}
                  </span>
                </Card>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <Reveal>
          <Callout
            tone="warning"
            icon={<TriangleAlert />}
            title="Read these numbers carefully"
          >
            The dataset is imbalanced, so accuracy alone is not sufficient for a
            reliable screening signal. With only 14 true positives against 45
            false negatives, recall on concerning cases is the metric that
            actually matters — and it is exactly what the roadmap targets.
          </Callout>
        </Reveal>

        <Reveal>
          <Card hover={false} className="p-5 sm:p-7">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <IconCircle tone="teal" size="sm">
                <TrendingDown />
              </IconCircle>
              <h3 className="text-lg font-semibold tracking-tight">
                Training loss across 3 epochs
              </h3>
              <Pill tone="teal">the model is learning</Pill>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <LossChart />
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 font-mono text-sm">
                  <span className="text-muted-foreground">0.6931</span>
                  <span className="text-primary" aria-hidden="true">
                    →
                  </span>
                  <span className="text-muted-foreground">0.3047</span>
                  <span className="text-primary" aria-hidden="true">
                    →
                  </span>
                  <span className="font-semibold text-primary">0.1304</span>
                </div>
                <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                  Loss decreased consistently across every epoch, which is
                  evidence that the network is genuinely fitting patterns in the
                  spectrograms rather than guessing.
                </p>
              </div>
            </div>
          </Card>
        </Reveal>

        {/* swappable image slots */}
        <div className="flex flex-col gap-5">
          <Reveal>
            <h3 className="text-lg font-semibold tracking-tight">
              Project artifacts
            </h3>
          </Reveal>
          <motion.ul
            className="grid gap-5 sm:grid-cols-3"
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {placeholders.map((p) => (
              <motion.li key={p.title} variants={staggerChild}>
                <Card className="flex h-full flex-col gap-4 border-dashed p-5">
                  <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border border-border bg-muted/30">
                    {'src' in p ? (
                      <img
                        src={p.src}
                        alt={`${p.title} project artifact`}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <div className="flex flex-col items-center gap-2 px-4 text-center">
                        <IconCircle tone="muted" size="sm">
                          <ImageIcon />
                        </IconCircle>
                        <span className="font-mono text-[11px] text-muted-foreground">
                          {p.file}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-sm font-semibold tracking-tight">
                      {p.title}
                    </span>
                    <span className="text-xs leading-relaxed text-muted-foreground">
                      {p.note}
                    </span>
                  </div>
                </Card>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </Section>
  )
}
