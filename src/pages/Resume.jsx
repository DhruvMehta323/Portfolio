import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, ExternalLink, Code2, Brain, BarChart2 } from 'lucide-react'
import PageWrapper from '../components/PageWrapper.jsx'
import { personal } from '../data/personal.js'

const resumeTypes = [
  {
    id: 'sde',
    label: 'Software Engineer',
    shortLabel: 'SDE',
    icon: Code2,
    color: '#00E5FF',
    border: 'border-accent-cyan/30',
    description:
      'Focused on full-stack development, system design, DSA, and software architecture.',
    file: personal.resumes.sde,
  },
  {
    id: 'mle',
    label: 'ML Engineer',
    shortLabel: 'MLE',
    icon: Brain,
    color: '#8B5CF6',
    border: 'border-accent-violet/30',
    description:
      'Highlights ML research, model building, reinforcement learning, and production ML systems.',
    file: personal.resumes.mle,
  },
  {
    id: 'ds',
    label: 'Data Scientist',
    shortLabel: 'DS',
    icon: BarChart2,
    color: '#10B981',
    border: 'border-accent-emerald/30',
    description:
      'Emphasizes statistical modeling, data analysis, visualization, and ML pipelines for insights.',
    file: personal.resumes.ds,
  },
]

export default function Resume() {
  const [active, setActive] = useState('sde')
  const current = resumeTypes.find((r) => r.id === active)
  const Icon = current.icon

  return (
    <PageWrapper>
      <div className="min-h-screen py-20 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-14"
          >
            <span className="section-tag">Resume</span>
            <h1 className="section-title mt-2 mb-4">
              Download My Resume
            </h1>
            <p className="text-text-secondary max-w-xl mx-auto">
              I maintain three tailored resumes targeting different roles.
              Select the one that matches what you're looking for.
            </p>
          </motion.div>

          {/* Role selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
          >
            {resumeTypes.map((type) => {
              const TypeIcon = type.icon
              const isActive = active === type.id

              return (
                <button
                  key={type.id}
                  onClick={() => setActive(type.id)}
                  className={`card p-5 text-left transition-all duration-300 ${
                    isActive
                      ? `border ${type.border} shadow-md`
                      : 'hover:border-surface hover:bg-bg-hover'
                  }`}
                  style={
                    isActive
                      ? {
                          background: `linear-gradient(135deg, ${type.color}10, transparent)`,
                        }
                      : {}
                  }
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${type.color}20`,
                        border: `1px solid ${type.color}40`,
                      }}
                    >
                      <TypeIcon size={20} style={{ color: type.color }} />
                    </div>

                    <div>
                      <div className="font-display font-bold text-text-primary">
                        {type.shortLabel}
                      </div>
                      <div className="text-text-muted text-xs">
                        {type.label}
                      </div>
                    </div>

                    {isActive && (
                      <div
                        className="ml-auto w-2 h-2 rounded-full"
                        style={{ background: type.color }}
                      />
                    )}
                  </div>

                  {/* <p className="text-text-secondary text-xs leading-relaxed">
                    {type.description}
                  </p> */}
                </button>
              )
            })}
          </motion.div>

          {/* Selected Resume Preview */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="card p-8"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: `${current.color}15`,
                  border: `2px solid ${current.color}40`,
                }}
              >
                <Icon size={28} style={{ color: current.color }} />
              </div>

              <div className="flex-1">
                <h2 className="font-display font-bold text-2xl text-text-primary mb-1">
                  {current.label} Resume
                </h2>
                {/* <p className="text-text-secondary text-sm">
                  {current.description}
                </p> */}
              </div>
            </div>

            {/* Embedded PDF Viewer */}
            <div className="w-full h-[650px] rounded-xl overflow-hidden border border-surface-border mb-8 bg-surface">
              <object
                data={current.file}
                type="application/pdf"
                className="w-full h-full"
              >
                <p className="p-4 text-text-muted text-sm">
                  Your browser does not support PDF preview.
                  <a
                    href={current.file}
                    className="text-accent-cyan ml-1"
                  >
                    Download instead.
                  </a>
                </p>
              </object>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={current.file}
                target="_blank"
                rel="noreferrer"
                className="btn-primary flex-1 justify-center"
              >
                <ExternalLink size={16} /> Open in Browser
              </a>

              <a
                href={current.file}
                download={`Dhruv_Mehta_${current.shortLabel}_Resume.pdf`}
                className="btn-outline flex-1 justify-center"
              >
                <Download size={16} /> Download PDF
              </a>
            </div>
          </motion.div>

          {/* Footer Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-text-muted text-sm mt-8"
          >
            All resumes are kept up to date. Last updated: February 2025.
          </motion.p>
        </div>
      </div>
    </PageWrapper>
  )
}