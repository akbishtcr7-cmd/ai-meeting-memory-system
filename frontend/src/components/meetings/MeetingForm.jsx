import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import Button from '../common/Button'

const STATUS_OPTIONS = ['scheduled', 'in_progress', 'completed', 'cancelled']

export default function MeetingForm({ onSubmit, initialData, isLoading }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        date: initialData.date ? new Date(initialData.date).toISOString().slice(0, 16) : '',
        participants: initialData.participants?.join(', ') || '',
      })
    }
  }, [initialData, reset])

  const handleFormSubmit = (data) => {
    onSubmit({
      ...data,
      participants: data.participants ? data.participants.split(',').map(p => p.trim()).filter(Boolean) : [],
    })
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label className="label">Title *</label>
        <input
          {...register('title', { required: 'Title is required' })}
          placeholder="Q4 Planning Meeting"
          className={`input-field ${errors.title ? 'border-red-500/50' : ''}`}
        />
        {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="label">Description</label>
        <textarea
          {...register('description')}
          rows={3}
          placeholder="What is this meeting about?"
          className="input-field resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Date & Time *</label>
          <input
            {...register('date', { required: 'Date is required' })}
            type="datetime-local"
            className={`input-field ${errors.date ? 'border-red-500/50' : ''}`}
          />
          {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date.message}</p>}
        </div>
        <div>
          <label className="label">Status</label>
          <select {...register('status')} className="input-field">
            {STATUS_OPTIONS.map(s => (
              <option key={s} value={s} className="bg-dark-800">
                {s.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="label">Participants (comma-separated emails)</label>
        <input
          {...register('participants')}
          placeholder="alice@company.com, bob@company.com"
          className="input-field"
        />
      </div>

      <div>
        <label className="label">Meeting Notes / Transcript</label>
        <textarea
          {...register('transcript')}
          rows={5}
          placeholder="Paste transcript or notes here for AI analysis…"
          className="input-field resize-none font-mono text-sm"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" loading={isLoading} className="flex-1 justify-center">
          {initialData ? 'Save changes' : 'Create meeting'}
        </Button>
      </div>
    </form>
  )
}
