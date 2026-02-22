import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import Reveal from '../components/Reveal'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const services = [
  {
    id: 'cloud',
    title: 'Cloud Solutions',
    description:
      'End-to-end cloud strategy, migration, and optimization. We architect resilient, cost-efficient infrastructure on AWS, Azure, and Google Cloud — enabling your business to scale without limits.',
    stack: ['AWS', 'Azure', 'GCP', 'Terraform', 'Kubernetes', 'Docker', 'CI/CD'],
    features: [
      'Cloud migration & modernization',
      'Infrastructure as Code',
      'Cost optimization & FinOps',
      'Multi-cloud architecture',
      'Serverless & containerization',
      'Security & compliance',
    ],
  },
  {
    id: 'ai',
    title: 'AI & Data Science',
    description:
      'Turn raw data into competitive advantage. From predictive analytics to computer vision and NLP — we build intelligent systems that automate decisions and uncover insights at scale.',
    stack: ['Python', 'TensorFlow', 'PyTorch', 'Spark', 'Databricks', 'Power BI', 'Tableau'],
    features: [
      'Predictive analytics & forecasting',
      'Machine learning pipelines',
      'Natural language processing',
      'Computer vision solutions',
      'Data engineering & ETL',
      'Business intelligence dashboards',
    ],
  },
  {
    id: 'servicenow',
    title: 'ServiceNow',
    description:
      'Streamline IT operations and enterprise workflows on the Now Platform. We implement, customize, and optimize ServiceNow to automate your most critical business processes.',
    stack: ['ServiceNow', 'ITSM', 'ITOM', 'HRSD', 'CSM', 'IntegrationHub', 'Flow Designer'],
    features: [
      'ITSM implementation & optimization',
      'IT Operations Management',
      'HR Service Delivery',
      'Customer Service Management',
      'Custom app development',
      'Integration & automation',
    ],
  },
  {
    id: 'sap',
    title: 'SAP BTP',
    description:
      'Extend and innovate on SAP Business Technology Platform. We connect your SAP ecosystem with modern cloud services, enabling real-time analytics, integration, and intelligent automation.',
    stack: ['SAP BTP', 'SAP HANA', 'SAP Fiori', 'CAP', 'ABAP Cloud', 'Integration Suite'],
    features: [
      'BTP implementation & configuration',
      'SAP integration & extension',
      'Fiori app development',
      'HANA Cloud analytics',
      'Workflow automation',
      'Migration to S/4HANA',
    ],
  },
  {
    id: 'dxp',
    title: 'Digital Experience Platforms',
    description:
      'Craft compelling digital experiences with enterprise content platforms. We build composable, personalized web experiences that drive engagement and conversion.',
    stack: ['Umbraco', 'Sitecore', 'Optimizely', 'Next.js', 'GraphQL', 'Headless CMS'],
    features: [
      'Platform selection & architecture',
      'Headless & composable CMS',
      'Personalization engines',
      'Multi-channel content delivery',
      'Performance optimization',
      'Migration & upgrades',
    ],
  },
  {
    id: 'web',
    title: 'Web & Software Development',
    description:
      'Custom software built for performance, scalability, and maintainability. From JAMStack frontends to complex backend systems — we deliver production-grade code.',
    stack: ['React', 'Next.js', 'Node.js', 'Python', '.NET', 'PostgreSQL', 'Redis'],
    features: [
      'Full-stack web applications',
      'JAMStack & composable architecture',
      'API design & development',
      'Mobile-responsive interfaces',
      'Performance engineering',
      'DevOps & deployment',
    ],
  },
]

const process = [
  { step: '01', title: 'Discovery', description: 'We audit your systems, map pain points, and define clear objectives.' },
  { step: '02', title: 'Strategy', description: 'We architect a solution with the right technologies and a phased roadmap.' },
  { step: '03', title: 'Implementation', description: 'Agile delivery with continuous feedback, testing, and iteration.' },
  { step: '04', title: 'Support', description: 'Post-launch monitoring, optimization, and knowledge transfer.' },
]

function ServiceRow({ service, isOpen, onToggle }) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-muted w-6">
            {String(services.indexOf(service) + 1).padStart(2, '0')}
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
            <div className="pb-8 pl-10">
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

  return (
    <PageTransition>
      <Helmet>
        <title>Services — DCIMAL</title>
        <meta name="description" content="Cloud, AI, ServiceNow, SAP BTP, DXP, and custom software development services from DCIMAL." />
      </Helmet>

      {/* Hero */}
      <section className="px-6 max-w-6xl mx-auto pt-32 pb-16">
        <Reveal>
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">What We Do</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight">
            Services
          </h1>
          <p className="text-muted text-lg mt-6 max-w-xl leading-relaxed">
            Six capabilities. One mission — accelerate your digital transformation
            with precision and purpose.
          </p>
        </Reveal>
      </section>

      {/* Service Accordion */}
      <section className="px-6 max-w-6xl mx-auto pb-24">
        <Reveal>
          <div className="border-t border-border">
            {services.map((service) => (
              <ServiceRow
                key={service.id}
                service={service}
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
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-12">Our Process</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {process.map(({ step, title, description }, i) => (
            <Reveal key={step} delay={i * 0.1}>
              <div className="relative">
                <span className="font-mono text-4xl font-bold text-accent/20">{step}</span>
                <h3 className="font-heading text-lg font-medium mt-2">{title}</h3>
                <p className="text-sm text-muted mt-2 leading-relaxed">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-24 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Need a tailored solution?
            </h2>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-bg font-medium text-sm hover:bg-accent/90 transition-colors"
            >
              Get in Touch <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  )
}
