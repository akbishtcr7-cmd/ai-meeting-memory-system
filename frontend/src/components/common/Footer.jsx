import { Link } from 'react-router-dom'
import { FiInstagram, FiLinkedin, FiMail, FiPhone, FiZap } from 'react-icons/fi'

const socialLinks = [
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/abhishek-bisht-149784351', label: 'LinkedIn' },
  { icon: FiInstagram, href: 'https://www.instagram.com/akbisht.7', label: 'Instagram' },
  { icon: FiMail, href: 'mailto:abhishekbisht@email.com', label: 'Email' },
]

const quickLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/meetings', label: 'Meetings' },
  { to: '/ai-assistant', label: 'AI Assistant' },
  { to: '/profile', label: 'Profile' },
]

export default function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
                <FiZap size={15} className="text-white" />
              </div>
              <span className="font-semibold text-slate-100">MeetMind</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              AI-powered meeting memory system. Never lose important decisions, action items, or insights from your meetings again.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 glass-card flex items-center justify-center text-slate-400 hover:text-brand-400 hover:border-brand-500/30 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-4">Contact</h3>
            <div className="space-y-3">
                <a href="https://www.instagram.com/akbisht.7" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-slate-500 hover:text-slate-300 text-sm transition-colors">
                <FiInstagram size={14} /> @akbisht.7
              </a>
              <a href="https://www.linkedin.com/in/abhishek-bisht-149784351" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-slate-500 hover:text-slate-300 text-sm transition-colors">
                <FiLinkedin size={14} /> Abhishek Bisht
              </a>
              <a href="tel:+918077639859" className="flex items-center gap-2.5 text-slate-500 hover:text-slate-300 text-sm transition-colors">
                <FiPhone size={14} /> +91 80776 39859
              </a>
              <p className="text-slate-600 text-xs mt-4">
                Built with ❤️ by <span className="text-slate-400 font-medium">Abhishek Bisht</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-600">
          <p>© {new Date().getFullYear()} MeetMind by Abhishek Bisht. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
