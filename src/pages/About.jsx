import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageTransition from '../components/PageTransition'
import Reveal from '../components/Reveal'
import DirectionalArrow from '../components/DirectionalArrow'

export default function About() {
  const { t } = useTranslation('about')
  const values = t('values.items', { returnObjects: true })
  const timeline = t('timeline.items', { returnObjects: true })
  const team = t('team.members', { returnObjects: true })
  const impact = t('impact.items', { returnObjects: true })

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
        </Reveal>
      </section>

      {/* Mission & Vision */}
      <section className="px-6 max-w-6xl mx-auto pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <Reveal>
            <div>
              <h3 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">{t('mission.label')}</h3>
              <p className="font-heading text-xl md:text-2xl font-medium leading-relaxed">
                {t('mission.text')}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <h3 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">{t('vision.label')}</h3>
              <p className="font-heading text-xl md:text-2xl font-medium leading-relaxed">
                {t('vision.text')}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 max-w-6xl mx-auto pb-24">
        <Reveal>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">{t('values.heading')}</h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
          {values.map((item, i) => (
            <Reveal key={item.word} delay={i * 0.05}>
              <div className="bg-bg p-8 md:p-12">
                <h3 className="font-heading text-2xl font-bold text-accent mb-3">{item.word}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.brief}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 max-w-6xl mx-auto pb-24">
        <Reveal>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">{t('timeline.heading')}</h2>
        </Reveal>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute start-[7px] top-2 bottom-2 w-px bg-border" />

          <div className="space-y-8">
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.05}>
                <div className="flex items-start gap-6">
                  <div className="relative shrink-0">
                    <div className="w-[15px] h-[15px] rounded-full border-2 border-accent bg-bg" />
                  </div>
                  <div className="pb-2">
                    <span className="font-mono text-sm text-accent font-medium">{item.year}</span>
                    <p className="text-sm text-muted mt-1">{item.event}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-6 max-w-6xl mx-auto pb-24">
        <Reveal>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">{t('team.heading')}</h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-border">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.05}>
              <div className="bg-bg p-8">
                <h3 className="font-heading font-medium text-text">{member.name}</h3>
                <p className="font-mono text-xs text-accent mt-1">{member.role}</p>
                <p className="text-xs text-muted mt-2">{member.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Impact */}
      <section className="px-6 max-w-6xl mx-auto pb-32">
        <Reveal>
          <div className="border-t border-b border-border py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {impact.map((item) => (
              <div key={item.label} className="text-center">
                <p className="font-mono text-3xl md:text-4xl font-bold text-accent">{item.value}</p>
                <p className="font-mono text-xs text-muted uppercase tracking-widest mt-2">{item.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

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
