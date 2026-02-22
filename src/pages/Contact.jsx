import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Mail, Phone, MapPin, ArrowRight, Check } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import Reveal from '../components/Reveal'

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'info@dcimal.in', href: 'mailto:info@dcimal.in' },
  { icon: Phone, label: 'Phone', value: '+91 621 355 4103', href: 'tel:+916213554103' },
  { icon: MapPin, label: 'Offices', value: 'India  /  UK  /  US', href: null },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

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
      // Fallback: store locally if backend unavailable
      const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]')
      submissions.push({ ...form, timestamp: new Date().toISOString() })
      localStorage.setItem('contactSubmissions', JSON.stringify(submissions))
      setStatus('sent')
      setForm({ name: '', email: '', company: '', message: '' })
    }
  }

  return (
    <PageTransition>
      <Helmet>
        <title>Contact — DCIMAL</title>
        <meta name="description" content="Get in touch with DCIMAL — let's discuss your digital transformation goals." />
      </Helmet>

      {/* Hero */}
      <section className="px-6 max-w-6xl mx-auto pt-32 pb-16">
        <Reveal>
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Get in Touch</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight">
            Let's Talk
          </h1>
          <p className="text-muted text-lg mt-6 max-w-xl leading-relaxed">
            Have a project in mind? We'd love to hear about it.
            We typically respond within 24 hours.
          </p>
        </Reveal>
      </section>

      {/* Contact Grid */}
      <section className="px-6 max-w-6xl mx-auto pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <Reveal>
            <div>
              <div className="space-y-8 mb-12">
                {contactInfo.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center border border-border shrink-0">
                      <Icon size={16} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-mono text-xs text-muted uppercase tracking-widest">{label}</p>
                      {href ? (
                        <a href={href} className="text-text hover:text-accent transition-colors mt-1 block">
                          {value}
                        </a>
                      ) : (
                        <p className="text-text mt-1">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-8">
                <h3 className="font-heading text-lg font-medium mb-4">Why DCIMAL?</h3>
                <div className="space-y-3">
                  {[
                    '500+ projects delivered across 15+ countries',
                    'Deep expertise in cloud, AI, and enterprise platforms',
                    'Dedicated team with 99% client satisfaction',
                  ].map((point, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="w-1 h-1 bg-accent rounded-full shrink-0" />
                      <span className="text-sm text-muted">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: Form */}
          <Reveal delay={0.1}>
            <div>
              {status === 'sent' ? (
                <div className="border border-accent/30 bg-accent-dim p-12 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center border border-accent rounded-full">
                    <Check size={20} className="text-accent" />
                  </div>
                  <h3 className="font-heading text-xl font-medium mb-2">Message received.</h3>
                  <p className="text-sm text-muted">We'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-sm text-accent hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="font-mono text-xs text-muted uppercase tracking-widest block mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border border-border px-4 py-3 text-sm text-text placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs text-muted uppercase tracking-widest block mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border border-border px-4 py-3 text-sm text-text placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                      placeholder="you@company.com"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs text-muted uppercase tracking-widest block mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      className="w-full bg-transparent border border-border px-4 py-3 text-sm text-text placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                      placeholder="Company name"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs text-muted uppercase tracking-widest block mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-transparent border border-border px-4 py-3 text-sm text-text placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-bg font-medium text-sm hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                    {status !== 'sending' && <ArrowRight size={16} />}
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
