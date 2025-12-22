import { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Card } from '../../components/common';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations';
import {
  DollarSign, UserPlus, TrendingUp, GitMerge, Download,
  BarChart3, PieChart, LineChart
} from 'lucide-react';

const AnalyticsPage = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [selectedMetric, setSelectedMetric] = useState('submissions');

  // Styles
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-gray-400' : 'text-slate-500';

  const COLORS = {
    green: { bg: 'bg-green-500', text: 'text-green-500', lightBg: 'bg-green-500/20', lightText: 'text-green-400', paleBg: 'bg-green-100', paleText: 'text-green-600' },
    blue: { bg: 'bg-blue-500', text: 'text-blue-500', lightBg: 'bg-blue-500/20', lightText: 'text-blue-400', paleBg: 'bg-blue-100', paleText: 'text-blue-600' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-500', lightBg: 'bg-purple-500/20', lightText: 'text-purple-400', paleBg: 'bg-purple-100', paleText: 'text-purple-600' },
    orange: { bg: 'bg-orange-500', text: 'text-orange-500', lightBg: 'bg-orange-500/20', lightText: 'text-orange-400', paleBg: 'bg-orange-100', paleText: 'text-orange-600' },
  };

  const overviewStats = [
    { label: t.totalRevenueLabel, value: '$87,540', change: '+22.5%', trend: 'up', icon: DollarSign, color: 'green' },
    { label: t.newUsersLabel, value: '1,247', change: '+18.2%', trend: 'up', icon: UserPlus, color: 'blue' },
    { label: t.activeSessionsLabel, value: '3,842', change: '+12.8%', trend: 'up', icon: TrendingUp, color: 'purple' },
    { label: t.conversionRateLabel, value: '4.8%', change: '+0.9%', trend: 'up', icon: GitMerge, color: 'orange' },
  ];

  const topIndustries = [
    { name: t.technologyIndustry, submissions: 2845, revenue: '$28,450', growth: '+15%' },
    { name: t.educationIndustry, submissions: 1892, revenue: '$18,920', growth: '+22%' },
    { name: t.businessIndustry, submissions: 1567, revenue: '$15,670', growth: '+8%' },
    { name: t.healthcareIndustry, submissions: 1234, revenue: '$12,340', growth: '+19%' },
    { name: t.lawIndustry, submissions: 918, revenue: '$9,180', growth: '+12%' },
  ];

  const agentPerformance = [
    { name: t.agent3Title, usage: 3245, avgScore: 87, satisfaction: 4.6 },
    { name: t.agent2Title, usage: 2856, avgScore: 89, satisfaction: 4.7 },
    { name: t.agent1Title, usage: 1432, avgScore: 85, satisfaction: 4.5 },
    { name: t.agent4Title, usage: 923, avgScore: 91, satisfaction: 4.8 },
  ];

  const userEngagementData = [
    { day: 'Mon', submissions: 120, users: 45 },
    { day: 'Tue', submissions: 135, users: 52 },
    { day: 'Wed', submissions: 150, users: 58 },
    { day: 'Thu', submissions: 142, users: 54 },
    { day: 'Fri', submissions: 165, users: 62 },
    { day: 'Sat', submissions: 95, users: 38 },
    { day: 'Sun', submissions: 85, users: 32 },
  ];

  const revenueBreakdown = [
    { category: 'Premium Subscriptions', amount: 45680, percentage: 52 },
    { category: 'Per-Evaluation Fees', amount: 28450, percentage: 32 },
    { category: 'Enterprise Contracts', amount: 13410, percentage: 16 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${textPrimary}`}>{t.analyticsDashboardTitle}</h1>
            <p className={textSecondary}>{t.analyticsDashboardDesc}</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-slate-200 text-slate-900'
                }`}
            >
              <option value="7days">{t.last7DaysOption}</option>
              <option value="30days">{t.last30DaysOption}</option>
              <option value="90days">{t.last90DaysOption}</option>
              <option value="year">{t.lastYearOption}</option>
            </select>
            <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all">
              <Download className="w-5 h-5" />
              <span className="font-semibold">{t.exportReportButton}</span>
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {overviewStats.map((stat, index) => {
            const Icon = stat.icon;
            const colors = COLORS[stat.color];
            return (
              <Card key={index}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${theme === 'dark' ? colors.lightBg : colors.paleBg}`}>
                    <Icon className={`w-6 h-6 ${theme === 'dark' ? colors.lightText : colors.paleText}`} />
                  </div>
                  <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                </div>
                <div className={`text-3xl font-bold mb-1 ${textPrimary}`}>{stat.value}</div>
                <div className={`text-sm ${textSecondary}`}>{stat.label}</div>
              </Card>
            );
          })}
        </div>

        {/* User Engagement Chart */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${textPrimary}`}>{t.userEngagementTrendsTitle}</h2>
            <div className="flex space-x-2">
              {['submissions', 'users', 'revenue'].map((metric) => (
                <button
                  key={metric}
                  onClick={() => setSelectedMetric(metric)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${selectedMetric === metric
                      ? 'bg-purple-600 text-white'
                      : theme === 'dark'
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  {metric.charAt(0).toUpperCase() + metric.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 flex items-end justify-between space-x-2">
            {userEngagementData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className={`w-full rounded-t-lg relative ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-slate-100'}`} style={{ height: '100%' }}>
                  <div
                    className="w-full bg-gradient-to-t from-purple-600 to-pink-600 rounded-t-lg absolute bottom-0 transition-all duration-500"
                    style={{ height: `${(data.submissions / 165) * 100}%` }}
                  />
                </div>
                <div className={`text-xs mt-2 font-semibold ${textSecondary}`}>{data.day}</div>
                <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>{data.submissions}</div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Industries */}
          <Card>
            <div className="flex items-center space-x-2 mb-6">
              <BarChart3 className="w-6 h-6 text-purple-500" />
              <h2 className={`text-2xl font-bold ${textPrimary}`}>{t.topIndustriesTitle}</h2>
            </div>
            <div className="space-y-4">
              {topIndustries.map((industry, index) => (
                <div key={index} className={`flex items-center justify-between pb-4 border-b last:border-0 ${theme === 'dark' ? 'border-gray-700' : 'border-slate-100'}`}>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-semibold ${textPrimary}`}>{industry.name}</span>
                      <span className={`text-sm font-bold ${textPrimary}`}>{industry.revenue}</span>
                    </div>
                    <div className={`flex items-center justify-between text-sm ${textSecondary}`}>
                      <span>{industry.submissions} {t.submissionsLabel}</span>
                      <span className="text-green-500 font-semibold">{industry.growth}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Revenue Breakdown */}
          <Card>
            <div className="flex items-center space-x-2 mb-6">
              <PieChart className="w-6 h-6 text-blue-500" />
              <h2 className={`text-2xl font-bold ${textPrimary}`}>{t.revenueBreakdownTitle}</h2>
            </div>
            <div className="space-y-6">
              {revenueBreakdown.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${textPrimary}`}>{item.category}</span>
                    <span className={`text-sm font-bold ${textPrimary}`}>${item.amount.toLocaleString()}</span>
                  </div>
                  <div className={`w-full rounded-full h-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-slate-200'}`}>
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <div className={`text-xs mt-1 ${textSecondary}`}>{item.percentage}{t.percentOfTotalRevenue}</div>
                </div>
              ))}
            </div>
            <div className={`mt-6 pt-6 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-slate-100'}`}>
              <div className="flex items-center justify-between">
                <span className={`font-semibold ${textPrimary}`}>{t.totalRevenueLabel2}</span>
                <span className="text-2xl font-bold text-purple-500">
                  ${revenueBreakdown.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Agent Performance */}
        <Card padding="none" className="overflow-hidden">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <LineChart className="w-6 h-6 text-green-500" />
              <h2 className={`text-2xl font-bold ${textPrimary}`}>{t.aiAgentPerformanceTitle}</h2>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={theme === 'dark' ? 'bg-gray-900/50' : 'bg-slate-50'}>
                <tr>
                  <th className={`text-left py-3 px-6 text-xs font-bold uppercase ${textSecondary}`}>{t.tableHeaderAgent}</th>
                  <th className={`text-left py-3 px-6 text-xs font-bold uppercase ${textSecondary}`}>{t.tableHeaderUsageCount}</th>
                  <th className={`text-left py-3 px-6 text-xs font-bold uppercase ${textSecondary}`}>{t.tableHeaderAvgScore}</th>
                  <th className={`text-left py-3 px-6 text-xs font-bold uppercase ${textSecondary}`}>{t.tableHeaderSatisfaction}</th>
                  <th className={`text-left py-3 px-6 text-xs font-bold uppercase ${textSecondary}`}>{t.tableHeaderPerformance}</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-800' : 'divide-slate-100'}`}>
                {agentPerformance.map((agent, index) => (
                  <tr key={index} className={`transition-colors ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-slate-50'}`}>
                    <td className="py-4 px-6">
                      <div className={`font-semibold ${textPrimary}`}>{agent.name}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`font-semibold ${textPrimary}`}>{agent.usage.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="text-purple-500 font-bold">{agent.avgScore}</div>
                        <div className={`text-sm ml-1 ${textSecondary}`}>{t.outOfHundred}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <span className="text-yellow-500 text-lg mr-1">★</span>
                        <span className={`font-semibold ${textPrimary}`}>{agent.satisfaction}</span>
                        <span className={`text-sm ml-1 ${textSecondary}`}>{t.outOfFive}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-slate-200'}`}>
                        <div
                          className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                          style={{ width: `${agent.avgScore}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Key Insights */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${textPrimary} flex items-center`}>
              <TrendingUp className="w-6 h-6 text-blue-500 mr-2" />
              {t.keyInsightsTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`rounded-xl p-4 transition-all ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-green-50'}`}>
              <TrendingUp className="w-8 h-8 text-green-500 mb-3" />
              <h3 className={`font-bold mb-2 ${textPrimary}`}>{t.growingRevenueTitle}</h3>
              <p className={`text-sm ${textSecondary}`}>{t.growingRevenueDesc}</p>
            </div>
            <div className={`rounded-xl p-4 transition-all ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-blue-50'}`}>
              <UserPlus className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className={`font-bold mb-2 ${textPrimary}`}>{t.userGrowthTitle}</h3>
              <p className={`text-sm ${textSecondary}`}>{t.userGrowthDesc}</p>
            </div>
            <div className={`rounded-xl p-4 transition-all ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-750' : 'bg-purple-50'}`}>
              <BarChart3 className="w-8 h-8 text-purple-500 mb-3" />
              <h3 className={`font-bold mb-2 ${textPrimary}`}>{t.aiPerformanceTitle}</h3>
              <p className={`text-sm ${textSecondary}`}>{t.aiPerformanceDesc}</p>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AnalyticsPage;
