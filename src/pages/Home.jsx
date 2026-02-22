import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import {
  ArrowRight, Mail, Briefcase, BookOpen, Code2,
  Github, Linkedin, ExternalLink, GraduationCap,
  ChevronDown, Sparkles, MapPin, Download
} from 'lucide-react'
import PageWrapper from '../components/PageWrapper.jsx'
import { personal, education } from '../data/personal.js'

function StatCard({ value, label, suffix = '', icon: Icon, color }) {
  const { ref, inView } = useInView({ triggerOnce: true })
  return (
    <div ref={ref} className="card p-6 flex flex-col items-center text-center card-hover">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4`}
        style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
        <Icon size={22} style={{ color }} />
      </div>
      <div className="font-display font-bold text-3xl text-text-primary mb-1">
        {inView ? <CountUp end={value} duration={2.2} suffix={suffix} /> : '0'}
      </div>
      <p className="text-text-secondary text-sm">{label}</p>
    </div>
  )
}

function EducationCard({ edu }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="card p-6 card-hover"
    >
      <div className="flex items-start gap-4 mb-4">
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
          <span className="text-xs font-mono font-bold text-accent-cyan hidden items-center justify-center w-full h-full">
            {edu.shortName}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${
              edu.status === 'current'
                ? 'bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/30'
                : 'bg-surface text-text-muted border border-surface-border'
            }`}>
              {edu.status === 'current' ? 'Current' : 'Completed'}
            </span>
            <span className="text-xs font-mono text-text-muted">{edu.period}</span>
          </div>
          <h3 className="font-display font-semibold text-text-primary text-sm leading-snug">{edu.degree}</h3>
          <p className="text-text-secondary text-xs mt-0.5">{edu.institution}</p>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs mb-4">
        <span className="text-text-muted flex items-center gap-1">
          <MapPin size={11} /> {edu.location}
        </span>
        <span className="font-mono text-accent-emerald font-semibold">GPA: {edu.gpa}</span>
      </div>
      <div>
        <p className="text-xs text-text-muted mb-2 font-mono uppercase tracking-wider">Relevant Courses</p>
        <div className="flex flex-wrap gap-1.5">
          {edu.courses.slice(0, 6).map((course) => (
            <span key={course} className="tag-pill text-xs">{course}</span>
          ))}
          {edu.courses.length > 6 && (
            <span className="tag-pill text-xs">+{edu.courses.length - 6} more</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Home() {
  const scrollRef = useRef(null)

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  }
  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <PageWrapper>
      {/* ——— HERO ——— */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden dots-bg">
        {/* Orbs */}
        <div className="orb w-[500px] h-[500px] -top-32 -left-32 opacity-20" style={{ background: 'radial-gradient(circle, #00E5FF, transparent 70%)' }} />
        <div className="orb w-[400px] h-[400px] top-1/2 -right-48 opacity-15" style={{ background: 'radial-gradient(circle, #8B5CF6, transparent 70%)' }} />
        <div className="orb w-[300px] h-[300px] bottom-0 left-1/3 opacity-10" style={{ background: 'radial-gradient(circle, #10B981, transparent 70%)' }} />

        <div className="max-w-7xl mx-auto px-6 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="order-2 lg:order-1"
            >
              <motion.div variants={item} className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-accent-cyan" />
                <span className="section-tag">Available for hire</span>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
                  <span className="text-xs text-accent-emerald font-mono">Open to opportunities</span>
                </div>
              </motion.div>

              <motion.h1
                variants={item}
                className="font-display font-extrabold text-5xl md:text-7xl leading-none mb-4"
              >
                <span className="text-text-primary">Hi, I'm</span>
                <br />
                <span className="text-gradient">{personal.name}</span>
              </motion.h1>

              <motion.div variants={item} className="mb-6 h-10 flex items-center">
                <span className="font-mono text-text-secondary text-lg">
                  {'> '}
                </span>
                <TypeAnimation
                  sequence={personal.taglines.flatMap((t) => [t, 2000])}
                  wrapper="span"
                  repeat={Infinity}
                  className="font-mono text-lg text-accent-cyan ml-2"
                />
              </motion.div>

              <motion.p variants={item} className="text-text-secondary text-lg leading-relaxed mb-8 max-w-xl">
                {personal.bio}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={item} className="flex flex-wrap gap-4 mb-10">
                <Link to="/contact" className="btn-primary">
                  <Mail size={16} /> Get In Touch
                </Link>
                <Link to="/projects" className="btn-outline">
                  <Code2 size={16} /> View My Work
                </Link>
                <Link
                  to="/resume"
                  className="btn-outline"
                >
                  <Download size={16} /> View Resume
                </Link>
              </motion.div>

              {/* Social */}
              <motion.div variants={item} className="flex items-center gap-4">
                {[
                  { icon: Github, href: personal.social.github, label: 'GitHub' },
                  { icon: Linkedin, href: personal.social.linkedin, label: 'LinkedIn' },
                  { icon: BookOpen, href: personal.social.googleScholar, label: 'Scholar' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-text-secondary hover:text-accent-cyan transition-colors text-sm"
                  >
                    <Icon size={18} />
                    <span className="hidden sm:inline">{label}</span>
                  </a>
                ))}
                <span className="text-text-muted text-xs ml-2 flex items-center gap-1">
                  <MapPin size={12} /> {personal.location.split(',')[0]}
                </span>
              </motion.div>
            </motion.div>

            {/* Right: Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div className="relative">
                {/* Rotating ring */}
                <div className="absolute inset-0 rounded-full animate-spin-slow opacity-30">
                  <div className="w-full h-full rounded-full border-2 border-dashed border-accent-cyan/40" />
                </div>
                {/* Glow */}
                <div className="absolute inset-4 rounded-full bg-accent-cyan/10 blur-2xl" />
                {/* Photo */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shine-border">
                  <img
                    src={personal.photo}
                    alt={personal.name}
                    className="w-full h-full object-cover object-[center_5%]"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.parentElement.style.background = 'linear-gradient(135deg, #0F1220, #1A2035)'
                      const placeholder = document.createElement('div')
                      placeholder.className = 'absolute inset-0 flex items-center justify-center text-8xl font-display font-bold text-gradient'
                      placeholder.style.background = 'linear-gradient(135deg, #00E5FF, #8B5CF6)'
                      placeholder.style.webkitBackgroundClip = 'text'
                      placeholder.style.webkitTextFillColor = 'transparent'
                      placeholder.innerText = 'DM'
                      e.target.parentElement.appendChild(placeholder)
                    }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/30 to-transparent" />
                </div>
                {/* Floating badge */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-full flex items-center gap-2"
                >
                  <Sparkles size={14} className="text-accent-amber" />
                  <span className="text-xs font-mono text-text-primary whitespace-nowrap">CS @ UIC · Mumbai → Chicago</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-text-muted cursor-pointer"
          onClick={() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-xs font-mono">scroll</span>
          <ChevronDown size={16} />
        </motion.div>
      </section>

      {/* ——— STATS ——— */}
      <section ref={scrollRef} className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-tag">By The Numbers</span>
            <h2 className="section-title mt-2">A Snapshot of My Journey</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard value={personal.stats.internships} label="Internships Completed" suffix="+" icon={Briefcase} color="#00E5FF" />
            <StatCard value={personal.stats.projects} label="Projects Built" suffix="+" icon={Code2} color="#8B5CF6" />
            <StatCard value={personal.stats.papers} label="Papers Published" icon={BookOpen} color="#10B981" />
            <StatCard value={personal.stats.researchContributions} label="Research Contributions" icon={Sparkles} color="#F59E0B" />
          </div>
        </div>
      </section>

      {/* ——— ABOUT ——— */}
      <section className="py-20 px-6 bg-bg-secondary relative overflow-hidden">
        <div className="orb w-80 h-80 top-0 right-0 opacity-10" style={{ background: 'radial-gradient(circle, #8B5CF6, transparent 70%)' }} />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-tag">About Me</span>
              <h2 className="section-title mt-2 mb-6">My Story</h2>
              {personal.story.split('\n\n').map((para, i) => (
                <p key={i} className="text-text-secondary leading-relaxed mb-4 text-base">
                  {para}
                </p>
              ))}
              <div className="flex gap-4 mt-8">
                <Link to="/experience" className="btn-outline">
                  <Briefcase size={16} /> My Experience
                </Link>
                <Link to="/research" className="btn-outline">
                  <BookOpen size={16} /> My Research
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              {/* Quick facts */}
              {[
                { label: 'Current Role', value: 'MS CS Student @ UIC, Chicago', color: '#00E5FF' },
                { label: 'Looking For', value: 'SDE · MLE · Data Science roles', color: '#8B5CF6' },
                { label: 'Availability', value: personal.availability, color: '#10B981' },
                { label: 'Location', value: personal.location, color: '#F59E0B' },
                { label: 'Passion', value: 'AI that explains itself to humans', color: '#F43F5E' },
              ].map(({ label, value, color }) => (
                <div key={label} className="card p-4 flex items-center gap-4">
                  <div className="w-1 h-12 rounded-full flex-shrink-0" style={{ background: color }} />
                  <div>
                    <p className="text-xs text-text-muted font-mono uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="text-text-primary font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ——— EDUCATION ——— */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-tag">Education</span>
            <h2 className="section-title mt-2">Academic Background</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {education.map((edu) => (
              <EducationCard key={edu.id} edu={edu} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/experience" className="btn-outline">
              View Full Experience <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ——— CTA BANNER ——— */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="shine-border p-12 rounded-3xl text-center relative overflow-hidden"
          >
            <div className="orb w-64 h-64 top-0 left-1/2 -translate-x-1/2 opacity-15" style={{ background: 'radial-gradient(circle, #00E5FF, transparent 70%)' }} />
            <span className="section-tag relative z-10">Let's Build Something</span>
            <h2 className="section-title mt-2 mb-4 relative z-10">Ready to Work Together?</h2>
            <p className="text-text-secondary mb-8 relative z-10 text-lg">
              I'm actively looking for SDE, MLE, and Data Science opportunities. Let's create something extraordinary.
            </p>
            <div className="flex flex-wrap gap-4 justify-center relative z-10">
              <Link to="/contact" className="btn-primary">
                <Mail size={16} /> Get In Touch <ArrowRight size={16} />
              </Link>
              <Link to="/resume" className="btn-outline">
                <Download size={16} /> Download Resume
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}