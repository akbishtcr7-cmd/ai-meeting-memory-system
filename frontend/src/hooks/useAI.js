import { useState } from 'react'
import aiService from '../services/aiService'
import toast from 'react-hot-toast'

export const useAI = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [summary, setSummary] = useState(null)
  const [actionItems, setActionItems] = useState([])
  const [memories, setMemories] = useState([])

  const generateSummary = async (meetingId) => {
    setIsLoading(true)
    try {
      const data = await aiService.generateSummary(meetingId)
      setSummary(data)
      toast.success('Summary generated!')
      return data
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to generate summary')
    } finally {
      setIsLoading(false)
    }
  }

  const extractActionItems = async (meetingId) => {
    setIsLoading(true)
    try {
      const data = await aiService.extractActionItems(meetingId)
      setActionItems(data)
      return data
    } catch (err) {
      toast.error('Failed to extract action items')
    } finally {
      setIsLoading(false)
    }
  }

  const askQuestion = async (question, meetingId) => {
    setIsLoading(true)
    try {
      const data = await aiService.askQuestion(question, meetingId)
      return data
    } catch (err) {
      toast.error('Failed to get AI response')
    } finally {
      setIsLoading(false)
    }
  }

  const semanticSearch = async (query) => {
    setIsLoading(true)
    try {
      const data = await aiService.semanticSearch(query)
      return data
    } catch (err) {
      toast.error('Search failed')
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, summary, actionItems, memories, generateSummary, extractActionItems, askQuestion, semanticSearch }
}
