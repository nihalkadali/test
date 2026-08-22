import { Hero } from '@/components/hero'
import { Problem } from '@/components/problem'
import { Solution } from '@/components/solution'
import { HowItWorks } from '@/components/how-it-works'
import { Architecture } from '@/components/architecture'
import { Results } from '@/components/results'
import { Robustness } from '@/components/robustness'
import { Roadmap } from '@/components/roadmap'
import { Demo } from '@/components/demo'
import { Footer } from '@/components/footer'

export default function Page() {
  return (
    <>
      <a
        href="#problem"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Hero />
      <main>
        <Problem />
        <Solution />
        <HowItWorks />
        <Architecture />
        <Results />
        <Robustness />
        <Roadmap />
        <Demo />
      </main>
      <Footer />
    </>
  )
}
