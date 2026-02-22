import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, MapPin, Calendar, ChevronDown, ChevronUp, Briefcase, GraduationCap } from 'lucide-react'
import PageWrapper from '../components/PageWrapper.jsx'
import { experiences } from '../data/experience.js'
import { education } from '../data/personal.js'

function ExperienceCard({ exp, index }) {
  const [expanded, setExpanded] = useState(index === 0)

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8"
    >
      {/* Timeline dot */}
      <div
        className="timeline-dot absolute left-0 top-6 w-4 h-4 rounded-full border-2 border-bg-primary flex-shrink-0 z-10"
        style={{ background: exp.accentColor }}
      />

      <div className="card overflow-hidden">
        {/* Header */}
        <div
          className="p-6 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-start gap-4">
            {/* Logo */}
            <div className="w-14 h-14 rounded-xl bg-surface border border-surface-border flex items-center justify-center overflow-hidden flex-shrink-0">
              <img
                src={exp.logo}
                alt={exp.company}
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <span
                className="text-xs font-display font-bold hidden items-center justify-center w-full h-full"
                style={{ color: exp.accentColor }}
              >
                {exp.logoFallback}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-display font-bold text-lg text-text-primary leading-snug">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <p className="text-text-secondary text-sm font-medium">{exp.company}</p>
                    <a
                      href={exp.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-text-muted hover:text-accent-cyan transition-colors"
                    >
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-mono border hidden sm:inline"
                    style={{ color: exp.accentColor, borderColor: `${exp.accentColor}40`, background: `${exp.accentColor}12` }}
                  >
                    {exp.type}
                  </span>
                  {expanded ? <ChevronUp size={16} className="text-text-muted" /> : <ChevronDown size={16} className="text-text-muted" />}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-text-muted font-mono">
                <span className="flex items-center gap-1">
                  <Calendar size={11} /> {exp.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={11} /> {exp.location} · {exp.locationMode}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Expanded content */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-surface-border/50 px-6 pb-6 pt-5"
          >
            <h4 className="text-xs font-mono uppercase tracking-widest text-text-muted mb-4">Key Contributions</h4>
            <ul className="space-y-3">
              {exp.points.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3"
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                    style={{ background: exp.accentColor }}
                  />
                  <p className="text-text-secondary text-sm leading-relaxed">{point}</p>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5 mt-5">
              {exp.tags.map((tag) => (
                <span key={tag} className="tag-pill">{tag}</span>
              ))}
            </div>

            <div className="flex gap-3 mt-4">
              <a
                href={exp.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-accent-cyan transition-colors"
              >
                <ExternalLink size={12} /> LinkedIn
              </a>
              <a
                href={exp.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-accent-cyan transition-colors"
              >
                <ExternalLink size={12} /> Website
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

function EducationTimelineCard({ edu, index }) {
  const [expanded, setExpanded] = useState(index === 0)

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8"
    >
      <div
        className="timeline-dot absolute left-0 top-6 w-4 h-4 rounded-full border-2 border-bg-primary flex-shrink-0 z-10"
        style={{ background: edu.status === 'current' ? '#00E5FF' : '#8B5CF6' }}
      />
      <div className="card overflow-hidden">
        <div className="p-6 cursor-pointer" onClick={() => setExpanded(!expanded)}>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-surface border border-surface-border flex items-center justify-center overflow-hidden flex-shrink-0">
              <img
                src={edu.logo}
                alt={edu.shortName}
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <span className="text-xs font-display font-bold text-accent-cyan hidden items-center justify-center w-full h-full">
                {edu.shortName}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-display font-bold text-lg text-text-primary">{edu.degree}</h3>
                  <p className="text-text-secondary text-sm mt-0.5">{edu.institution}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-mono border ${
                    edu.status === 'current'
                      ? 'text-accent-cyan border-accent-cyan/40 bg-accent-cyan/10'
                      : 'text-accent-violet border-accent-violet/40 bg-accent-violet/10'
                  }`}>
                    {edu.status === 'current' ? 'Current' : 'Completed'}
                  </span>
                  {expanded ? <ChevronUp size={16} className="text-text-muted" /> : <ChevronDown size={16} className="text-text-muted" />}
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mt-2 text-xs text-text-muted font-mono">
                <span className="flex items-center gap-1"><Calendar size={11} /> {edu.period}</span>
                <span className="flex items-center gap-1"><MapPin size={11} /> {edu.location}</span>
                <span className="text-accent-emerald font-semibold">GPA: {edu.gpa}</span>
              </div>
            </div>
          </div>
        </div>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="border-t border-surface-border/50 px-6 pb-5 pt-4"
          >
            <h4 className="text-xs font-mono uppercase tracking-widest text-text-muted mb-3">Relevant Courses</h4>
            <div className="flex flex-wrap gap-2">
              {edu.courses.map((course) => (
                <span key={course} className="tag-pill">{course}</span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <PageWrapper>
      <div className="min-h-screen py-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="section-tag">Journey</span>
            <h1 className="section-title mt-2 mb-4">Experience & Education</h1>
            <p className="text-text-secondary max-w-xl mx-auto">
              A timeline of roles, research, and education that shaped who I am as an engineer.
            </p>
          </motion.div>

          {/* Experience Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-accent-cyan/15 border border-accent-cyan/30 flex items-center justify-center">
                <Briefcase size={16} className="text-accent-cyan" />
              </div>
              <h2 className="font-display font-bold text-2xl text-text-primary">Work Experience</h2>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-2 top-6 bottom-6 w-px bg-gradient-to-b from-accent-cyan/50 via-accent-violet/30 to-transparent" />
              <div className="space-y-6">
                {experiences.map((exp, i) => (
                  <ExperienceCard key={exp.id} exp={exp} index={i} />
                ))}
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-accent-violet/15 border border-accent-violet/30 flex items-center justify-center">
                <GraduationCap size={16} className="text-accent-violet" />
              </div>
              <h2 className="font-display font-bold text-2xl text-text-primary">Education</h2>
            </div>

            <div className="relative">
              <div className="absolute left-2 top-6 bottom-6 w-px bg-gradient-to-b from-accent-violet/50 to-transparent" />
              <div className="space-y-6">
                {education.map((edu, i) => (
                  <EducationTimelineCard key={edu.id} edu={edu} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}