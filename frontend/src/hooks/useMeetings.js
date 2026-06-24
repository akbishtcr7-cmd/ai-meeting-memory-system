import { useSelector, useDispatch } from 'react-redux'
import { fetchMeetings, fetchMeeting, createMeeting, updateMeeting, deleteMeeting } from '../store/slices/meetingSlice'

export const useMeetings = () => {
  const dispatch = useDispatch()
  const { meetings, currentMeeting, pagination, isLoading, error } = useSelector((state) => state.meetings)

  return {
    meetings,
    currentMeeting,
    pagination,
    isLoading,
    error,
    fetchMeetings: (params) => dispatch(fetchMeetings(params)),
    fetchMeeting: (id) => dispatch(fetchMeeting(id)),
    createMeeting: (data) => dispatch(createMeeting(data)),
    updateMeeting: (id, data) => dispatch(updateMeeting({ id, data })),
    deleteMeeting: (id) => dispatch(deleteMeeting(id)),
  }
}
