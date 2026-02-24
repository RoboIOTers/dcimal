import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageTransition from '../components/PageTransition'
import Reveal from '../components/Reveal'
import DirectionalArrow from '../components/DirectionalArrow'

function CaseRow({ study, labels }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-start py-5 group"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
          <span className="font-mono text-xs text-muted w-16 shrink-0">[{study.year}]</span>
          <span className="text-sm text-muted w-40 shrink-0">{study.industry}</span>
          <span className={`font-heading font-medium flex-1 transition-colors ${isOpen ? 'text-accent' : 'group-hover:text-accent'}`}>
            {study.title}
          </span>
          <span className="font-mono text-sm text-accent sm:text-end">
            {study.result}
          </span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-8 ps-0 sm:ps-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-mono text-xs text-muted uppercase tracking-widest mb-3">{labels.challenge}</h4>
                  <p className="text-sm text-muted leading-relaxed">{study.challenge}</p>
                </div>
                <div>
                  <h4 className="font-mono text-xs text-muted uppercase tracking-widest mb-3">{labels.solution}</h4>
                  <p className="text-sm text-muted leading-relaxed">{study.solution}</p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-mono text-xs text-muted uppercase tracking-widest mb-3">{labels.results}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {study.outcomes.map((outcome, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-accent rounded-full shrink-0" />
                      <span className="text-sm text-text">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                {study.tech.map((tech) => (
                  <span key={tech} className="font-mono text-xs px-3 py-1 bg-accent-dim text-accent border border-accent/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function CaseStudies() {
  const { t } = useTranslation('caseStudies')
  const studies = t('studies', { returnObjects: true })
  const labels = t('labels', { returnObjects: true })
  const tableHeader = t('tableHeader', { returnObjects: true })

  return (
    <PageTransition>
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
      </Helmet>

      {/* Hero */}
      <section className="px-6 max-w-6xl mx-auto pt-32 pb-16">
        <Reveal>
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">{t('hero.tagline')}</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight">
            {t('hero.heading')}
          </h1>
          <p className="text-muted text-lg mt-6 max-w-xl leading-relaxed">
            {t('hero.description')}
          </p>
        </Reveal>
      </section>

      {/* Terminal-style case study list */}
      <section className="px-6 max-w-6xl mx-auto pb-24">
        <Reveal>
          <div className="hidden sm:flex items-center gap-0 py-3 border-b border-border mb-0">
            <span className="font-mono text-xs text-muted uppercase tracking-widest w-16">{tableHeader.year}</span>
            <span className="font-mono text-xs text-muted uppercase tracking-widest w-40">{tableHeader.industry}</span>
            <span className="font-mono text-xs text-muted uppercase tracking-widest flex-1">{tableHeader.project}</span>
            <span className="font-mono text-xs text-muted uppercase tracking-widest text-end">{tableHeader.impact}</span>
          </div>
        </Reveal>

        <Reveal>
          {studies.map((study) => (
            <CaseRow
              key={study.id}
              study={study}
              labels={labels}
            />
          ))}
        </Reveal>
      </section>

      {/* CTA */}
      <section className="px-6 max-w-6xl mx-auto pb-32">
        <Reveal>
          <div className="text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              {t('cta.heading')}
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
