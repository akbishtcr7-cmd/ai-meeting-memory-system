import { FiCpu, FiSearch } from 'react-icons/fi'
import AIChat from '../components/ai/AIChat'
import MemorySearch from '../components/ai/MemorySearch'

export default function AIAssistant() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100">AI Assistant</h1>
        <p className="text-slate-500 text-sm mt-0.5">Ask questions about your meetings or search your memory</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
            <FiSearch size={15} className="text-brand-400" /> Semantic Memory Search
          </div>
          <MemorySearch />
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
            <FiCpu size={15} className="text-brand-400" /> Global AI Chat
          </div>
          <AIChat />
        </div>
      </div>
    </div>
  )
}
