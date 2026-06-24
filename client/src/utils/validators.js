export const emailRule    = { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' } }
export const passwordRule = { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } }
export const requiredRule = (label) => ({ required: `${label} is required` })
export const nameRule     = { required: 'Name is required', minLength: { value: 2, message: 'Name must be at least 2 characters' } }
