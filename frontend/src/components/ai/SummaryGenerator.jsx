import { useAI } from '../../hooks/useAI'
import Button from '../common/Button'
import SummaryCard from '../meetings/SummaryCard'
import { FiRefreshCw } from 'react-icons/fi'

export default function SummaryGenerator({ meetingId, existingSummary }) {
  const { generateSummary, summary, isLoading } = useAI()
  const displaySummary = summary || existingSummary

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-200 text-sm">Meeting Summary</h3>
        <Button
          size="sm"
          variant="secondary"
          loading={isLoading}
          onClick={() => generateSummary(meetingId)}
        >
          <FiRefreshCw size={13} />
          {displaySummary ? 'Regenerate' : 'Generate'}
        </Button>
      </div>

      {displaySummary ? (
        <SummaryCard summary={displaySummary} />
      ) : (
        <div className="glass-card p-8 text-center">
          <p className="text-slate-600 text-sm">
            No summary yet. Click Generate to create an AI summary of this meeting.
          </p>
        </div>
      )}
    </div>
  )
}
