import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const socials = [
  { icon: FaGithub,    href: 'https://github.com/yourusername',              label: 'GitHub' },
  { icon: FaLinkedin,  href: 'https://linkedin.com/in/yourusername',         label: 'LinkedIn' },
  { icon: FaInstagram, href: 'https://instagram.com/yourusername',           label: 'Instagram' },
]

export default function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-dark-700 py-12 px-6 mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-white font-bold text-lg mb-2">MeetMind</h3>
          <p className="text-gray-400 text-sm leading-relaxed">AI-powered meeting memory system. Never forget what was decided again.</p>
          <div className="flex gap-3 mt-4">
            {socials.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="h-9 w-9 rounded-lg bg-dark-700 hover:bg-accent-600 flex items-center justify-center text-gray-400 hover:text-white transition-all" aria-label={label}>
                <Icon />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {[['Dashboard', '/dashboard'], ['Meetings', '/meetings'], ['AI Assistant', '/ai-assistant'], ['Profile', '/profile']].map(([label, path]) => (
              <li key={path}><Link to={path} className="text-gray-400 hover:text-white text-sm transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <div className="space-y-3">
            <a href="mailto:your@email.com" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
              <HiOutlineMail className="flex-shrink-0" /> your@email.com
            </a>
            <a href="tel:+919999999999" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
              <HiOutlinePhone className="flex-shrink-0" /> +91 99999 99999
            </a>
          </div>
          <p className="text-gray-500 text-xs mt-6">Built by <span className="text-accent-400">Your Name</span></p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-dark-700 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-gray-500 text-xs">© {new Date().getFullYear()} MeetMind. All rights reserved.</p>
        <p className="text-gray-600 text-xs">Made with ♥ in India</p>
      </div>
    </footer>
  )
}
