import { clsx } from 'clsx';
import { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  theme = 'light', // 'light' | 'dark'
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const styles = {
    light: {
      label: 'text-secondary-700',
      input: 'bg-white text-secondary-900 border-gray-300 placeholder-gray-400 focus:ring-primary-500/20 focus:border-primary-500',
      borderDefault: 'border-gray-300 hover:border-gray-400',
      borderError: 'border-red-500 hover:border-red-500',
      icon: 'text-gray-400'
    },
    dark: {
      label: 'text-gray-300',
      input: 'bg-white/5 text-gray-200 border-white/10 placeholder-gray-500 focus:ring-primary-500/20 focus:border-primary-500',
      borderDefault: 'border-white/10 hover:border-white/20',
      borderError: 'border-red-500/50 hover:border-red-500',
      icon: 'text-gray-400'
    }
  };

  const currentTheme = styles[theme] || styles.light;

  return (
    <div className={clsx('flex flex-col gap-1.5', fullWidth && 'w-full', containerClassName)}>
      {label && (
        <label className={`text-sm font-medium ml-1 ${currentTheme.label}`}>
          {label}
          {props.required && <span className="text-primary-400 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${currentTheme.icon}`}>
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          className={clsx(
            'w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none',
            currentTheme.input,
            error ? currentTheme.borderError : currentTheme.borderDefault,
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            props.disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
          {...props}
        />

        {rightIcon && (
          <div className={`absolute right-3 top-1/2 -translate-y-1/2 ${currentTheme.icon}`}>
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
