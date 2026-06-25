import { getGeminiModel } from '../config/gemini.js'
import logger from '../utils/logger.js'

const FALLBACK_MODELS = (process.env.GEMINI_FALLBACK_MODELS || 'gemini-2.5-flash-lite')
  .split(',')
  .map(model => model.trim())
  .filter(Boolean)

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const isTransientGeminiError = (err) => {
  const message = err?.message || ''
  return message.includes('[429') || message.includes('[500') || message.includes('[503')
}

const getModelCandidates = () => {
  const primary = process.env.GEMINI_MODEL || 'gemini-2.5-flash'
  return [...new Set([primary, ...FALLBACK_MODELS])]
}

const generateContent = async (prompt) => {
  let lastError

  for (const modelName of getModelCandidates()) {
    const model = getGeminiModel(modelName)

    for (let attempt = 1; attempt <= 2; attempt += 1) {
      try {
        return await model.generateContent(prompt)
      } catch (err) {
        lastError = err

        if (!isTransientGeminiError(err)) throw err

        logger.warn(`Gemini model ${modelName} failed with a transient error on attempt ${attempt}: ${err.message}`)
        if (attempt < 2) await sleep(600 * attempt)
      }
    }
  }

  throw lastError
}

export const generateMeetingSummary = async (meeting) => {
  const prompt = `
You are an expert meeting analyst. Analyze the following meeting and provide a structured summary.

Meeting Title: ${meeting.title}
Date: ${meeting.date}
Participants: ${meeting.participants?.join(', ') || 'Not specified'}
Description: ${meeting.description || 'None'}
Transcript/Notes:
${meeting.transcript || 'No transcript available'}

Provide your response as valid JSON with this exact structure:
{
  "overview": "2-3 sentence high-level summary of the meeting",
  "keyPoints": ["key point 1", "key point 2", "key point 3"],
  "decisions": ["decision 1", "decision 2"],
  "nextSteps": ["next step 1", "next step 2"]
}
Only respond with the JSON object, no markdown, no extra text.`

  try {
    const result = await generateContent(prompt)
    const text = result.response.text().trim()
    const clean = text.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
  } catch (err) {
    logger.error('Gemini summary error:', err)
    throw new Error('Failed to generate summary')
  }
}

export const extractActionItems = async (meeting) => {
  const prompt = `
Extract all action items from the following meeting.

Meeting Title: ${meeting.title}
Transcript/Notes:
${meeting.transcript || meeting.description || 'No content available'}

Return ONLY a JSON array of action items:
[
  {
    "task": "description of the task",
    "assignee": "person responsible (or null if unspecified)",
    "dueDate": "ISO date string (or null if unspecified)"
  }
]
Only respond with the JSON array.`

  try {
    const result = await generateContent(prompt)
    const text = result.response.text().trim()
    const clean = text.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
  } catch (err) {
    logger.error('Gemini action items error:', err)
    throw new Error('Failed to extract action items')
  }
}

export const answerQuestion = async (question, meetingsContext) => {
  const context = meetingsContext
    .map(m => `Meeting: ${m.title} (${new Date(m.date).toLocaleDateString()})\n${m.summary?.overview || m.description || m.transcript?.slice(0, 500) || ''}`)
    .join('\n\n---\n\n')

  const prompt = `
You are an AI assistant with access to a user's meeting history. Answer the question based on the context.

Meeting Context:
${context || 'No meetings available'}

Question: ${question}

Provide a helpful, concise answer based only on the meeting context. If information is not available, say so.`

  try {
    const result = await generateContent(prompt)
    return result.response.text().trim()
  } catch (err) {
    logger.error('Gemini Q&A error:', err)
    throw new Error('Failed to answer question')
  }
}

export const semanticSearch = async (query, meetings) => {
  const prompt = `
Given the following search query and list of meetings, rank the meetings by relevance and explain why each is relevant.

Query: "${query}"

Meetings:
${meetings.map((m, i) => `${i}. ID:${m._id} | Title: ${m.title} | Date: ${new Date(m.date).toLocaleDateString()} | Summary: ${m.summary?.overview || m.description || 'No summary'}`).join('\n')}

Return ONLY a JSON array of the most relevant meetings (max 5):
[
  {
    "id": "meeting id",
    "score": 0.95,
    "relevantExcerpt": "why this meeting is relevant"
  }
]`

  try {
    const result = await generateContent(prompt)
    const text = result.response.text().trim()
    const clean = text.replace(/```json|```/g, '').trim()
    const ranked = JSON.parse(clean)
    return ranked
      .map(r => {
        const meeting = meetings.find(m => m._id.toString() === r.id)
        return meeting ? { ...meeting.toObject?.() ?? meeting, score: r.score, relevantExcerpt: r.relevantExcerpt } : null
      })
      .filter(Boolean)
  } catch (err) {
    logger.error('Gemini semantic search error:', err)
    throw new Error('Semantic search failed')
  }
}
