import { Spinner } from './Loader'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
    ghost: 'text-slate-400 hover:text-slate-100 hover:bg-white/5 px-3 py-2 rounded-lg transition-all duration-200',
  }
  const sizes = { sm: 'text-xs px-3 py-1.5', md: '', lg: 'text-base px-6 py-3' }

  return (
    <button
      className={`${variants[variant]} ${sizes[size]} ${className} ${loading || disabled ? 'opacity-60 cursor-not-allowed' : ''} justify-center`}
      disabled={loading || disabled}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  )
}
