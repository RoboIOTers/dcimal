import { Helmet } from 'react-helmet'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import Reveal from '../components/Reveal'

const values = [
  { word: 'Innovation', brief: 'We embrace cutting-edge technology to solve hard problems.' },
  { word: 'Partnership', brief: 'Your success is our success — we build lasting relationships.' },
  { word: 'Excellence', brief: 'Every deliverable meets the highest standard of quality.' },
  { word: 'Agility', brief: 'We move fast, adapt quickly, and deliver iteratively.' },
]

const timeline = [
  { year: '2018', event: 'Founded in India with a team of 5 engineers.' },
  { year: '2019', event: 'First enterprise client — cloud migration for a fintech startup.' },
  { year: '2020', event: 'Expanded into AI & Data Science practice.' },
  { year: '2021', event: 'Opened UK operations hub.' },
  { year: '2022', event: 'ServiceNow and SAP BTP capabilities launched.' },
  { year: '2023', event: 'US partnerships established. Team expanded.' },
  { year: '2024', event: 'Digital Experience Platforms practice launched.' },
  { year: '2025', event: 'Multiple projects delivered.' },
]

const team = [
  { name: 'Arjun Mehta', role: 'Founder & CEO', detail: '15+ years in enterprise technology' },
  { name: 'Priya Sharma', role: 'CTO', detail: 'Cloud architecture & AI specialist' },
  { name: 'James Wilson', role: 'VP, UK Operations', detail: 'Enterprise sales & delivery' },
  { name: 'Dr. Kavitha Rao', role: 'Head of AI', detail: 'PhD in Machine Learning' },
  { name: 'Michael Chen', role: 'Head of Cloud', detail: 'AWS & Azure certified architect' },
  { name: 'Sarah Ahmed', role: 'Head of DXP', detail: 'Sitecore & Optimizely MVP' },
]

const impact = [
  { value: '500+', label: 'Projects' },
  { value: '50+', label: 'Clients' },
  { value: '100+', label: 'Team' },
  { value: '40%', label: 'Avg ROI Gain' },
]

export default function About() {
  return (
    <PageTransition>
      <Helmet>
        <title>About — DCIMAL</title>
        <meta name="description" content="DCIMAL is a digital transformation company empowering enterprises across 15+ countries with cloud, AI, and enterprise solutions." />
      </Helmet>

      {/* Hero */}
      <section className="px-6 max-w-6xl mx-auto pt-32 pb-16">
        <Reveal>
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Who We Are</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight">
            About DCIMAL
          </h1>
        </Reveal>
      </section>

      {/* Mission & Vision */}
      <section className="px-6 max-w-6xl mx-auto pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <Reveal>
            <div>
              <h3 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Mission</h3>
              <p className="font-heading text-xl md:text-2xl font-medium leading-relaxed">
                Empower organizations with digital solutions that drive sustainable growth and competitive advantage.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <h3 className="font-mono text-xs text-muted uppercase tracking-widest mb-4">Vision</h3>
              <p className="font-heading text-xl md:text-2xl font-medium leading-relaxed">
                Be the global leader in digital transformation — recognized for expertise that seamlessly integrates with business strategy.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 max-w-6xl mx-auto pb-24">
        <Reveal>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">Core Values</h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
          {values.map(({ word, brief }, i) => (
            <Reveal key={word} delay={i * 0.05}>
              <div className="bg-bg p-8 md:p-12">
                <h3 className="font-heading text-2xl font-bold text-accent mb-3">{word}</h3>
                <p className="text-sm text-muted leading-relaxed">{brief}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 max-w-6xl mx-auto pb-24">
        <Reveal>
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">Our Journey</h2>
        </Reveal>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

          <div className="space-y-8">
            {timeline.map(({ year, event }, i) => (
              <Reveal key={year} delay={i * 0.05}>
                <div className="flex items-start gap-6">
                  <div className="relative shrink-0">
                    <div className="w-[15px] h-[15px] rounded-full border-2 border-accent bg-bg" />
                  </div>
                  <div className="pb-2">
                    <span className="font-mono text-sm text-accent font-medium">{year}</span>
                    <p className="text-sm text-muted mt-1">{event}</p>
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
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">Leadership</h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-border">
          {team.map(({ name, role, detail }, i) => (
            <Reveal key={name} delay={i * 0.05}>
              <div className="bg-bg p-8">
                <h3 className="font-heading font-medium text-text">{name}</h3>
                <p className="font-mono text-xs text-accent mt-1">{role}</p>
                <p className="text-xs text-muted mt-2">{detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Impact */}
      <section className="px-6 max-w-6xl mx-auto pb-32">
        <Reveal>
          <div className="border-t border-b border-border py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {impact.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-mono text-3xl md:text-4xl font-bold text-accent">{value}</p>
                <p className="font-mono text-xs text-muted uppercase tracking-widest mt-2">{label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-24 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Join our story.
            </h2>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-bg font-medium text-sm hover:bg-accent/90 transition-colors"
            >
              Work With Us <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  )
}
