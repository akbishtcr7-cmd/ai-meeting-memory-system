import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FiArrowLeft, FiEdit, FiTrash2, FiUpload } from 'react-icons/fi'
import { useMeetings } from '../hooks/useMeetings'
import MeetingDetails from '../components/meetings/MeetingDetails'
import SummaryGenerator from '../components/ai/SummaryGenerator'
import ActionItems from '../components/meetings/ActionItems'
import AIChat from '../components/ai/AIChat'
import Modal from '../components/common/Modal'
import MeetingForm from '../components/meetings/MeetingForm'
import { Spinner } from '../components/common/Loader'
import uploadService from '../services/uploadService'
import toast from 'react-hot-toast'

export default function MeetingDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { currentMeeting, isLoading, fetchMeeting, updateMeeting, deleteMeeting } = useMeetings()
  const [editOpen, setEditOpen] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  useEffect(() => { fetchMeeting(id) }, [id])

  const handleUpdate = async (data) => {
    setUpdating(true)
    await updateMeeting(id, data)
    setUpdating(false)
    setEditOpen(false)
    toast.success('Meeting updated!')
  }

  const handleDelete = async () => {
    if (!confirm('Delete this meeting? This cannot be undone.')) return
    await deleteMeeting(id)
    toast.success('Meeting deleted')
    navigate('/meetings')
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      await uploadService.uploadFile(id, file, setUploadProgress)
      toast.success('File uploaded!')
      fetchMeeting(id)
    } catch {
      toast.error('Upload failed')
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  if (isLoading || !currentMeeting) {
    return <div className="flex justify-center py-20"><Spinner size="lg" /></div>
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Link to="/meetings" className="p-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors mt-0.5">
          <FiArrowLeft size={18} />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-slate-100 truncate">{currentMeeting.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <label className="btn-secondary text-sm cursor-pointer">
            {uploading ? (
              <><Spinner size="sm" /> {uploadProgress}%</>
            ) : (
              <><FiUpload size={14} /> Upload file</>
            )}
            <input type="file" className="hidden" onChange={handleFileUpload} disabled={uploading} />
          </label>
          <button onClick={() => setEditOpen(true)} className="btn-secondary text-sm">
            <FiEdit size={14} /> Edit
          </button>
          <button onClick={handleDelete} className="btn-danger text-sm">
            <FiTrash2 size={14} />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Left: Details + Summary + Actions */}
        <div className="lg:col-span-2 space-y-5">
          <MeetingDetails meeting={currentMeeting} />
          <SummaryGenerator meetingId={id} existingSummary={currentMeeting.summary} />
          <ActionItems items={currentMeeting.actionItems || []} />
        </div>

        {/* Right: AI Chat */}
        <div className="lg:col-span-1">
          <AIChat meetingId={id} />
        </div>
      </div>

      <Modal isOpen={editOpen} onClose={() => setEditOpen(false)} title="Edit Meeting">
        <MeetingForm onSubmit={handleUpdate} initialData={currentMeeting} isLoading={updating} />
      </Modal>
    </div>
  )
}
