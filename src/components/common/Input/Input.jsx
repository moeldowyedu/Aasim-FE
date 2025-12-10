import { clsx } from 'clsx';
import { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  return (
    <div className={clsx('flex flex-col gap-1.5', fullWidth && 'w-full', containerClassName)}>
      {label && (
        <label className="text-sm font-medium text-gray-300 ml-1">
          {label}
          {props.required && <span className="text-primary-400 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          className={clsx(
            'w-full px-4 py-3 rounded-xl border transition-all duration-200',
            'bg-white/5 text-gray-200 placeholder-gray-500',
            'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
            error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 hover:border-white/20',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            props.disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
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
