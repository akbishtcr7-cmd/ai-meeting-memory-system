import mongoose from 'mongoose'

const fileSchema = new mongoose.Schema({
  url: String,
  publicId: String,
  originalName: String,
  fileType: String,
  size: Number,
})

const meetingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, trim: true, maxlength: 2000 },
    date: { type: Date, required: true },
    status: {
      type: String,
      enum: ['scheduled', 'in_progress', 'completed', 'cancelled'],
      default: 'scheduled',
    },
    participants: [{ type: String, trim: true }],
    transcript: { type: String, maxlength: 100000 },
    files: [fileSchema],
    summary: {
      overview: String,
      keyPoints: [String],
      decisions: [String],
      generatedAt: Date,
    },
    actionItems: [
      {
        task: { type: String, required: true },
        assignee: String,
        dueDate: Date,
        completed: { type: Boolean, default: false },
        completedAt: Date,
      },
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tags: [String],
  },
  { timestamps: true }
)

// Text index for search
meetingSchema.index({ title: 'text', description: 'text', transcript: 'text' })
meetingSchema.index({ createdBy: 1, date: -1 })
meetingSchema.index({ status: 1 })

export default mongoose.model('Meeting', meetingSchema)
