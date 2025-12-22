import { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Card } from '../../components/common';
import { useTheme } from '../../contexts/ThemeContext';
import {
  FileText, Code, Webhook, Globe, Plug, Plus, Edit, Eye,
  Download, TrendingUp, CheckCircle, XCircle, AlertTriangle,
  Settings, BarChart3, Clock, Zap, RefreshCw, Package,
  Activity, Database, Shield, Terminal
} from 'lucide-react';

const IntegrationManagementPage = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('documentation');

  // Styles
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-gray-400' : 'text-slate-500';

  const COLORS = {
    blue: { bg: 'bg-blue-500', text: 'text-blue-500', lightBg: 'bg-blue-500/20', lightText: 'text-blue-400', paleBg: 'bg-blue-100', paleText: 'text-blue-600' },
    green: { bg: 'bg-green-500', text: 'text-green-500', lightBg: 'bg-green-500/20', lightText: 'text-green-400', paleBg: 'bg-green-100', paleText: 'text-green-600' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-500', lightBg: 'bg-purple-500/20', lightText: 'text-purple-400', paleBg: 'bg-purple-100', paleText: 'text-purple-600' },
    orange: { bg: 'bg-orange-500', text: 'text-orange-500', lightBg: 'bg-orange-500/20', lightText: 'text-orange-400', paleBg: 'bg-orange-100', paleText: 'text-orange-600' },
    red: { bg: 'bg-red-500', text: 'text-red-500', lightBg: 'bg-red-500/20', lightText: 'text-red-400', paleBg: 'bg-red-100', paleText: 'text-red-600' },
    yellow: { bg: 'bg-yellow-500', text: 'text-yellow-500', lightBg: 'bg-yellow-500/20', lightText: 'text-yellow-400', paleBg: 'bg-yellow-100', paleText: 'text-yellow-600' },
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Healthy':
      case 'Active':
      case 'Success':
      case 'Published':
      case 'Stable':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Beta':
      case 'Draft':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Deprecated':
      case 'Failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMethodColor = (method) => {
    switch (method) {
      case 'GET': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'POST': return 'bg-green-100 text-green-800 border-green-200';
      case 'PUT': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'DELETE': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Documentation Stats
  const docStats = {
    publishedDocs: 156,
    pageViews: '234.5K',
    searchQueries: '12.3K',
    avgReadTime: '4m 32s'
  };

  // Documentation Categories
  const docCategories = [
    { id: 1, name: 'Getting Started', pages: 12, status: 'Published', lastUpdate: '2 days ago' },
    { id: 2, name: 'API Reference', pages: 45, status: 'Published', lastUpdate: '1 week ago' },
    { id: 3, name: 'Agent Development', pages: 28, status: 'Published', lastUpdate: '3 days ago' },
    { id: 4, name: 'Engine Integration', pages: 34, status: 'Published', lastUpdate: '5 days ago' },
    { id: 5, name: 'Authentication', pages: 18, status: 'Published', lastUpdate: '1 week ago' },
    { id: 6, name: 'Webhooks Guide', pages: 15, status: 'Draft', lastUpdate: '2 hours ago' },
    { id: 7, name: 'Best Practices', pages: 22, status: 'Published', lastUpdate: '4 days ago' },
    { id: 8, name: 'Troubleshooting', pages: 19, status: 'Published', lastUpdate: '6 days ago' }
  ];

  // SDKs Data
  const sdks = [
    { id: 1, language: 'Python', version: 'v3.2.1', downloads: 45678, lastUpdated: '5 days ago', status: 'Stable', icon: '🐍' },
    { id: 2, language: 'JavaScript', version: 'v2.8.4', downloads: 38234, lastUpdated: '3 days ago', status: 'Stable', icon: '🟨' },
    { id: 3, language: 'Java', version: 'v1.9.2', downloads: 12456, lastUpdated: '1 week ago', status: 'Stable', icon: '☕' },
    { id: 4, language: 'Ruby', version: 'v2.1.0', downloads: 5678, lastUpdated: '2 weeks ago', status: 'Stable', icon: '💎' },
    { id: 5, language: 'PHP', version: 'v1.5.3', downloads: 8234, lastUpdated: '1 week ago', status: 'Stable', icon: '🐘' },
    { id: 6, language: 'Go', version: 'v0.8.1', downloads: 9876, lastUpdated: '4 days ago', status: 'Beta', icon: '🔵' },
    { id: 7, language: '.NET', version: 'v2.3.0', downloads: 11234, lastUpdated: '6 days ago', status: 'Stable', icon: '🔷' },
    { id: 8, language: 'Rust', version: 'v0.5.2', downloads: 3456, lastUpdated: '1 week ago', status: 'Beta', icon: '🦀' }
  ];

  // Webhook Events
  const webhookEvents = [
    'agent.created', 'agent.updated', 'agent.deleted', 'agent.executed',
    'agent.completed', 'agent.failed', 'tenant.created', 'tenant.updated',
    'tenant.suspended', 'user.created', 'user.deleted', 'subscription.created',
    'subscription.updated', 'subscription.cancelled', 'engine.status.changed',
    'engine.error', 'api.rate_limit.exceeded', 'payment.succeeded',
    'payment.failed', 'integration.connected', 'integration.disconnected'
  ];

  // Webhook Logs
  const webhookLogs = [
    { id: 1, event: 'agent.completed', endpoint: 'https://api.tenant.com/webhook', status: 'Success', statusCode: 200, timestamp: '2 min ago', deliveryTime: '145ms' },
    { id: 2, event: 'agent.executed', endpoint: 'https://webhook.example.com/obsolio', status: 'Success', statusCode: 200, timestamp: '5 min ago', deliveryTime: '210ms' },
    { id: 3, event: 'tenant.created', endpoint: 'https://api.internal.com/events', status: 'Failed', statusCode: 500, timestamp: '8 min ago', deliveryTime: '-' },
    { id: 4, event: 'subscription.updated', endpoint: 'https://billing.tenant.com/webhook', status: 'Success', statusCode: 200, timestamp: '12 min ago', deliveryTime: '178ms' },
    { id: 5, event: 'agent.failed', endpoint: 'https://notifications.app.com/hook', status: 'Success', statusCode: 200, timestamp: '15 min ago', deliveryTime: '234ms' }
  ];

  // API Endpoints
  const apiEndpoints = [
    { id: 1, path: '/v2/agents', method: 'GET', version: 'v2', callsToday: 12456, avgLatency: '45ms', status: 'Healthy' },
    { id: 2, path: '/v2/agents', method: 'POST', version: 'v2', callsToday: 3456, avgLatency: '89ms', status: 'Healthy' },
    { id: 3, path: '/v2/agents/{id}', method: 'GET', version: 'v2', callsToday: 8234, avgLatency: '52ms', status: 'Healthy' },
    { id: 4, path: '/v2/agents/{id}/execute', method: 'POST', version: 'v2', callsToday: 5678, avgLatency: '234ms', status: 'Healthy' },
    { id: 5, path: '/v2/engines', method: 'GET', version: 'v2', callsToday: 4567, avgLatency: '38ms', status: 'Healthy' },
    { id: 6, path: '/v2/tenants', method: 'GET', version: 'v2', callsToday: 1234, avgLatency: '67ms', status: 'Healthy' },
    { id: 7, path: '/v1/submissions', method: 'POST', version: 'v1', callsToday: 2345, avgLatency: '456ms', status: 'Deprecated' },
    { id: 8, path: '/v2/analytics', method: 'GET', version: 'v2', callsToday: 6789, avgLatency: '123ms', status: 'Healthy' },
    { id: 9, path: '/v2/webhooks', method: 'POST', version: 'v2', callsToday: 987, avgLatency: '78ms', status: 'Healthy' },
    { id: 10, path: '/v2/users', method: 'GET', version: 'v2', callsToday: 3456, avgLatency: '56ms', status: 'Healthy' }
  ];

  // Third-party Integrations
  const integrations = [
    { id: 1, name: 'Slack', icon: '💬', status: 'Active', activeInstalls: 234, category: 'Communication' },
    { id: 2, name: 'Microsoft Teams', icon: '👥', status: 'Active', activeInstalls: 189, category: 'Communication' },
    { id: 3, name: 'Zapier', icon: '⚡', status: 'Active', activeInstalls: 456, category: 'Automation' },
    { id: 4, name: 'Make (Integromat)', icon: '🔧', status: 'Active', activeInstalls: 123, category: 'Automation' },
    { id: 5, name: 'GitHub', icon: '🐙', status: 'Active', activeInstalls: 378, category: 'Development' },
    { id: 6, name: 'GitLab', icon: '🦊', status: 'Active', activeInstalls: 156, category: 'Development' },
    { id: 7, name: 'Jira', icon: '📋', status: 'Active', activeInstalls: 267, category: 'Project Management' },
    { id: 8, name: 'Trello', icon: '📊', status: 'Active', activeInstalls: 198, category: 'Project Management' },
    { id: 9, name: 'Salesforce', icon: '☁️', status: 'Beta', activeInstalls: 45, category: 'CRM' },
    { id: 10, name: 'HubSpot', icon: '🎯', status: 'Active', activeInstalls: 89, category: 'CRM' },
    { id: 11, name: 'Google Drive', icon: '📁', status: 'Active', activeInstalls: 312, category: 'Storage' },
    { id: 12, name: 'Dropbox', icon: '📦', status: 'Active', activeInstalls: 234, category: 'Storage' }
  ];

  const tabs = [
    { id: 'documentation', name: 'Documentation', icon: FileText },
    { id: 'sdk', name: 'SDK Management', icon: Code },
    { id: 'webhooks', name: 'Webhooks', icon: Webhook },
    { id: 'api', name: 'API Endpoints', icon: Terminal },
    { id: 'integrations', name: 'Third-Party', icon: Plug }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${textPrimary}`}>Integration Management</h1>
            <p className={textSecondary}>Manage platform integrations, documentation, SDKs, webhooks, and APIs</p>
          </div>
        </div>

        {/* Tabs */}
        <Card padding="none" className="p-2">
          <div className="flex space-x-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : `${theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Documentation Tab */}
        {activeTab === 'documentation' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Published Docs', value: docStats.publishedDocs, icon: FileText, color: 'blue' },
                { label: 'Page Views', value: docStats.pageViews, icon: Eye, color: 'green' },
                { label: 'Search Queries', value: docStats.searchQueries, icon: BarChart3, color: 'purple' },
                { label: 'Avg Read Time', value: docStats.avgReadTime, icon: Clock, color: 'orange' }
              ].map((stat, i) => (
                <Card key={i}>
                  <div className="flex items-center space-x-2 mb-2">
                    <stat.icon className={`w-5 h-5 ${theme === 'dark' ? COLORS[stat.color].lightText : COLORS[stat.color].text}`} />
                    <h3 className={`text-sm font-semibold ${textSecondary}`}>{stat.label}</h3>
                  </div>
                  <div className={`text-3xl font-bold ${textPrimary}`}>{stat.value}</div>
                </Card>
              ))}
            </div>

            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${textPrimary}`}>Documentation Categories</h2>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all">
                  <Plus className="w-4 h-4" />
                  <span className="font-semibold">Add Category</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {docCategories.map((category) => (
                  <div
                    key={category.id}
                    className={`rounded-lg p-4 border transition-all ${theme === 'dark' ? 'bg-gray-900/50 border-gray-700/50 hover:border-purple-500/50' : 'bg-slate-50 border-slate-200 hover:border-purple-200'}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className={`text-lg font-bold ${textPrimary}`}>{category.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(category.status)}`}>
                        {category.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className={textSecondary}>{category.pages} pages</span>
                      <span className={textSecondary}>Updated {category.lastUpdate}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-3">
                      <button className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-lg transition-colors text-xs ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-700'}`}>
                        <Edit className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                      <button className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-lg transition-colors text-xs ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-700'}`}>
                        <Eye className="w-3 h-3" />
                        <span>View</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {/* SDK Management Tab */}
        {activeTab === 'sdk' && (
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${textPrimary}`}>Available SDKs</h2>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all">
                <Plus className="w-4 h-4" />
                <span className="font-semibold">Release New Version</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={theme === 'dark' ? 'bg-gray-900/80' : 'bg-slate-50'}>
                  <tr>
                    <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>Language</th>
                    <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>Version</th>
                    <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>Downloads</th>
                    <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>Last Updated</th>
                    <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>Status</th>
                    <th className={`text-right py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>Actions</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-800' : 'divide-slate-100'}`}>
                  {sdks.map((sdk) => (
                    <tr key={sdk.id} className={`transition-colors ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-slate-50'}`}>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{sdk.icon}</span>
                          <span className={`font-semibold ${textPrimary}`}>{sdk.language}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-purple-500 font-mono">{sdk.version}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <Download className="w-4 h-4 text-green-500" />
                          <span className={`${textPrimary} font-semibold`}>{sdk.downloads.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`${textSecondary} text-sm`}>{sdk.lastUpdated}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(sdk.status)}`}>
                          {sdk.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end space-x-2">
                          <button className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-slate-200'}`} title="Update Version">
                            <RefreshCw className="w-4 h-4 text-blue-500" />
                          </button>
                          <button className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-slate-200'}`} title="View Changelog">
                            <FileText className="w-4 h-4 text-purple-500" />
                          </button>
                          <button className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-slate-200'}`} title="Download Stats">
                            <BarChart3 className="w-4 h-4 text-green-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* Webhooks Tab */}
        {activeTab === 'webhooks' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Total Sent', value: '45,678', sub: 'Last 24 hours', icon: Webhook, color: 'blue', isError: false },
                { label: 'Success Rate', value: '98.7%', sub: 'Last 24 hours', icon: CheckCircle, color: 'green', isError: false },
                { label: 'Failed Deliveries', value: '594', sub: 'Last 24 hours', icon: XCircle, color: 'red', isError: true }
              ].map((stat, i) => (
                <Card key={i}>
                  <div className="flex items-center space-x-2 mb-2">
                    <stat.icon className={`w-5 h-5 ${theme === 'dark' ? COLORS[stat.color].lightText : COLORS[stat.color].text}`} />
                    <h3 className={`text-sm font-semibold ${textSecondary}`}>{stat.label}</h3>
                  </div>
                  <div className={`text-3xl font-bold ${stat.isError ? 'text-red-500' : stat.color === 'green' ? 'text-green-500' : textPrimary}`}>{stat.value}</div>
                  <div className={`text-xs ${textSecondary} mt-1`}>{stat.sub}</div>
                </Card>
              ))}
            </div>

            <Card>
              <h2 className={`text-2xl font-bold ${textPrimary} mb-6`}>Available Event Types</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {webhookEvents.map((event, index) => (
                  <div
                    key={index}
                    className={`rounded-lg px-4 py-3 border transition-all ${theme === 'dark' ? 'bg-gray-900/50 border-gray-700/50 hover:border-purple-500/50' : 'bg-slate-50 border-slate-200 hover:border-purple-300'}`}
                  >
                    <code className="text-sm text-purple-500">{event}</code>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${textPrimary}`}>Recent Webhook Deliveries</h2>
                <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-700'}`}>
                  <RefreshCw className="w-4 h-4" />
                  <span className="text-sm font-semibold">Refresh</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={theme === 'dark' ? 'bg-gray-900/80' : 'bg-slate-50'}>
                    <tr>
                      <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>Event</th>
                      <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>Endpoint</th>
                      <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>Status</th>
                      <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>Code</th>
                      <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>Delivery Time</th>
                      <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-800' : 'divide-slate-100'}`}>
                    {webhookLogs.map((log) => (
                      <tr key={log.id} className={`transition-colors ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-slate-50'}`}>
                        <td className="py-4 px-6">
                          <code className="text-sm text-purple-500">{log.event}</code>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`${textSecondary} text-sm truncate max-w-xs block`}>{log.endpoint}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(log.status)}`}>
                            {log.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`font-mono text-sm ${log.statusCode === 200 ? 'text-green-500' : 'text-red-500'}`}>
                            {log.statusCode}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`${textPrimary} text-sm`}>{log.deliveryTime}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`${textSecondary} text-sm`}>{log.timestamp}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}

        {/* API Endpoints Tab */}
        {activeTab === 'api' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Calls', value: '234.5K', sub: 'Today', icon: Activity, color: 'blue' },
                { label: 'Avg Latency', value: '87ms', sub: 'All endpoints', icon: Zap, color: 'yellow' },
                { label: 'Success Rate', value: '99.4%', sub: 'Last 24 hours', icon: CheckCircle, color: 'green' },
                { label: 'Active Versions', value: '2', sub: 'v1, v2', icon: Shield, color: 'purple' }
              ].map((stat, i) => (
                <Card key={i}>
                  <div className="flex items-center space-x-2 mb-2">
                    <stat.icon className={`w-5 h-5 ${theme === 'dark' ? COLORS[stat.color].lightText : COLORS[stat.color].text}`} />
                    <h3 className={`text-sm font-semibold ${textSecondary}`}>{stat.label}</h3>
                  </div>
                  <div className={`text-3xl font-bold ${stat.color === 'green' ? 'text-green-500' : textPrimary}`}>{stat.value}</div>
                  <div className={`text-xs ${textSecondary} mt-1`}>{stat.sub}</div>
                </Card>
              ))}
            </div>

            <Card>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${textPrimary}`}>API Endpoints</h2>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all">
                  <Settings className="w-4 h-4" />
                  <span className="font-semibold">Rate Limit Config</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={theme === 'dark' ? 'bg-gray-900/80' : 'bg-slate-50'}>
                    <tr>
                      <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>Path</th>
                      <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>Method</th>
                      <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>Version</th>
                      <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>Calls Today</th>
                      <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>Avg Latency</th>
                      <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>Status</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-800' : 'divide-slate-100'}`}>
                    {apiEndpoints.map((endpoint) => (
                      <tr key={endpoint.id} className={`transition-colors ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-slate-50'}`}>
                        <td className="py-4 px-6">
                          <code className="text-sm text-purple-500">{endpoint.path}</code>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getMethodColor(endpoint.method)}`}>
                            {endpoint.method}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`${textSecondary} text-sm`}>{endpoint.version}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`${textPrimary} font-semibold`}>{endpoint.callsToday.toLocaleString()}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-green-500 font-mono">{endpoint.avgLatency}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(endpoint.status)}`}>
                            {endpoint.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}

        {/* Third-Party Integrations Tab */}
        {activeTab === 'integrations' && (
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${textPrimary}`}>Available Integrations</h2>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all">
                <Plus className="w-4 h-4" />
                <span className="font-semibold">Add Integration</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrations.map((integration) => (
                <div
                  key={integration.id}
                  className={`rounded-lg p-6 border transition-all ${theme === 'dark' ? 'bg-gray-900/50 border-gray-700/50 hover:border-purple-500/50' : 'bg-slate-50 border-slate-200 hover:border-purple-300'}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{integration.icon}</div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(integration.status)}`}>
                      {integration.status}
                    </span>
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${textPrimary}`}>{integration.name}</h3>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className={`text-xs px-2 py-1 rounded ${theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-slate-200 text-slate-600'}`}>
                      {integration.category}
                    </span>
                    <span className={`text-xs ${textSecondary}`}>{integration.activeInstalls} active installs</span>
                  </div>
                  <button className={`w-full py-2 rounded-lg transition-colors text-sm font-semibold ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-white border border-slate-300 hover:bg-slate-50 text-slate-700'}`}>
                    Configure
                  </button>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default IntegrationManagementPage;
