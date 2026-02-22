import { motion } from 'framer-motion'
import { ExternalLink, BookOpen, FlaskConical, Lightbulb, CheckCircle2 } from 'lucide-react'
import PageWrapper from '../components/PageWrapper.jsx'
import { research } from '../data/research.js'

const sectionConfig = {
  published: { label: 'Published / Accepted', icon: BookOpen, color: '#10B981' },
  contributions: { label: 'Research Contributions', icon: FlaskConical, color: '#00E5FF' },
  interests: { label: 'Research Interests', icon: Lightbulb, color: '#F59E0B' },
}

function SectionHeader({ section }) {
  const config = sectionConfig[section]
  const Icon = config.icon

  return (
    <div className="flex items-center gap-3 mb-8">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{
          background: `${config.color}18`,
          border: `1px solid ${config.color}30`,
        }}
      >
        <Icon size={20} style={{ color: config.color }} />
      </div>
      <h2 className="font-display font-bold text-2xl text-text-primary">
        {config.label}
      </h2>
      <div className="h-px flex-1 bg-surface-border/60" />
    </div>
  )
}

function PaperCard({ paper }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="h-48 md:h-full bg-surface relative overflow-hidden md:col-span-1">
          <img
            src={paper.thumbnail}
            alt={paper.title}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="p-6 md:col-span-2">
          <div className="flex flex-wrap gap-2 mb-3">
            <span
              className="text-xs px-2 py-0.5 rounded-full font-mono border"
              style={{
                color: paper.statusColor,
                borderColor: `${paper.statusColor}40`,
                background: `${paper.statusColor}12`,
              }}
            >
              ● {paper.status}
            </span>
            <span className="text-xs text-text-muted font-mono ml-auto">
              {paper.year}
            </span>
          </div>

          <h3 className="font-display font-bold text-xl text-text-primary mb-2">
            {paper.title}
          </h3>

          {paper.venue && (
            <p className="text-accent-cyan text-sm font-medium mb-2">
              {paper.venue}
            </p>
          )}

          <p className="text-text-secondary text-sm leading-relaxed mb-4">
            {paper.abstract}
          </p>

          <div className="space-y-1.5 mb-4">
            {paper.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                <CheckCircle2 size={14} className="text-accent-cyan mt-0.5" />
                {h}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {paper.tags.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>

          {paper.link && (
            <a
              href={paper.link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-accent-cyan hover:underline"
            >
              <ExternalLink size={14} /> Read Paper
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function InterestCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="card p-6 card-hover"
    >
      <div className="text-3xl mb-3">{item.icon}</div>
      <h3 className="font-display font-semibold text-text-primary mb-2">
        {item.title}
      </h3>
      <p className="text-text-secondary text-sm leading-relaxed">
        {item.description}
      </p>
      <div
        className="mt-4 h-0.5 rounded-full w-12"
        style={{ background: item.color }}
      />
    </motion.div>
  )
}

export default function Research() {
  return (
    <PageWrapper>
      <div className="min-h-screen py-20 px-6">
        <div className="max-w-5xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="section-tag">Research</span>
            <h1 className="section-title mt-2 mb-4">
              Research & Publications
            </h1>
            <p className="text-text-secondary max-w-xl mx-auto">
              Exploring advanced topics in reinforcement learning, generative models, and large language systems.
            </p>
          </motion.div>

          <section className="mb-16">
            <SectionHeader section="published" />
            <div className="space-y-6">
              {research.published.map((paper) => (
                <PaperCard key={paper.id} paper={paper} />
              ))}
            </div>
          </section>

          <section className="mb-16">
            <SectionHeader section="contributions" />
            <div className="space-y-6">
              {research.contributions.map((paper) => (
                <PaperCard key={paper.id} paper={paper} />
              ))}
            </div>
          </section>

          <section>
            <SectionHeader section="interests" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {research.interests.map((item, i) => (
                <InterestCard key={item.id} item={item} index={i} />
              ))}
            </div>
          </section>

        </div>
      </div>
    </PageWrapper>
  )
}