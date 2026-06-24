import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import meetingService from '../../services/meetingService'

export const fetchMeetings = createAsyncThunk('meetings/fetchAll', async (params, thunkAPI) => {
  try {
    return await meetingService.getMeetings(params)
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch meetings')
  }
})

export const fetchMeeting = createAsyncThunk('meetings/fetchOne', async (id, thunkAPI) => {
  try {
    return await meetingService.getMeeting(id)
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch meeting')
  }
})

export const createMeeting = createAsyncThunk('meetings/create', async (data, thunkAPI) => {
  try {
    return await meetingService.createMeeting(data)
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create meeting')
  }
})

export const updateMeeting = createAsyncThunk('meetings/update', async ({ id, data }, thunkAPI) => {
  try {
    return await meetingService.updateMeeting(id, data)
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update meeting')
  }
})

export const deleteMeeting = createAsyncThunk('meetings/delete', async (id, thunkAPI) => {
  try {
    await meetingService.deleteMeeting(id)
    return id
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete meeting')
  }
})

const meetingSlice = createSlice({
  name: 'meetings',
  initialState: {
    meetings: [],
    currentMeeting: null,
    pagination: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    clearCurrentMeeting: (state) => { state.currentMeeting = null },
    clearError: (state) => { state.error = null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMeetings.pending, (state) => { state.isLoading = true })
      .addCase(fetchMeetings.fulfilled, (state, action) => {
        state.isLoading = false
        state.meetings = action.payload.meetings
        state.pagination = action.payload.pagination
      })
      .addCase(fetchMeetings.rejected, (state, action) => {
        state.isLoading = false; state.error = action.payload
      })
      .addCase(fetchMeeting.fulfilled, (state, action) => {
        state.currentMeeting = action.payload
      })
      .addCase(createMeeting.fulfilled, (state, action) => {
        state.meetings.unshift(action.payload)
      })
      .addCase(updateMeeting.fulfilled, (state, action) => {
        const idx = state.meetings.findIndex(m => m._id === action.payload._id)
        if (idx !== -1) state.meetings[idx] = action.payload
        if (state.currentMeeting?._id === action.payload._id) state.currentMeeting = action.payload
      })
      .addCase(deleteMeeting.fulfilled, (state, action) => {
        state.meetings = state.meetings.filter(m => m._id !== action.payload)
      })
  },
})

export const { clearCurrentMeeting, clearError } = meetingSlice.actions
export default meetingSlice.reducer
