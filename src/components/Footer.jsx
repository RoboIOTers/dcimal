import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation('common')

  const navLinks = [
    { to: '/services', label: t('nav.services') },
    { to: '/case-studies', label: t('nav.caseStudies') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.letsTalk') },
  ]

  return (
    <footer className="border-t border-border bg-bg">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="font-heading text-xl font-bold tracking-tight">
              <span className="text-accent">d</span>cimal
            </Link>
            <p className="text-muted text-sm mt-4 max-w-sm leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">{t('footer.navigate')}</h4>
            <div className="flex flex-col gap-3">
              {navLinks.map(({ to, label }) => (
                <Link key={to} to={to} className="text-sm text-muted hover:text-text transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">{t('footer.connect')}</h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:info@dcimal.in"
                className="text-sm text-muted hover:text-text transition-colors"
              >
                info@dcimal.in
              </a>
              <a
                href="tel:+916213554103"
                className="text-sm text-muted hover:text-text transition-colors"
              >
                +91 621 355 4103
              </a>
              <a
                href="https://www.linkedin.com/company/dcimal-intelligence"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-accent transition-colors inline-flex items-center gap-1"
              >
                LinkedIn <ArrowUpRight size={12} />
              </a>
              <a
                href="https://x.com/Dcimal_in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-accent transition-colors inline-flex items-center gap-1"
              >
                X / Twitter <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-muted">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
          <p className="font-mono text-xs text-muted">
            {t('footer.locations')}
          </p>
        </div>
      </div>
    </footer>
  )
}
