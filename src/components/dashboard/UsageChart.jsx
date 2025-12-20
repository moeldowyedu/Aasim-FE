import { Card } from '../common';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../contexts/ThemeContext';

const UsageChart = ({ data = [] }) => {
  const { theme } = useTheme();

  // Mock data if empty
  const mockData = data.length > 0 ? data : [
    { date: 'Jan 1', runs: 45 },
    { date: 'Jan 8', runs: 52 },
    { date: 'Jan 15', runs: 68 },
    { date: 'Jan 22', runs: 71 },
    { date: 'Jan 29', runs: 58 },
    { date: 'Feb 5', runs: 89 },
    { date: 'Feb 12', runs: 95 },
  ];

  return (
    <Card padding="md">
      <div className="mb-4">
        <h3 className={`text-lg font-heading font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          Usage This Month
        </h3>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Agent executions over time</p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
            <XAxis
              dataKey="date"
              stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'}
              style={{ fontSize: '12px' }}
            />
            <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: theme === 'dark' ? '#1f2937' : '#fff',
                borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                color: theme === 'dark' ? '#fff' : '#000'
              }}
              itemStyle={{
                color: theme === 'dark' ? '#e5e7eb' : '#374151'
              }}
            />
            <Line
              type="monotone"
              dataKey="runs"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default UsageChart;
