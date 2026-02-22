import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin, BookOpen, Send, CheckCircle2 } from 'lucide-react'
import PageWrapper from '../components/PageWrapper.jsx'
import { personal } from '../data/personal.js'
import { SiLeetcode } from "react-icons/si"


export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email is required'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (!form.message.trim() || form.message.length < 20) e.message = 'Message must be at least 20 characters'
    return e
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setStatus('sending')
    // Simulate send (replace with EmailJS or backend call)
    try {
      await new Promise((r) => setTimeout(r, 1500))
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Personal Email',
      value: personal.email,
      sub: 'Preferred for opportunities',
      href: `mailto:${personal.email}`,
      color: '#00E5FF',
    },
    {
      icon: Mail,
      label: 'University Email',
      value: personal.universityEmail,
      sub: 'Typically respond within 24 hrs',
      href: `mailto:${personal.universityEmail}`,
      color: '#8B5CF6',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personal.phone,
      sub: 'Available 10AM–6PM CDT',
      href: `tel:${personal.phone.replace(/\D/g, '')}`,
      color: '#10B981',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personal.location,
      sub: personal.availability,
      href: null,
      color: '#F59E0B',
    },
  ]

  const socials = [
    { icon: Github, label: 'GitHub', href: personal.social.github, username: '@dhruv-mehta' },
    { icon: Linkedin, label: 'LinkedIn', href: personal.social.linkedin, username: 'in/dhruv-mehta' },
    { icon: BookOpen, label: 'Google Scholar', href: personal.social.googleScholar, username: 'Dhruv Mehta' },
    { icon: SiLeetcode, label: 'LeetCode', href: personal.social.leetcode, username: 'DhruvM21' },
    
  ]

  return (
    <PageWrapper>
      <div className="min-h-screen py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-14"
          >
            <span className="section-tag">Contact</span>
            <h1 className="section-title mt-2 mb-4">Let's Build Something Together</h1>
            <p className="text-text-secondary max-w-xl mx-auto text-lg">
              I'm always open to new opportunities, collaborations, or just a friendly chat. Reach out — I typically respond within 24 hours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-3"
            >
              <div className="card p-8">
                <h2 className="font-display font-bold text-xl text-text-primary mb-6">Send Me a Message</h2>

                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle2 size={56} className="text-accent-emerald mx-auto mb-4" />
                    <h3 className="font-display font-bold text-xl text-text-primary mb-2">Message Sent!</h3>
                    <p className="text-text-secondary mb-6">Thanks for reaching out. I'll get back to you soon.</p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="btn-outline"
                    >
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          Your Name <span className="text-accent-rose">*</span>
                        </label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className={`input-field ${errors.name ? 'border-accent-rose/60' : ''}`}
                        />
                        {errors.name && <p className="text-accent-rose text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-secondary mb-2">
                          Email Address <span className="text-accent-rose">*</span>
                        </label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className={`input-field ${errors.email ? 'border-accent-rose/60' : ''}`}
                        />
                        {errors.email && <p className="text-accent-rose text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Subject <span className="text-accent-rose">*</span>
                      </label>
                      <input
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="Job Opportunity / Project Collaboration / Just saying hi!"
                        className={`input-field ${errors.subject ? 'border-accent-rose/60' : ''}`}
                      />
                      {errors.subject && <p className="text-accent-rose text-xs mt-1">{errors.subject}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Message <span className="text-accent-rose">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={6}
                        placeholder="Tell me about your project, opportunity, or just say hello!"
                        className={`input-field resize-none ${errors.message ? 'border-accent-rose/60' : ''}`}
                      />
                      <div className="flex justify-between mt-1">
                        {errors.message ? (
                          <p className="text-accent-rose text-xs">{errors.message}</p>
                        ) : (
                          <span />
                        )}
                        <p className="text-text-muted text-xs">{form.message.length} chars</p>
                      </div>
                    </div>

                    {status === 'error' && (
                      <p className="text-accent-rose text-sm">Something went wrong. Please email me directly.</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'sending' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-bg-primary/40 border-t-bg-primary rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} /> Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Right sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-5"
            >
              {/* Contact Info */}
              <div className="card p-6">
                <h3 className="font-display font-bold text-lg text-text-primary mb-5">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo.map(({ icon: Icon, label, value, sub, href, color }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                      >
                        <Icon size={16} style={{ color }} />
                      </div>
                      <div>
                        <p className="text-xs text-text-muted font-mono mb-0.5">{label}</p>
                        {href ? (
                          <a href={href} className="text-sm text-text-primary hover:text-accent-cyan transition-colors font-medium">
                            {value}
                          </a>
                        ) : (
                          <p className="text-sm text-text-primary font-medium">{value}</p>
                        )}
                        <p className="text-xs text-text-muted mt-0.5">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Socials */}
              <div className="card p-6">
                <h3 className="font-display font-bold text-lg text-text-primary mb-4">Connect With Me</h3>
                <div className="space-y-3">
                  {socials.map(({ icon: Icon, label, href, username }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 p-3 rounded-xl border border-surface-border hover:border-accent-cyan/40 hover:bg-surface/50 transition-all group"
                    >
                      <Icon size={18} className="text-text-secondary group-hover:text-accent-cyan transition-colors" />
                      <div>
                        <p className="text-sm font-medium text-text-primary">{label}</p>
                        <p className="text-xs text-text-muted font-mono">{username}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability banner */}
              <div className="card p-5 border border-accent-emerald/20 bg-gradient-to-br from-accent-emerald/5 to-transparent">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
                  <span className="text-accent-emerald font-semibold text-sm">Available for hire</span>
                </div>
                <p className="text-text-secondary text-sm">
                  Currently looking for <strong className="text-text-primary">SDE, MLE,</strong> and <strong className="text-text-primary">Data Science</strong> roles. Open to full-time and internship opportunities.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}