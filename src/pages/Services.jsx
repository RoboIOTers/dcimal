import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import Reveal from '../components/Reveal'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import DirectionalArrow from '../components/DirectionalArrow'

function ServiceRow({ service, index, isOpen, onToggle }) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-start group"
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-muted w-6">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className={`font-heading text-lg md:text-xl font-medium transition-colors ${isOpen ? 'text-accent' : 'group-hover:text-accent'}`}>
            {service.title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={18} className={`transition-colors ${isOpen ? 'text-accent' : 'text-muted'}`} />
        </motion.div>
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
            <div className="pb-8 ps-10">
              <p className="text-muted leading-relaxed max-w-2xl mb-6">
                {service.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {service.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-3 py-1 bg-accent-dim text-accent border border-accent/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent rounded-full shrink-0" />
                    <span className="text-sm text-muted">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Services() {
  const [openId, setOpenId] = useState(null)
  const { t } = useTranslation('services')
  const services = t('items', { returnObjects: true })
  const processSteps = t('process.steps', { returnObjects: true })

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

      {/* Service Accordion */}
      <section className="px-6 max-w-6xl mx-auto pb-24">
        <Reveal>
          <div className="border-t border-border">
            {services.map((service, index) => (
              <ServiceRow
                key={service.id}
                service={service}
                index={index}
                isOpen={openId === service.id}
                onToggle={() => setOpenId(openId === service.id ? null : service.id)}
              />
            ))}
          </div>
        </Reveal>
      </section>

      {/* Process */}
      <section className="px-6 max-w-6xl mx-auto pb-32">
        <Reveal>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">{t('process.heading')}</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {processSteps.map((item, i) => (
            <Reveal key={item.step} delay={i * 0.1}>
              <div className="relative">
                <span className="font-mono text-4xl font-bold text-accent/20">{item.step}</span>
                <h3 className="font-heading text-lg font-medium mt-2">{item.title}</h3>
                <p className="text-sm text-muted mt-2 leading-relaxed">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-24 text-center">
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
