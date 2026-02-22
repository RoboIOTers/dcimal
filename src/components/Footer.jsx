import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function Footer() {
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
              Empowering organizations with digital transformation solutions
              that drive sustainable growth and competitive advantage.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Navigate</h4>
            <div className="flex flex-col gap-3">
              {[
                { to: '/services', label: 'Services' },
                { to: '/case-studies', label: 'Case Studies' },
                { to: '/about', label: 'About' },
                { to: '/contact', label: 'Contact' },
              ].map(({ to, label }) => (
                <Link key={to} to={to} className="text-sm text-muted hover:text-text transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Connect</h4>
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
            &copy; {new Date().getFullYear()} DCIMAL. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted">
            India &middot; United Kingdom &middot; United States
          </p>
        </div>
      </div>
    </footer>
  )
}
