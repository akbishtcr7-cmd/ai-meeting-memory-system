import Meeting from '../models/Meeting.js'
import { sendSuccess, sendError } from '../utils/sendResponse.js'

export const getMeetings = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query
    const query = { createdBy: req.user._id }
    if (status) query.status = status
    if (search) query.$text = { $search: search }

    const [meetings, total] = await Promise.all([
      Meeting.find(query)
        .sort({ date: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .lean(),
      Meeting.countDocuments(query),
    ])

    return sendSuccess(res, {
      meetings,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (err) {
    return sendError(res, err.message, 500)
  }
}

export const getMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findOne({ _id: req.params.id, createdBy: req.user._id })
    if (!meeting) return sendError(res, 'Meeting not found', 404)
    return sendSuccess(res, meeting)
  } catch (err) {
    return sendError(res, err.message, 500)
  }
}

export const createMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.create({ ...req.body, createdBy: req.user._id })
    return sendSuccess(res, meeting, 'Meeting created', 201)
  } catch (err) {
    return sendError(res, err.message, 400)
  }
}

export const updateMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true, runValidators: true }
    )
    if (!meeting) return sendError(res, 'Meeting not found', 404)
    return sendSuccess(res, meeting, 'Meeting updated')
  } catch (err) {
    return sendError(res, err.message, 400)
  }
}

export const deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findOneAndDelete({ _id: req.params.id, createdBy: req.user._id })
    if (!meeting) return sendError(res, 'Meeting not found', 404)
    return sendSuccess(res, null, 'Meeting deleted')
  } catch (err) {
    return sendError(res, err.message, 500)
  }
}

export const searchMeetings = async (req, res) => {
  try {
    const { q, date, participants } = req.query
    const query = { createdBy: req.user._id }
    if (q) query.$text = { $search: q }
    if (date) query.date = { $gte: new Date(date) }
    if (participants) query.participants = { $in: participants.split(',') }

    const meetings = await Meeting.find(query).sort({ date: -1 }).limit(20).lean()
    return sendSuccess(res, meetings)
  } catch (err) {
    return sendError(res, err.message, 500)
  }
}

export const toggleActionItem = async (req, res) => {
  try {
    const meeting = await Meeting.findOne({ _id: req.params.id, createdBy: req.user._id })
    if (!meeting) return sendError(res, 'Meeting not found', 404)

    const item = meeting.actionItems.id(req.params.itemId)
    if (!item) return sendError(res, 'Action item not found', 404)

    item.completed = !item.completed
    item.completedAt = item.completed ? new Date() : undefined
    await meeting.save()
    return sendSuccess(res, meeting, 'Action item updated')
  } catch (err) {
    return sendError(res, err.message, 500)
  }
}
