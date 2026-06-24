import mongoose from 'mongoose'

const memorySchema = new mongoose.Schema(
  {
    meeting: { type: mongoose.Schema.Types.ObjectId, ref: 'Meeting', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    type: {
      type: String,
      enum: ['summary', 'decision', 'action_item', 'insight', 'question'],
      default: 'insight',
    },
    embedding: [Number], // for future vector search support
    metadata: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
)

memorySchema.index({ user: 1, meeting: 1 })

export default mongoose.model('Memory', memorySchema)
