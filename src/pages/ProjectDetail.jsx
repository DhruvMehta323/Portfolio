import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Github, ExternalLink, CheckCircle2, Calendar, Tag } from 'lucide-react'
import PageWrapper from '../components/PageWrapper.jsx'
import { projects } from '../data/projects.js'

const statusConfig = {
  live: { label: 'Live', color: '#10B981' },
  private: { label: 'Private Repo', color: '#F59E0B' },
  archived: { label: 'Archived', color: '#7A8BAD' },
}

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <PageWrapper>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-display font-bold text-text-primary mb-4">Project not found</h2>
            <Link to="/projects" className="btn-primary">Back to Projects</Link>
          </div>
        </div>
      </PageWrapper>
    )
  }

  const related = projects.filter(
    (p) => p.id !== project.id && p.category.some((c) => project.category.includes(c))
  ).slice(0, 3)

  return (
    <PageWrapper>
      <div className="min-h-screen py-10 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Back button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/projects')}
            className="flex items-center gap-2 text-text-secondary hover:text-accent-cyan transition-colors mb-8 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Projects</span>
          </motion.button>

          {/* Thumbnail */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8 bg-surface border border-surface-border"
          >
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                const parent = e.target.parentElement
                parent.style.background = 'linear-gradient(135deg, #0F1220 0%, #1A2035 100%)'
                const txt = document.createElement('div')
                txt.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:Syne,sans-serif;font-weight:800;font-size:5rem;background:linear-gradient(135deg,#00E5FF,#8B5CF6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;'
                txt.innerText = project.title.slice(0, 2).toUpperCase()
                parent.appendChild(txt)
              }}
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span
                    className="text-xs font-mono px-2.5 py-1 rounded-full border"
                    style={{
                      color: statusConfig[project.status].color,
                      borderColor: `${statusConfig[project.status].color}40`,
                      background: `${statusConfig[project.status].color}12`,
                    }}
                  >
                    ● {statusConfig[project.status].label}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-text-muted font-mono">
                    <Calendar size={11} /> {project.year}
                  </span>
                </div>
                <h1 className="font-display font-extrabold text-3xl md:text-4xl text-text-primary mb-2 leading-tight">
                  {project.title}
                </h1>
                <p className="text-accent-cyan font-medium mb-6">{project.tagline}</p>

                <h2 className="font-display font-semibold text-lg text-text-primary mb-3">Overview</h2>
                <p className="text-text-secondary leading-relaxed mb-8 text-base">
                  {project.description}
                </p>

                <h2 className="font-display font-semibold text-lg text-text-primary mb-4">Key Metrics & Highlights</h2>
                <div className="space-y-3 mb-8">
                  {project.metrics.map((metric, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                      className="flex items-start gap-3 p-4 card"
                    >
                      <CheckCircle2 size={18} className="text-accent-cyan flex-shrink-0 mt-0.5" />
                      <p className="text-text-secondary text-sm leading-relaxed">{metric}</p>
                    </motion.div>
                  ))}
                </div>

                <h2 className="font-display font-semibold text-lg text-text-primary mb-3">Technologies Used</h2>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span key={tag} className="flex items-center gap-1.5 tag-pill">
                      <Tag size={10} /> {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-5"
            >
              {/* Project Links */}
              <div className="card p-5">
                <h3 className="font-display font-semibold text-base text-text-primary mb-4">Project Links</h3>
                <div className="space-y-3">
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 w-full p-3 rounded-xl bg-surface border border-surface-border text-text-secondary hover:text-text-primary hover:border-accent-cyan/40 transition-all text-sm font-medium"
                    >
                      <Github size={18} className="text-text-primary" />
                      View Source Code
                      <ExternalLink size={13} className="ml-auto opacity-50" />
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 w-full p-3 rounded-xl bg-surface/50 border border-surface-border text-text-muted text-sm cursor-not-allowed">
                      <Github size={18} />
                      Private Repository
                    </div>
                  )}
                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 w-full p-3 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan hover:bg-accent-cyan/15 transition-all text-sm font-medium"
                    >
                      <ExternalLink size={18} />
                      Live Demo
                      <ExternalLink size={13} className="ml-auto opacity-70" />
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 w-full p-3 rounded-xl bg-surface/50 border border-surface-border text-text-muted text-sm cursor-not-allowed">
                      <ExternalLink size={18} />
                      No Live Demo
                    </div>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="card p-5">
                <h3 className="font-display font-semibold text-base text-text-primary mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {project.category.map((cat) => (
                    <span key={cat} className="tag-pill uppercase text-xs">{cat}</span>
                  ))}
                </div>
              </div>

              {/* Related */}
              {related.length > 0 && (
                <div className="card p-5">
                  <h3 className="font-display font-semibold text-base text-text-primary mb-4">Related Projects</h3>
                  <div className="space-y-3">
                    {related.map((rel) => (
                      <Link
                        key={rel.id}
                        to={`/projects/${rel.id}`}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface/50 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-surface flex-shrink-0">
                          <img
                            src={rel.thumbnail}
                            alt={rel.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none'
                              const d = document.createElement('div')
                              d.style.cssText = 'width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:bold;color:#00E5FF;'
                              d.innerText = rel.title.slice(0, 2)
                              e.target.parentElement.appendChild(d)
                            }}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-text-primary group-hover:text-accent-cyan transition-colors leading-snug">
                            {rel.title}
                          </p>
                          <p className="text-xs text-text-muted mt-0.5 line-clamp-1">{rel.tagline}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <Link to="/projects" className="btn-outline w-full justify-center">
                <ArrowLeft size={15} /> All Projects
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}