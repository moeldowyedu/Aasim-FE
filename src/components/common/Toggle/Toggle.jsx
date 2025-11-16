const Toggle = ({
  checked = false,
  onChange,
  disabled = false,
  size = 'md',
  label,
  helperText,
  className = '',
}) => {
  const sizes = {
    sm: {
      track: 'w-8 h-4',
      thumb: 'w-3 h-3',
      translate: 'translate-x-4',
    },
    md: {
      track: 'w-11 h-6',
      thumb: 'w-5 h-5',
      translate: 'translate-x-5',
    },
    lg: {
      track: 'w-14 h-7',
      thumb: 'w-6 h-6',
      translate: 'translate-x-7',
    },
  };

  const config = sizes[size];

  return (
    <div className={className}>
      <label className="flex items-center gap-3 cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange && onChange(e.target.checked)}
            disabled={disabled}
            className="sr-only"
          />
          <div
            className={`${config.track} ${
              checked ? 'bg-primary-600' : 'bg-gray-300'
            } rounded-full transition-colors ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <div
              className={`${config.thumb} bg-white rounded-full shadow-md transform transition-transform ${
                checked ? config.translate : 'translate-x-0.5'
              } mt-0.5`}
            />
          </div>
        </div>
        {label && (
          <div className="flex-1">
            <span
              className={`text-sm font-medium ${
                disabled ? 'text-gray-400' : 'text-gray-900'
              }`}
            >
              {label}
            </span>
            {helperText && (
              <p className="text-xs text-gray-500 mt-0.5">{helperText}</p>
            )}
          </div>
        )}
      </label>
    </div>
  );
};

export default Toggle;
