import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../../services/authService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user || null,
  isLoading: false,
  error: null,
}

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  try {
    return await authService.login(credentials)
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Login failed')
  }
})

export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    return await authService.register(userData)
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Registration failed')
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }
      localStorage.setItem('user', JSON.stringify(state.user))
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.isLoading = true; state.error = null })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(register.pending, (state) => { state.isLoading = true; state.error = null })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        localStorage.setItem('user', JSON.stringify(action.payload))
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        localStorage.removeItem('user')
      })
  },
})

export const { clearError, updateUser } = authSlice.actions
export default authSlice.reducer
