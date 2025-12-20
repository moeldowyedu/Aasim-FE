import { Card } from '../common';
import { clsx } from 'clsx';
import { useTheme } from '../../contexts/ThemeContext';

const StatCard = ({ title, value, icon, trend, trendValue, color = 'primary' }) => {
  const { theme } = useTheme();

  const colorClasses = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    pink: 'bg-pink-500',
  };

  return (
    <Card padding="md" hover>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={clsx(
            'text-sm font-medium mb-1',
            theme === 'dark' ? 'text-gray-400' : 'text-slate-500'
          )}>{title}</p>
          <p className={clsx(
            'text-3xl font-heading font-bold',
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          )}>{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={clsx(
                  'text-sm font-medium',
                  trend === 'up'
                    ? (theme === 'dark' ? 'text-green-400' : 'text-green-600')
                    : (theme === 'dark' ? 'text-red-400' : 'text-red-600')
                )}
              >
                {trend === 'up' ? '↑' : '↓'} {trendValue}
              </span>
              <span className={clsx('text-xs', theme === 'dark' ? 'text-gray-500' : 'text-slate-400')}>vs last month</span>
            </div>
          )}
        </div>
        {icon && (
          <div
            className={clsx(
              'p-3 rounded-lg text-white shadow-lg',
              colorClasses[color]
            )}
          >
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
