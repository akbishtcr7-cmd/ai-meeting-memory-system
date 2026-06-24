import Meeting from '../models/Meeting.js'

export const getMeetingsByUser = async (userId, options = {}) => {
  const { page = 1, limit = 10, status, sort = { date: -1 } } = options
  const query = { createdBy: userId }
  if (status) query.status = status
  return Meeting.find(query).sort(sort).skip((page - 1) * limit).limit(limit)
}

export const getMeetingStats = async (userId) => {
  const total = await Meeting.countDocuments({ createdBy: userId })
  const withSummary = await Meeting.countDocuments({ createdBy: userId, 'summary.overview': { $exists: true } })
  const thisMonth = await Meeting.countDocuments({
    createdBy: userId,
    date: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) },
  })
  return { total, withSummary, thisMonth }
}
