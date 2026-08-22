'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  CircleCheck,
  Loader2,
  Mic,
  Square,
  TriangleAlert,
  Upload,
} from 'lucide-react'
import { Card, IconCircle, Pill, Reveal, Section } from '@/components/kit'
import { Waveform } from '@/components/waveform'

type Analysis = {
  risk: 'concerning' | 'low'
  confidence: number
  recommendation: string
}

/**
 * MOCK ANALYSIS — swap this single function for a real backend call, e.g.:
 *
 *   async function analyze(input: AnalysisInput): Promise<Analysis> {
 *     const body = new FormData()
 *     body.append('audio', input.audio!)
 *     body.append('age', String(input.age))
 *     body.append('gender', input.gender)
 *     const res = await fetch('/predict', { method: 'POST', body })
 *     return res.json()
 *   }
 *
 * Nothing else in this component depends on how the score is produced.
 */
type AnalysisInput = {
  audio: Blob | null
  age: string
  gender: string
}

function mockAnalyze({ age }: AnalysisInput): Analysis {
  // Deterministic-ish mock logic: older age nudges the mock score upward.
  const ageNum = Number.parseInt(age, 10)
  const ageFactor = Number.isFinite(ageNum) ? Math.min(ageNum, 90) / 90 : 0.4
  const jitter = Math.random()
  const score = 0.35 * ageFactor + 0.65 * jitter
  const concerning = score > 0.5
  const confidence = Math.round(
    concerning ? 72 + score * 24 : 68 + (1 - score) * 26,
  )

  return {
    risk: concerning ? 'concerning' : 'low',
    confidence: Math.min(confidence, 97),
    recommendation: concerning
      ? 'Human review recommended — please route this patient to a health worker.'
      : 'No immediate concern flagged — continue routine care and re-screen if symptoms persist.',
  }
}

