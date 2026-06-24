import { useState } from 'react'
import { aiService } from '../services/aiService'

export function useAI() {
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const run = async (fn) => {
    setLoading(true); setError(null)
    try { return await fn() }
    catch(e) { setError(e.response?.data?.message || 'AI request failed'); throw e }
    finally { setLoading(false) }
  }

  return {
    loading, error,
    summarize:      (id)     => run(() => aiService.summarize(id)),
    extractMemory:  (id)     => run(() => aiService.extractMemory(id)),
    semanticSearch: (q)      => run(() => aiService.semanticSearch(q)),
    askQuestion:    (q, ids) => run(() => aiService.askQuestion(q, ids)),
  }
}
