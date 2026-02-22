import { Link } from 'react-router-dom'
import { Github, Linkedin, BookOpen, Mail, Terminal } from 'lucide-react'
import { personal } from '../data/personal.js'
import { SiLeetcode } from "react-icons/si"

export default function Footer() {
  return (
    <footer className="border-t border-surface-border/40 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-cyan to-accent-violet flex items-center justify-center">
                <Terminal size={16} className="text-bg-primary" />
              </div>
              <span className="font-display font-bold text-lg">
                Dhruv<span className="text-accent-cyan"> Mehta</span>
              </span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed mb-5">
              Building intelligent systems at the intersection of software and machine learning.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Github, href: personal.social.github, label: 'GitHub' },
                { icon: Linkedin, href: personal.social.linkedin, label: 'LinkedIn' },
                { icon: SiLeetcode, href: personal.social.leetcode, label: 'LeetCode'},
                { icon: BookOpen, href: personal.social.googleScholar, label: 'GoogleScholar' },
                { icon: Mail, href: `mailto:${personal.email}`, label: 'Email' }
                
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-surface border border-surface-border flex items-center justify-center text-text-secondary hover:text-accent-cyan hover:border-accent-cyan/40 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display font-semibold text-sm text-text-primary mb-4 tracking-wide">Navigation</h4>
            <ul className="space-y-2">
              {['/', '/skills', '/projects', '/research', '/experience', '/resume', '/contact'].map((path) => {
                const label = path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)
                return (
                  <li key={path}>
                    <Link to={path} className="text-sm text-text-secondary hover:text-accent-cyan transition-colors">
                      {label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-sm text-text-primary mb-4 tracking-wide">Get In Touch</h4>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-text-muted mb-1">Personal</p>
                <a href={`mailto:${personal.email}`} className="text-sm text-accent-cyan hover:underline">
                  {personal.email}
                </a>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1">University</p>
                <a href={`mailto:${personal.universityEmail}`} className="text-sm text-accent-cyan hover:underline">
                  {personal.universityEmail}
                </a>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1">Location</p>
                <p className="text-sm text-text-secondary">{personal.location}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-surface-border/30 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} Dhruv Mehta. Built with React, Vite & Tailwind CSS.
          </p>
          <p className="text-xs text-text-muted">
            Deployed on <span className="text-accent-cyan">Vercel</span>
          </p>
        </div>
      </div>
    </footer>
  )
}