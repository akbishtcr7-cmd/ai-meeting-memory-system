import Meeting from '../models/Meeting.js'
import SearchHistory from '../models/SearchHistory.js'
import * as geminiService from '../services/geminiService.js'
import { sendSuccess, sendError } from '../utils/sendResponse.js'

export const summarizeMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findOne({ _id: req.params.meetingId, createdBy: req.user._id })
    if (!meeting) return sendError(res, 'Meeting not found', 404)
    if (!meeting.transcript && !meeting.description) {
      return sendError(res, 'Meeting has no transcript or description to summarize', 400)
    }

    const summary = await geminiService.generateMeetingSummary(meeting)
    meeting.summary = { ...summary, generatedAt: new Date() }
    await meeting.save()

    return sendSuccess(res, meeting.summary, 'Summary generated')
  } catch (err) {
    return sendError(res, err.message, 500)
  }
}

export const extractActionItems = async (req, res) => {
  try {
    const meeting = await Meeting.findOne({ _id: req.params.meetingId, createdBy: req.user._id })
    if (!meeting) return sendError(res, 'Meeting not found', 404)

    const items = await geminiService.extractActionItems(meeting)
    meeting.actionItems = items.map(item => ({
      task: item.task,
      assignee: item.assignee || null,
      dueDate: item.dueDate ? new Date(item.dueDate) : null,
      completed: false,
    }))
    await meeting.save()

    return sendSuccess(res, meeting.actionItems, 'Action items extracted')
  } catch (err) {
    return sendError(res, err.message, 500)
  }
}

export const askQuestion = async (req, res) => {
  try {
    const { question, meetingId } = req.body
    if (!question) return sendError(res, 'Question is required', 400)

    let meetings
    if (meetingId) {
      const meeting = await Meeting.findOne({ _id: meetingId, createdBy: req.user._id })
      meetings = meeting ? [meeting] : []
    } else {
      meetings = await Meeting.find({ createdBy: req.user._id }).sort({ date: -1 }).limit(20)
    }

    const answer = await geminiService.answerQuestion(question, meetings)

    // Save to search history
    await SearchHistory.create({
      user: req.user._id,
      query: question,
      type: 'ai_question',
      aiResponse: answer,
    })

    return sendSuccess(res, { answer, question })
  } catch (err) {
    return sendError(res, err.message, 500)
  }
}

export const semanticSearch = async (req, res) => {
  try {
    const { query } = req.body
    if (!query) return sendError(res, 'Query is required', 400)

    const meetings = await Meeting.find({ createdBy: req.user._id }).sort({ date: -1 }).limit(50)
    const results = await geminiService.semanticSearch(query, meetings)

    await SearchHistory.create({
      user: req.user._id,
      query,
      type: 'semantic',
      resultsCount: results.length,
    })

    return sendSuccess(res, results)
  } catch (err) {
    return sendError(res, err.message, 500)
  }
}

export const getMemories = async (req, res) => {
  try {
    const meeting = await Meeting.findOne({ _id: req.params.meetingId, createdBy: req.user._id })
    if (!meeting) return sendError(res, 'Meeting not found', 404)
    const memories = {
      summary: meeting.summary,
      actionItems: meeting.actionItems,
      decisions: meeting.summary?.decisions || [],
    }
    return sendSuccess(res, memories)
  } catch (err) {
    return sendError(res, err.message, 500)
  }
}
