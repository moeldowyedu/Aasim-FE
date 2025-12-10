import { clsx } from 'clsx';
import { forwardRef } from 'react';

const Textarea = forwardRef(({
  label,
  error,
  helperText,
  rows = 4,
  fullWidth = false,
  theme = 'light',
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const styles = {
    light: {
      label: 'text-secondary-700',
      input: 'bg-white text-secondary-900 border-gray-300 focus:ring-primary-500 focus:border-transparent',
      borderError: 'border-red-500',
    },
    dark: {
      label: 'text-gray-300',
      input: 'bg-white/5 text-gray-200 border-white/10 focus:ring-primary-500/20 focus:border-primary-500',
      borderError: 'border-red-500/50',
    }
  };

  const currentTheme = styles[theme] || styles.light;

  return (
    <div className={clsx('flex flex-col gap-1.5', fullWidth && 'w-full', containerClassName)}>
      {label && (
        <label className={`text-sm font-medium ${currentTheme.label}`}>
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <textarea
        ref={ref}
        rows={rows}
        className={clsx(
          'w-full px-4 py-2 border rounded-lg',
          'focus:outline-none focus:ring-2',
          'transition-all duration-200 resize-none',
          currentTheme.input,
          error ? currentTheme.borderError : '',
          props.disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        {...props}
      />

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
