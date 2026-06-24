import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSend, FiCpu, FiUser } from 'react-icons/fi'
import { useAI } from '../../hooks/useAI'
import { Spinner } from '../common/Loader'

export default function AIChat({ meetingId }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I can answer questions about your meetings. What would you like to know?' }
  ])
  const [input, setInput] = useState('')
  const { askQuestion, isLoading } = useAI()
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return
    const question = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: question }])
    const response = await askQuestion(question, meetingId)
    if (response) {
      setMessages(prev => [...prev, { role: 'assistant', content: response.answer || response }])
    }
  }

  return (
    <div className="glass-card flex flex-col h-[500px]">
      <div className="flex items-center gap-2.5 p-4 border-b border-white/5">
        <div className="w-7 h-7 rounded-lg bg-brand-500/20 flex items-center justify-center">
          <FiCpu size={14} className="text-brand-400" />
        </div>
        <span className="font-semibold text-slate-200 text-sm">AI Assistant</span>
        <div className="ml-auto flex items-center gap-1.5 text-xs text-accent-400">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse" />
          Online
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs ${
                msg.role === 'user' ? 'bg-brand-500/30 text-brand-400' : 'bg-white/10 text-slate-400'
              }`}>
                {msg.role === 'user' ? <FiUser size={13} /> : <FiCpu size={13} />}
              </div>
              <div className={`max-w-[75%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-brand-500/20 text-slate-200 rounded-tr-sm'
                  : 'bg-white/5 text-slate-300 rounded-tl-sm'
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
              <FiCpu size={13} className="text-slate-400" />
            </div>
            <div className="bg-white/5 rounded-xl rounded-tl-sm px-4 py-3">
              <Spinner size="sm" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="p-4 border-t border-white/5">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Ask about this meeting…"
            className="input-field text-sm flex-1 py-2"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiSend size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}
