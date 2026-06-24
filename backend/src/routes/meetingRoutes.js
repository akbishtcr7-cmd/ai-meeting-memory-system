import express from 'express'
import {
  getMeetings, getMeeting, createMeeting,
  updateMeeting, deleteMeeting, searchMeetings, toggleActionItem
} from '../controllers/meetingController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.use(protect)

router.get('/search', searchMeetings)
router.route('/').get(getMeetings).post(createMeeting)
router.route('/:id').get(getMeeting).put(updateMeeting).delete(deleteMeeting)
router.patch('/:id/action-items/:itemId/toggle', toggleActionItem)

export default router
