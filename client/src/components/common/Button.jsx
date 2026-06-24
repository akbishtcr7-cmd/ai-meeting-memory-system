import Loader from './Loader'

export default function Button({ children, variant = 'primary', loading, className = '', ...props }) {
  const variants = {
    primary:   'btn-primary',
    secondary: 'btn-secondary',
    ghost:     'btn-ghost',
    danger:    'bg-red-600 hover:bg-red-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 disabled:opacity-50',
  }
  return (
    <button className={`${variants[variant]} ${className}`} disabled={loading || props.disabled} {...props}>
      {loading ? <Loader size="sm" /> : children}
    </button>
  )
}
