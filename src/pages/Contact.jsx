import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Mail, Phone, MapPin, Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import PageTransition from '../components/PageTransition'
import Reveal from '../components/Reveal'
import DirectionalArrow from '../components/DirectionalArrow'

const iconMap = [Mail, Phone, MapPin]

export default function Contact() {
  const { t } = useTranslation('contact')
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const contactInfo = t('info', { returnObjects: true })
  const whyPoints = t('whyUs.points', { returnObjects: true })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', company: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

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

      {/* Contact Grid */}
      <section className="px-6 max-w-6xl mx-auto pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <Reveal>
            <div>
              <div className="space-y-8 mb-12">
                {contactInfo.map((item, i) => {
                  const Icon = iconMap[i]
                  return (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 flex items-center justify-center border border-border shrink-0">
                        <Icon size={16} className="text-accent" />
                      </div>
                      <div>
                        <p className="font-mono text-xs text-muted uppercase tracking-widest">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-text hover:text-accent transition-colors mt-1 block">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-text mt-1">{item.value}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="border-t border-border pt-8">
                <h3 className="font-heading text-lg font-medium mb-4">{t('whyUs.heading')}</h3>
                <div className="space-y-3">
                  {whyPoints.map((point, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-1 h-1 bg-accent rounded-full shrink-0" />
                      <span className="text-sm text-muted">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <div>
              {status === 'sent' ? (
                <div className="border border-accent/30 bg-accent-dim p-12 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center border border-accent rounded-full">
                    <Check size={20} className="text-accent" />
                  </div>
                  <h3 className="font-heading text-xl font-medium mb-2">{t('success.heading')}</h3>
                  <p className="text-sm text-muted">{t('success.description')}</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-sm text-accent hover:underline"
                  >
                    {t('success.sendAnother')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="font-mono text-xs text-muted uppercase tracking-widest block mb-2">
                      {t('form.name')} {t('form.required')}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border border-border px-4 py-3 text-sm text-text placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                      placeholder={t('form.namePlaceholder')}
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs text-muted uppercase tracking-widest block mb-2">
                      {t('form.email')} {t('form.required')}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border border-border px-4 py-3 text-sm text-text placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                      placeholder={t('form.emailPlaceholder')}
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs text-muted uppercase tracking-widest block mb-2">
                      {t('form.company')}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      className="w-full bg-transparent border border-border px-4 py-3 text-sm text-text placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                      placeholder={t('form.companyPlaceholder')}
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs text-muted uppercase tracking-widest block mb-2">
                      {t('form.message')} {t('form.required')}
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-transparent border border-border px-4 py-3 text-sm text-text placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors resize-none"
                      placeholder={t('form.messagePlaceholder')}
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-sm text-red-400">{t('error')}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-bg font-medium text-sm hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? t('form.sending') : t('form.submit')}
                    {status !== 'sending' && <DirectionalArrow size={16} />}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  )
}
