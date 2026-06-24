import { createSlice } from '@reduxjs/toolkit'

const themeSlice = createSlice({
  name: 'theme',
  initialState: { mode: 'dark' },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark'
      document.documentElement.classList.toggle('dark', state.mode === 'dark')
    },
  },
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer
