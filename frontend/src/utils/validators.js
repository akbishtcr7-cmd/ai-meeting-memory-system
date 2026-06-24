export const emailValidator = {
  required: 'Email is required',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Enter a valid email address',
  },
}

export const passwordValidator = {
  required: 'Password is required',
  minLength: { value: 8, message: 'Password must be at least 8 characters' },
}

export const nameValidator = {
  required: 'Name is required',
  minLength: { value: 2, message: 'Name must be at least 2 characters' },
  maxLength: { value: 50, message: 'Name must be under 50 characters' },
}
