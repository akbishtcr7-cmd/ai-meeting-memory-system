import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const DEFAULT_MODEL = 'gemini-1.5-flash'
const MODEL_ALIASES = {
  'gemini-pro': DEFAULT_MODEL,
  'gemini-2.5-flash': DEFAULT_MODEL,
  'gemini-2.5-flash-lite': DEFAULT_MODEL,
  'gemini-3.5-flash': DEFAULT_MODEL,
}

export const resolveGeminiModelName = (modelName = DEFAULT_MODEL) => {
  const normalized = modelName?.trim() || DEFAULT_MODEL
  return MODEL_ALIASES[normalized] || normalized
}

export const getGeminiModel = (modelName = DEFAULT_MODEL) => {
  const resolvedModelName = resolveGeminiModelName(modelName)

  return genAI.getGenerativeModel({
    model: resolvedModelName
  })
}

export default genAI
