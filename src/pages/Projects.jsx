import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, ArrowRight, Star, Filter } from 'lucide-react'
import PageWrapper from '../components/PageWrapper.jsx'
import { projects } from '../data/projects.js'

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'sde', label: 'SDE' },
  { id: 'mle', label: 'ML Engineering' },
  { id: 'ds', label: 'Data Science' },
  { id: 'fullstack', label: 'Full-Stack' },
]

const statusConfig = {
  live: { label: 'Live', color: '#10B981', bg: '#10B98115' },
  private: { label: 'Private', color: '#F59E0B', bg: '#F59E0B15' },
  archived: { label: 'Archived', color: '#7A8BAD', bg: '#7A8BAD15' },
}

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="group card overflow-hidden card-hover relative"
    >
      {project.featured && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-accent-amber/15 border border-accent-amber/30 text-accent-amber text-xs font-mono">
          <Star size={10} fill="currentColor" /> Featured
        </div>
      )}

      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-surface">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 object-[center_5%]"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.parentElement.style.background = 'linear-gradient(135deg, #0F1220, #1A2035)'
            const txt = document.createElement('div')
            txt.className = 'absolute inset-0 flex items-center justify-center font-display font-bold text-4xl text-gradient'
            txt.innerText = project.title.slice(0, 2).toUpperCase()
            e.target.parentElement.appendChild(txt)
          }}
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-bg-primary/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <Link
            to={`/projects/${project.id}`}
            className="btn-primary text-sm"
          >
            View Details <ArrowRight size={15} />
          </Link>
        </div>
        {/* Status badge */}
        <div
          className="absolute bottom-3 left-3 px-2 py-0.5 rounded-full text-xs font-mono border"
          style={{
            background: statusConfig[project.status].bg,
            color: statusConfig[project.status].color,
            borderColor: `${statusConfig[project.status].color}40`,
          }}
        >
          {statusConfig[project.status].label}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-bold text-lg text-text-primary group-hover:text-accent-cyan transition-colors leading-snug">
            {project.title}
          </h3>
          <span className="text-xs font-mono text-text-muted mt-1 flex-shrink-0">{project.year}</span>
        </div>
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">{project.tagline}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="tag-pill">{tag}</span>
          ))}
          {project.tags.length > 4 && (
            <span className="tag-pill">+{project.tags.length - 4}</span>
          )}
        </div>

        {/* Links row */}
        <div className="flex items-center gap-3 pt-3 border-t border-surface-border/40">
          <Link
            to={`/projects/${project.id}`}
            className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-accent-cyan transition-colors font-medium"
          >
            <ArrowRight size={14} /> View Details
          </Link>
          <div className="flex-1" />
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-text-muted hover:text-text-primary transition-colors"
              title="GitHub"
            >
              <Github size={16} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 text-text-muted hover:text-accent-cyan transition-colors"
              title="Live Demo"
            >
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category.includes(activeFilter))

  return (
    <PageWrapper>
      <div className="min-h-screen py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="section-tag">Portfolio</span>
            <h1 className="section-title mt-2 mb-4">Things I've Built</h1>
            <p className="text-text-secondary max-w-xl mx-auto">
              From ML systems to full-stack applications — a collection of projects that solve real problems.
            </p>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap justify-center gap-2 mb-10"
          >
            <Filter size={16} className="text-text-muted mt-2.5" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                  activeFilter === cat.id
                    ? 'bg-accent-cyan/10 border-accent-cyan/50 text-accent-cyan'
                    : 'border-surface-border text-text-secondary hover:border-surface hover:text-text-primary bg-bg-card'
                }`}
              >
                {cat.label}
                {cat.id !== 'all' && (
                  <span className="ml-2 text-xs text-text-muted">
                    ({projects.filter((p) => p.category.includes(cat.id)).length})
                  </span>
                )}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-text-muted">
              No projects found in this category.
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}