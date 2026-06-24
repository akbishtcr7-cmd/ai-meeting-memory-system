import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import meetingReducer from './slices/meetingSlice'
import themeReducer from './slices/themeSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    meetings: meetingReducer,
    theme: themeReducer,
  },
})
