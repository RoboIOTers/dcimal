import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import Reveal from '../components/Reveal'

const studies = [
  {
    id: 1,
    year: '2024',
    industry: 'Financial Services',
    title: 'Enterprise Cloud Migration',
    result: '40% cost reduction',
    challenge:
      'A major financial services firm was running legacy on-premise infrastructure that was costly, fragile, and unable to scale for peak trading volumes.',
    solution:
      'We architected a multi-region AWS migration strategy with zero-downtime cutover, containerized microservices, and automated disaster recovery.',
    outcomes: [
      '40% reduction in infrastructure costs',
      '99.99% uptime achieved',
      '3x faster deployment cycles',
      'SOC 2 and PCI DSS compliance maintained',
    ],
    tech: ['AWS', 'Kubernetes', 'Terraform', 'PostgreSQL'],
  },
  {
    id: 2,
    year: '2024',
    industry: 'Manufacturing',
    title: 'AI-Powered Predictive Maintenance',
    result: '60% fewer breakdowns',
    challenge:
      'Unplanned equipment downtime was costing a global manufacturer millions annually. Existing maintenance was reactive, not predictive.',
    solution:
      'We built ML models trained on IoT sensor data to predict equipment failures 48 hours in advance, with automated alerting and maintenance scheduling.',
    outcomes: [
      '60% reduction in unplanned downtime',
      '$2.3M annual savings in maintenance',
      '48-hour advance failure prediction',
      'Real-time monitoring dashboard',
    ],
    tech: ['Python', 'TensorFlow', 'Azure IoT', 'Databricks'],
  },
  {
    id: 3,
    year: '2023',
    industry: 'Healthcare',
    title: 'ServiceNow ITSM Transformation',
    result: '75% faster resolution',
    challenge:
      'A healthcare network with 15,000+ employees had fragmented IT service management — slow ticket resolution, no SLA tracking, and siloed teams.',
    solution:
      'Full ServiceNow ITSM implementation with custom workflows, automated routing, self-service portal, and CMDB integration.',
    outcomes: [
      '75% faster incident resolution',
      '90% SLA compliance (up from 45%)',
      '50% reduction in ticket volume via self-service',
      'Complete CMDB visibility',
    ],
    tech: ['ServiceNow', 'ITSM', 'CMDB', 'IntegrationHub'],
  },
  {
    id: 4,
    year: '2023',
    industry: 'Retail',
    title: 'SAP BTP Integration Suite',
    result: '35% faster order processing',
    challenge:
      'A global retailer had disconnected SAP systems across 12 countries — manual data entry, inventory mismatches, and delayed order fulfillment.',
    solution:
      'Unified SAP BTP integration connecting ERP, CRM, and supply chain systems with real-time data sync and Fiori-based dashboards.',
    outcomes: [
      '35% faster order processing',
      'Real-time inventory across 12 countries',
      'Zero manual data entry errors',
      'Unified reporting dashboard',
    ],
    tech: ['SAP BTP', 'Integration Suite', 'Fiori', 'S/4HANA'],
  },
  {
    id: 5,
    year: '2023',
    industry: 'Energy',
    title: 'Digital Experience Platform',
    result: '120% increase in engagement',
    challenge:
      'An energy company had an outdated, monolithic website that couldn\'t support personalization, was slow to update, and had poor mobile experience.',
    solution:
      'Headless CMS architecture with Optimizely, Next.js frontend, personalized content delivery, and progressive web app capabilities.',
    outcomes: [
      '120% increase in user engagement',
      '65% improvement in page load speed',
      '3x content publishing velocity',
      'Mobile-first responsive experience',
    ],
    tech: ['Optimizely', 'Next.js', 'GraphQL', 'Vercel'],
  },
]

function CaseRow({ study, isOpen, onToggle }) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="w-full text-left py-5 group"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
          <span className="font-mono text-xs text-muted w-16 shrink-0">[{study.year}]</span>
          <span className="text-sm text-muted w-40 shrink-0">{study.industry}</span>
          <span className={`font-heading font-medium flex-1 transition-colors ${isOpen ? 'text-accent' : 'group-hover:text-accent'}`}>
            {study.title}
          </span>
          <span className="font-mono text-sm text-accent sm:text-right">
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
            <div className="pb-8 pl-0 sm:pl-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Challenge */}
                <div>
                  <h4 className="font-mono text-xs text-muted uppercase tracking-widest mb-3">Challenge</h4>
                  <p className="text-sm text-muted leading-relaxed">{study.challenge}</p>
                </div>
                {/* Solution */}
                <div>
                  <h4 className="font-mono text-xs text-muted uppercase tracking-widest mb-3">Solution</h4>
                  <p className="text-sm text-muted leading-relaxed">{study.solution}</p>
                </div>
              </div>

              {/* Results */}
              <div className="mt-6">
                <h4 className="font-mono text-xs text-muted uppercase tracking-widest mb-3">Results</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {study.outcomes.map((outcome, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-accent rounded-full shrink-0" />
                      <span className="text-sm text-text">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech */}
              <div className="flex flex-wrap gap-2 mt-6">
                {study.tech.map((t) => (
                  <span key={t} className="font-mono text-xs px-3 py-1 bg-accent-dim text-accent border border-accent/20">
                    {t}
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
  const [openId, setOpenId] = useState(null)

  return (
    <PageTransition>
      <Helmet>
        <title>Case Studies — DCIMAL</title>
        <meta name="description" content="Real results from real clients — see how DCIMAL delivers digital transformation across industries." />
      </Helmet>

      {/* Hero */}
      <section className="px-6 max-w-6xl mx-auto pt-32 pb-16">
        <Reveal>
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">The Proof</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight">
            Case Studies
          </h1>
          <p className="text-muted text-lg mt-6 max-w-xl leading-relaxed">
            Real problems. Real solutions. Measurable outcomes.
          </p>
        </Reveal>
      </section>

      {/* Terminal-style case study list */}
      <section className="px-6 max-w-6xl mx-auto pb-24">
        <Reveal>
          {/* Header row */}
          <div className="hidden sm:flex items-center gap-0 py-3 border-b border-border mb-0">
            <span className="font-mono text-xs text-muted uppercase tracking-widest w-16">Year</span>
            <span className="font-mono text-xs text-muted uppercase tracking-widest w-40">Industry</span>
            <span className="font-mono text-xs text-muted uppercase tracking-widest flex-1">Project</span>
            <span className="font-mono text-xs text-muted uppercase tracking-widest text-right">Impact</span>
          </div>
        </Reveal>

        <Reveal>
          {studies.map((study) => (
            <CaseRow
              key={study.id}
              study={study}
              isOpen={openId === study.id}
              onToggle={() => setOpenId(openId === study.id ? null : study.id)}
            />
          ))}
        </Reveal>
      </section>

      {/* CTA */}
      <section className="px-6 max-w-6xl mx-auto pb-32">
        <Reveal>
          <div className="text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Your project could be next.
            </h2>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-bg font-medium text-sm hover:bg-accent/90 transition-colors"
            >
              Start Your Transformation <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  )
}