export function Demo() {
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [audioSource, setAudioSource] = useState<'mic' | 'file' | null>(null)
  const [recording, setRecording] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [micError, setMicError] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'done'>('idle')
  const [result, setResult] = useState<Analysis | null>(null)

  const recorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const urlRef = useRef<string | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      streamRef.current?.getTracks().forEach((t) => t.stop())
      if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    }
  }, [])

  function setClip(blob: Blob, source: 'mic' | 'file') {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    const url = URL.createObjectURL(blob)
    urlRef.current = url
    setAudioBlob(blob)
    setAudioUrl(url)
    setAudioSource(source)
    setResult(null)
    setStatus('idle')
  }

  async function startRecording() {
    setMicError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      chunksRef.current = []
      const recorder = new MediaRecorder(stream)
      recorderRef.current = recorder
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || 'audio/webm',
        })
        setClip(blob, 'mic')
        streamRef.current?.getTracks().forEach((t) => t.stop())
        streamRef.current = null
      }
      recorder.start()
      setRecording(true)
      setSeconds(0)
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000)
    } catch (err) {
      console.log('[v0] mic access failed:', err)
      setMicError(
        'Microphone access was blocked. You can upload an audio file instead.',
      )
    }
  }

  function stopRecording() {
    recorderRef.current?.state === 'recording' && recorderRef.current.stop()
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = null
    setRecording(false)
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) setClip(file, 'file')
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!audioBlob) return
    setStatus('analyzing')
    setResult(null)
    window.setTimeout(() => {
      setResult(mockAnalyze({ audio: audioBlob, age, gender }))
      setStatus('done')
    }, 1900)
  }

  const canSubmit = Boolean(audioBlob) && status !== 'analyzing'

  return (
    <Section
      id="demo"
      eyebrow="Try the Demo"
      title="Run a simulated screening check"
      lead="Record a cough or upload a clip and the interface will walk through the same flow the prototype uses. The scoring here is simulated in the browser — no audio leaves this page."
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:items-start">
        <Reveal>
          <Card hover={false} className="border-primary/20 p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="age"
                    className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase"
                  >
                    Age
                  </label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    min={0}
                    max={120}
                    inputMode="numeric"
                    placeholder="34"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="h-11 rounded-xl border border-input bg-background/60 px-4 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/60 focus:ring-2 focus:ring-primary/30 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="gender"
                    className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="h-11 rounded-xl border border-input bg-background/60 px-4 text-sm text-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/30 focus:outline-none"
                  >
                    <option value="">Select…</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Other</option>
                    <option value="undisclosed">Prefer not to say</option>
                  </select>
                </div>
              </div>

              {/* recorder */}
              <div className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-background/40 p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                    cough recording
                  </span>
                  {audioSource && (
                    <Pill tone="teal">
                      {audioSource === 'mic' ? 'recorded' : 'uploaded'}
                    </Pill>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={recording ? stopRecording : startRecording}
                    aria-pressed={recording}
                    className={
                      recording
                        ? 'inline-flex items-center gap-2 rounded-full bg-warning px-5 py-2.5 text-sm font-semibold text-warning-foreground transition-all hover:brightness-110 focus-visible:ring-2 focus-visible:ring-warning focus-visible:outline-none'
                        : 'inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 hover:shadow-[0_14px_36px_-18px_color-mix(in_oklab,var(--primary)_80%,transparent)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none'
                    }
                  >
                    {recording ? (
                      <>
                        <Square className="size-4" aria-hidden="true" />
                        Stop recording
                      </>
                    ) : (
                      <>
                        <Mic className="size-4" aria-hidden="true" />
                        Record from mic
                      </>
                    )}
                  </button>

                  {recording && (
                    <span
                      className="flex items-center gap-2 font-mono text-sm text-warning"
                      role="status"
                    >
                      <span className="relative flex size-2.5 items-center justify-center">
                        <span className="absolute size-2.5 animate-ping rounded-full bg-warning/70" />
                        <span className="size-2.5 rounded-full bg-warning" />
                      </span>
                      {String(Math.floor(seconds / 60)).padStart(2, '0')}:
                      {String(seconds % 60).padStart(2, '0')}
                    </span>
                  )}
                </div>

                <div className="h-12">
                  <Waveform
                    bars={32}
                    active={recording}
                    tone={recording ? 'teal' : 'blue'}
                  />
                </div>

                {micError && (
                  <p className="text-xs leading-relaxed text-warning">
                    {micError}
                  </p>
                )}

                {audioUrl && (
                  // eslint-disable-next-line jsx-a11y/media-has-caption
                  <audio
                    src={audioUrl}
                    controls
                    className="w-full"
                    aria-label="Preview of the recorded cough clip"
                  />
                )}

                <div className="flex items-center gap-3" aria-hidden="true">
                  <span className="h-px flex-1 bg-border" />
                  <span className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                    or upload audio file
                  </span>
                  <span className="h-px flex-1 bg-border" />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="audio-file"
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Upload className="size-4" aria-hidden="true" />
                    Choose an audio file
                  </label>
                  <input
                    id="audio-file"
                    name="audio-file"
                    type="file"
                    accept="audio/*"
                    onChange={handleFile}
                    className="w-full cursor-pointer rounded-xl border border-input bg-background/60 p-2 text-sm text-muted-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-secondary/15 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-secondary focus:border-primary/60 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-6 py-3.5 text-sm font-semibold text-secondary-foreground transition-all duration-300 hover:brightness-110 hover:shadow-[0_16px_40px_-18px_color-mix(in_oklab,var(--secondary)_80%,transparent)] focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40"
              >
                {status === 'analyzing' ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    Analyzing…
                  </>
                ) : (
                  'Analyze cough recording'
                )}
              </button>

              {!audioBlob && (
                <p className="text-center text-xs text-muted-foreground">
                  Record or upload a clip to enable analysis.
                </p>
              )}
            </form>
          </Card>
        </Reveal>

        {/* result panel */}
        <Reveal delay={0.08}>
          <div className="lg:sticky lg:top-8">
            <AnimatePresence mode="wait">
              {status === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                >
                  <Card
                    hover={false}
                    className="flex min-h-[320px] flex-col items-center justify-center gap-4 border-dashed p-8 text-center"
                  >
                    <IconCircle tone="muted" size="lg">
                      <Mic />
                    </IconCircle>
                    <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                      Your simulated screening result will appear here once a
                      recording is analyzed.
                    </p>
                  </Card>
                </motion.div>
              )}

              {status === 'analyzing' && (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                >
                  <Card
                    hover={false}
                    className="flex min-h-[320px] flex-col items-center justify-center gap-5 border-secondary/25 p-8 text-center"
                  >
                    <Loader2
                      className="size-8 animate-spin text-secondary"
                      aria-hidden="true"
                    />
                    <div className="flex flex-col gap-1.5">
                      <p className="font-medium">Analyzing cough recording…</p>
                      <p className="font-mono text-xs text-muted-foreground">
                        preprocess → mel spectrogram → resnet18 → score
                      </p>
                    </div>
                    <div className="h-10 w-full max-w-xs">
                      <Waveform bars={28} tone="blue" />
                    </div>
                  </Card>
                </motion.div>
              )}

              {status === 'done' && result && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card
                    hover={false}
                    className={
                      result.risk === 'concerning'
                        ? 'flex min-h-[320px] flex-col gap-6 border-warning/30 p-6 sm:p-8'
                        : 'glow-teal flex min-h-[320px] flex-col gap-6 border-primary/30 p-6 sm:p-8'
                    }
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                        screening result
                      </span>
                      <Pill tone="muted">simulated</Pill>
                    </div>

                    <div
                      className={
                        result.risk === 'concerning'
                          ? 'flex items-center gap-3 rounded-xl border border-warning/30 bg-warning/[0.08] px-4 py-4'
                          : 'flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/[0.08] px-4 py-4'
                      }
                      role="status"
                    >
                      <IconCircle
                        tone={result.risk === 'concerning' ? 'warning' : 'teal'}
                        size="sm"
                      >
                        {result.risk === 'concerning' ? (
                          <TriangleAlert />
                        ) : (
                          <CircleCheck />
                        )}
                      </IconCircle>
                      <span
                        className={
                          result.risk === 'concerning'
                            ? 'text-base font-semibold text-warning'
                            : 'text-base font-semibold text-primary'
                        }
                      >
                        {result.risk === 'concerning'
                          ? 'Potentially Concerning'
                          : 'Low Risk'}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm text-muted-foreground">
                          Confidence
                        </span>
                        <span className="font-mono text-2xl font-semibold">
                          {result.confidence}%
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                        <motion.div
                          className={
                            result.risk === 'concerning'
                              ? 'h-full rounded-full bg-gradient-to-r from-primary to-warning'
                              : 'h-full rounded-full bg-gradient-to-r from-secondary to-primary'
                          }
                          initial={{ width: 0 }}
                          animate={{ width: `${result.confidence}%` }}
                          transition={{ duration: 0.9, ease: 'easeOut' }}
                        />
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed text-pretty">
                      {result.recommendation}
                    </p>

                    <p className="mt-auto border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground italic">
                      Demo only — pre-screening aid, not a clinical diagnosis.
                    </p>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
