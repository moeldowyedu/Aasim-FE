import { Card, Badge } from '../common';
import { formatDistanceToNow } from 'date-fns';
import { useTheme } from '../../contexts/ThemeContext';

const RecentActivity = ({ activities = [] }) => {
  const { theme } = useTheme();

  const getStatusColor = (status) => {
    const colors = {
      completed: 'success',
      running: 'info',
      failed: 'danger',
      pending: 'warning',
    };
    return colors[status] || 'default';
  };

  const getStatusIcon = (status) => {
    const icons = {
      completed: '✓',
      running: '⟳',
      failed: '✗',
      pending: '⏱',
    };
    return icons[status] || '•';
  };

  // Mock data if empty
  const mockActivities = activities.length > 0 ? activities : [
    {
      id: 1,
      agentName: 'Document Analyzer',
      action: 'Execution completed',
      status: 'completed',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 min ago
    },
    {
      id: 2,
      agentName: 'Vision Classifier',
      action: 'Running analysis',
      status: 'running',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 min ago
    },
    {
      id: 3,
      agentName: 'Text Summarizer',
      action: 'Execution completed',
      status: 'completed',
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    },
    {
      id: 4,
      agentName: 'Code Reviewer',
      action: 'Awaiting approval',
      status: 'pending',
      timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    },
  ];

  return (
    <Card padding="md">
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-heading font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          Recent Activity
        </h3>
        <a
          href="/history"
          className="text-sm text-primary-600 hover:text-primary-600 font-medium"
        >
          View all →
        </a>
      </div>

      <div className="space-y-3">
        {mockActivities.map((activity) => (
          <div
            key={activity.id}
            className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-slate-50'
              }`}
          >
            <div className="flex-shrink-0 mt-1">
              <Badge variant={getStatusColor(activity.status)} size="sm">
                {getStatusIcon(activity.status)}
              </Badge>
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium truncate ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {activity.agentName}
              </p>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>{activity.action}</p>
              <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>
                {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {mockActivities.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No recent activity</p>
          <p className="text-sm text-gray-400 mt-1">
            Your agent executions will appear here
          </p>
        </div>
      )}
    </Card>
  );
};

export default RecentActivity;
