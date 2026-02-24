import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'
import PageTransition from '../components/PageTransition'
import Reveal from '../components/Reveal'
import DirectionalArrow from '../components/DirectionalArrow'

function TypingHero() {
  const { t, i18n } = useTranslation('home')
  const phrases = t('phrases', { returnObjects: true })
  const isRTL = i18n.language === 'ar'

  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    setPhraseIndex(0)
    setCharIndex(0)
    setDeleting(false)
  }, [i18n.language])

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
  }, [charIndex, deleting, phraseIndex, phrases])

  return (
    <span className="text-accent">
      {isRTL && <span className="cursor-blink text-accent">|</span>}
      {phrases[phraseIndex].substring(0, charIndex)}
      {!isRTL && <span className="cursor-blink text-accent">|</span>}
    </span>
  )
}

export default function Home() {
  const { t } = useTranslation('home')
  const stats = t('stats', { returnObjects: true })
  const serviceItems = t('services.items', { returnObjects: true })

  return (
    <PageTransition>
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
      </Helmet>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center px-6 max-w-6xl mx-auto pt-16">
        <Reveal>
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-6">
            {t('hero.tagline')}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tight">
            {t('hero.heading1')}<br />
            <TypingHero />
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-muted text-lg mt-8 max-w-xl leading-relaxed">
            {t('hero.description')}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="flex flex-wrap gap-4 mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-bg font-medium text-sm hover:bg-accent/90 transition-colors"
            >
              {t('hero.cta1')} <DirectionalArrow size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-text text-sm hover:border-accent hover:text-accent transition-colors"
            >
              {t('hero.cta2')}
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="px-6 max-w-6xl mx-auto py-24">
        <Reveal>
          <div className="border-t border-b border-border py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-mono text-3xl md:text-4xl font-bold text-accent">{stat.value}</p>
                <p className="font-mono text-xs text-muted uppercase tracking-widest mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Services Preview */}
      <section className="px-6 max-w-6xl mx-auto pb-32">
        <Reveal>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">
            {t('services.heading')}
          </h2>
        </Reveal>
        <div className="space-y-0">
          {serviceItems.map((item, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <Link
                to="/services"
                className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-border hover:border-accent transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-muted w-6">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-heading text-lg font-medium group-hover:text-accent transition-colors">
                    {item.title}
                  </span>
                </div>
                <span className="text-sm text-muted mt-2 sm:mt-0 sm:text-end max-w-md ps-10 sm:ps-0">
                  {item.brief}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Final CTA */}
        <Reveal>
          <div className="mt-24 text-center">
            <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">{t('cta.ready')}</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-8">
              {t('cta.heading')}<br /><span className="text-accent">{t('cta.headingAccent')}</span>
            </h2>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-bg font-medium text-sm hover:bg-accent/90 transition-colors"
            >
              {t('cta.button')} <DirectionalArrow size={16} />
            </Link>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  )
}
