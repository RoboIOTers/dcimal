import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { ArrowRight } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import Reveal from '../components/Reveal'

const phrases = [
  'Cloud Migration.',
  'AI-Powered Analytics.',
  'Enterprise Platforms.',
  'Digital Experiences.',
  'Software That Scales.',
]

const stats = [
  { value: '500+', label: 'Projects Delivered' },
  { value: '50+', label: 'Enterprise Clients' },
  { value: '15+', label: 'Countries Served' },
  { value: '99%', label: 'Client Satisfaction' },
]

const services = [
  { title: 'Cloud Solutions', brief: 'AWS, Azure, GCP — migration, optimization, and cloud-native development.' },
  { title: 'AI & Data Science', brief: 'Predictive analytics, ML pipelines, and intelligent automation.' },
  { title: 'ServiceNow', brief: 'ITSM, ITOM, and workflow automation on the Now Platform.' },
  { title: 'SAP BTP', brief: 'Integration, extension, and innovation on SAP Business Technology Platform.' },
  { title: 'Digital Experience', brief: 'Umbraco, Sitecore, Optimizely — composable content platforms.' },
  { title: 'Web & Software', brief: 'Custom applications, JAMStack, and composable architecture.' },
]

function TypingHero() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[phraseIndex]
    let timeout

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex(c => c + 1), 60)
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex(c => c - 1), 30)
    } else if (deleting && charIndex === 0) {
      setDeleting(false)
      setPhraseIndex((phraseIndex + 1) % phrases.length)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, deleting, phraseIndex])

  return (
    <span className="text-accent">
      {phrases[phraseIndex].substring(0, charIndex)}
      <span className="cursor-blink text-accent">|</span>
    </span>
  )
}

export default function Home() {
  return (
    <PageTransition>
      <Helmet>
        <title>DCIMAL — Think Digital</title>
        <meta name="description" content="DCIMAL empowers organizations with digital transformation — cloud, AI, enterprise platforms, and custom software development." />
      </Helmet>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 max-w-6xl mx-auto pt-16">
        <Reveal>
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-6">
            Think Digital with DCIMAL
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            We build<br />
            <TypingHero />
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-muted text-lg mt-8 max-w-xl leading-relaxed">
            Digital transformation partner for enterprises ready to move fast,
            scale smart, and compete globally.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-bg font-medium text-sm hover:bg-accent/90 transition-colors"
            >
              Explore Services <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-text text-sm hover:border-accent hover:text-accent transition-colors"
            >
              Let's Talk
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="px-6 max-w-6xl mx-auto py-24">
        <Reveal>
          <div className="border-t border-b border-border py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ value, label }, i) => (
              <div key={i} className="text-center">
                <p className="font-mono text-3xl md:text-4xl font-bold text-accent">{value}</p>
                <p className="font-mono text-xs text-muted uppercase tracking-widest mt-2">{label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Services Preview */}
      <section className="px-6 max-w-6xl mx-auto pb-32">
        <Reveal>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">
            What we do
          </h2>
        </Reveal>
        <div className="space-y-0">
          {services.map(({ title, brief }, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <Link
                to="/services"
                className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-border hover:border-accent transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-muted w-6">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-heading text-lg font-medium group-hover:text-accent transition-colors">
                    {title}
                  </span>
                </div>
                <span className="text-sm text-muted mt-2 sm:mt-0 sm:text-right max-w-md pl-10 sm:pl-0">
                  {brief}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Final CTA */}
        <Reveal>
          <div className="mt-24 text-center">
            <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Ready?</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-8">
              Let's build something<br /><span className="text-accent">that matters.</span>
            </h2>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-bg font-medium text-sm hover:bg-accent/90 transition-colors"
            >
              Start a Conversation <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  )
}
