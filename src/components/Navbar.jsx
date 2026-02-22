import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Terminal } from 'lucide-react'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/skills', label: 'Skills' },
  { path: '/projects', label: 'Projects' },
  { path: '/research', label: 'Research' },
  { path: '/experience', label: 'Experience' },
  { path: '/resume', label: 'Resume' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass border-b border-surface-border/50 py-3' : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg overflow-hidden object-[center_5%]">
              <img
                src="/images/dhruv.jpg"
                alt="Dhruv Mehta"
                className="w-full h-full object-cover"
              />
            </div>

            <span className="font-display font-bold text-lg text-text-primary group-hover:text-accent-cyan transition-colors">
              DM<span className="text-accent-cyan">.</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path ||
                (link.path !== '/' && location.pathname.startsWith(link.path))
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-body font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-accent-cyan'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface/30'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-accent-cyan rounded-full"
                    />
                  )}
                </Link>
              )
            })}
          </div>

          {/* CTA */}
          <div className="hidden md:flex">
            <Link to="/contact" className="btn-primary text-xs py-2 px-4">
              Hire Me
            </Link>
          </div>

          {/* Mobile menu btn */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface/30 transition-colors"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 glass border-b border-surface-border/50 md:hidden"
          >
            <div className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-accent-cyan/10 text-accent-cyan'
                        : 'text-text-secondary hover:text-text-primary hover:bg-surface/30'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <Link to="/contact" className="btn-primary mt-2 justify-center text-sm">
                Hire Me
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}