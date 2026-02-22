import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageWrapper from '../components/PageWrapper.jsx'
import { skillCategories } from '../data/skills.js'

function SkillCard({ skill, index }) {
  const [imgErr, setImgErr] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      whileHover={{ y: -6, scale: 1.03 }}
      className="skill-card card p-6 flex flex-col items-center text-center gap-3 cursor-default group"
      style={{ '--skill-color': skill.color }}
    >
      <div className="w-16 h-16 flex items-center justify-center">
        {!imgErr ? (
          <img
            src={skill.icon}
            alt={skill.name}
            className="w-12 h-12 object-contain transition-all duration-300 group-hover:scale-110"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-display font-bold"
            style={{ background: `${skill.color}22`, color: skill.color, border: `1px solid ${skill.color}33` }}
          >
            {skill.name.slice(0, 2)}
          </div>
        )}
      </div>
      <p className="font-display font-semibold text-sm text-text-primary group-hover:text-accent-cyan transition-colors">
        {skill.name}
      </p>
      {/* Hover underline */}
      <div
        className="h-0.5 w-0 group-hover:w-8 rounded-full transition-all duration-300"
        style={{ background: skill.color }}
      />
    </motion.div>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id)
  const current = skillCategories.find((c) => c.id === activeCategory)

  return (
    <PageWrapper>
      <div className="min-h-screen py-20 px-6 relative overflow-hidden">
        {/* Background orbs */}
        <div className="orb w-96 h-96 -top-48 -right-48 opacity-10" style={{ background: 'radial-gradient(circle, #8B5CF6, transparent 70%)' }} />
        <div className="orb w-80 h-80 bottom-0 left-0 opacity-10" style={{ background: 'radial-gradient(circle, #00E5FF, transparent 70%)' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-14"
          >
            <span className="section-tag">Skills</span>
            <h1 className="section-title mt-2 mb-4">Technologies I Work With</h1>
            <p className="text-text-secondary max-w-xl mx-auto">
              A curated toolkit spanning full-stack development, machine learning, data science, and cloud infrastructure.
            </p>
            <div className="mt-4 w-20 h-0.5 bg-gradient-to-r from-accent-cyan to-accent-violet mx-auto" />
          </motion.div>

          {/* Category tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${
                  activeCategory === cat.id
                    ? 'bg-accent-cyan/10 border-accent-cyan/50 text-accent-cyan shadow-cyan-sm'
                    : 'border-surface-border text-text-secondary hover:border-surface hover:text-text-primary bg-bg-card'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Skills grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Category title */}
              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl">{current.emoji}</span>
                <h2 className="font-display font-bold text-2xl text-text-primary">{current.label}</h2>
                <div className="h-px flex-1 bg-surface-border" />
                <span className="text-text-muted text-sm font-mono">{current.skills.length} technologies</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {current.skills.map((skill, i) => (
                  <SkillCard key={skill.name} skill={skill} index={i} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* All skills overview strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-20 pt-12 border-t border-surface-border/40"
          >
            <p className="text-center text-text-muted text-sm mb-6 font-mono uppercase tracking-widest">All Technologies at a Glance</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {skillCategories.flatMap((cat) =>
                cat.skills.map((skill) => (
                  <span key={`${cat.id}-${skill.name}`} className="tag-pill">
                    {skill.name}
                  </span>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  )
}