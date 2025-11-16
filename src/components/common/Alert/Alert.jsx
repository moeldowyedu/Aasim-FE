import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const Alert = ({
  variant = 'info',
  title,
  children,
  onClose,
  className = '',
}) => {
  const variants = {
    success: {
      container: 'bg-green-50 border-green-200',
      icon: 'text-green-500',
      title: 'text-green-800',
      text: 'text-green-700',
      IconComponent: CheckCircle,
    },
    error: {
      container: 'bg-red-50 border-red-200',
      icon: 'text-red-500',
      title: 'text-red-800',
      text: 'text-red-700',
      IconComponent: AlertCircle,
    },
    warning: {
      container: 'bg-yellow-50 border-yellow-200',
      icon: 'text-yellow-500',
      title: 'text-yellow-800',
      text: 'text-yellow-700',
      IconComponent: AlertTriangle,
    },
    info: {
      container: 'bg-blue-50 border-blue-200',
      icon: 'text-blue-500',
      title: 'text-blue-800',
      text: 'text-blue-700',
      IconComponent: Info,
    },
  };

  const config = variants[variant];
  const Icon = config.IconComponent;

  return (
    <div
      className={`flex items-start gap-3 p-4 border rounded-lg ${config.container} ${className}`}
      role="alert"
    >
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${config.icon}`} />
      <div className="flex-1">
        {title && (
          <h4 className={`font-semibold mb-1 ${config.title}`}>{title}</h4>
        )}
        <div className={`text-sm ${config.text}`}>{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={`flex-shrink-0 ${config.icon} hover:opacity-70 transition-opacity`}
          aria-label="Close alert"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Alert;
