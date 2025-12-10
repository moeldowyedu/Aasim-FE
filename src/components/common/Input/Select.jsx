import { clsx } from 'clsx';
import { forwardRef } from 'react';

const Select = forwardRef(({
  label,
  error,
  helperText,
  options = [],
  placeholder = 'Select an option',
  fullWidth = false,
  theme = 'light',
  className = '',
  containerClassName = '',
  ...props
}, ref) => {
  const styles = {
    light: {
      label: 'text-secondary-700',
      select: 'bg-white text-secondary-900 border-gray-300 focus:ring-primary-500 focus:border-transparent',
      borderError: 'border-red-500',
    },
    dark: {
      label: 'text-gray-300',
      select: 'bg-white/5 text-gray-200 border-white/10 focus:ring-primary-500/20 focus:border-primary-500',
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

      <select
        ref={ref}
        className={clsx(
          'w-full px-4 py-2 border rounded-lg',
          'focus:outline-none focus:ring-2',
          'transition-all duration-200',
          currentTheme.select,
          error ? currentTheme.borderError : '',
          props.disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={typeof option === 'object' ? option.value : option}
            value={typeof option === 'object' ? option.value : option}
            className="text-secondary-900 bg-white" // Force light options for readability even in dark mode for now, or match theme
          >
            {typeof option === 'object' ? option.label : option}
          </option>
        ))}
      </select>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
