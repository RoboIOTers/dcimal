import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { t, i18n } = useTranslation('common')

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/services', label: t('nav.services') },
    { to: '/case-studies', label: t('nav.caseStudies') },
    { to: '/about', label: t('nav.about') },
  ]

  const toggleLanguage = () => {
    const next = i18n.language === 'ar' ? 'en' : 'ar'
    i18n.changeLanguage(next)
    localStorage.setItem('dcimal-lang', next)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg/80 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-heading text-xl font-bold tracking-tight">
          <span className="text-accent">d</span>cimal
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`text-sm transition-colors duration-200 ${
                location.pathname === to
                  ? 'text-accent'
                  : 'text-muted hover:text-text'
              }`}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={toggleLanguage}
            className="font-mono text-xs font-medium px-3 py-1.5 border border-border text-muted hover:text-accent hover:border-accent transition-colors duration-200"
          >
            {i18n.language === 'ar' ? 'EN' : 'AR'}
          </button>
          <Link
            to="/contact"
            className="text-sm font-medium px-5 py-2 border border-accent text-accent hover:bg-accent hover:text-bg transition-all duration-200"
          >
            {t('nav.letsTalk')}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-muted hover:text-text transition-colors"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-surface border-b border-border">
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`text-sm transition-colors ${
                  location.pathname === to ? 'text-accent' : 'text-muted hover:text-text'
                }`}
              >
                {label}
              </Link>
            ))}
            <button
              onClick={toggleLanguage}
              className="font-mono text-xs font-medium px-3 py-1.5 border border-border text-muted hover:text-accent hover:border-accent transition-colors duration-200 w-fit"
            >
              {i18n.language === 'ar' ? 'EN' : 'AR'}
            </button>
            <Link
              to="/contact"
              className="text-sm font-medium px-5 py-2 border border-accent text-accent hover:bg-accent hover:text-bg transition-all duration-200 text-center"
            >
              {t('nav.letsTalk')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
