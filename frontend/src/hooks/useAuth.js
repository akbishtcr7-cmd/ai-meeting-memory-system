import { useSelector, useDispatch } from 'react-redux'
import { login, register, logout, clearError } from '../store/slices/authSlice'

export const useAuth = () => {
  const dispatch = useDispatch()
  const { user, isLoading, error } = useSelector((state) => state.auth)

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login: (credentials) => dispatch(login(credentials)),
    register: (userData) => dispatch(register(userData)),
    logout: () => dispatch(logout()),
    clearError: () => dispatch(clearError()),
  }
}
