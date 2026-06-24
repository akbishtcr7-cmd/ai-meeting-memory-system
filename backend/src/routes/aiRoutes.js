import express from 'express'
import {
  summarizeMeeting, extractActionItems,
  askQuestion, semanticSearch, getMemories
} from '../controllers/aiController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect)

router.post('/summarize/:meetingId', summarizeMeeting)
router.post('/action-items/:meetingId', extractActionItems)
router.post('/ask', askQuestion)
router.post('/semantic-search', semanticSearch)
router.get('/memories/:meetingId', getMemories)

export default router
