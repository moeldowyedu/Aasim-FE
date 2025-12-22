import { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Card } from '../../components/common';
import { useTheme } from '../../contexts/ThemeContext';
import {
  Cpu, Eye, Ear, FileText, Code, File, Database, Globe,
  Activity, CheckCircle, AlertTriangle, XCircle, Settings,
  TrendingUp, Zap, Clock, BarChart3, RefreshCw, Power,
  TrendingDown
} from 'lucide-react';

const EngineManagementPage = () => {
  const { theme } = useTheme();
  const [selectedEngine, setSelectedEngine] = useState(null);

  // Styles
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-gray-400' : 'text-slate-500';

  const COLORS = {
    blue: { bg: 'bg-blue-500', text: 'text-blue-500', lightBg: 'bg-blue-500/20', lightText: 'text-blue-400', paleBg: 'bg-blue-100', paleText: 'text-blue-600' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-500', lightBg: 'bg-purple-500/20', lightText: 'text-purple-400', paleBg: 'bg-purple-100', paleText: 'text-purple-600' },
    green: { bg: 'bg-green-500', text: 'text-green-500', lightBg: 'bg-green-500/20', lightText: 'text-green-400', paleBg: 'bg-green-100', paleText: 'text-green-600' },
    indigo: { bg: 'bg-indigo-500', text: 'text-indigo-500', lightBg: 'bg-indigo-500/20', lightText: 'text-indigo-400', paleBg: 'bg-indigo-100', paleText: 'text-indigo-600' },
    yellow: { bg: 'bg-yellow-500', text: 'text-yellow-500', lightBg: 'bg-yellow-500/20', lightText: 'text-yellow-400', paleBg: 'bg-yellow-100', paleText: 'text-yellow-600' },
    red: { bg: 'bg-red-500', text: 'text-red-500', lightBg: 'bg-red-500/20', lightText: 'text-red-400', paleBg: 'bg-red-100', paleText: 'text-red-600' },
    orange: { bg: 'bg-orange-500', text: 'text-orange-500', lightBg: 'bg-orange-500/20', lightText: 'text-orange-400', paleBg: 'bg-orange-100', paleText: 'text-orange-600' },
    cyan: { bg: 'bg-cyan-500', text: 'text-cyan-500', lightBg: 'bg-cyan-500/20', lightText: 'text-cyan-400', paleBg: 'bg-cyan-100', paleText: 'text-cyan-600' },
    pink: { bg: 'bg-pink-500', text: 'text-pink-500', lightBg: 'bg-pink-500/20', lightText: 'text-pink-400', paleBg: 'bg-pink-100', paleText: 'text-pink-600' },
  }

  const getColor = (colorName) => {
    const pal = COLORS[colorName] || COLORS.blue
    return theme === 'dark'
      ? { bg: pal.lightBg, text: pal.lightText, raw: pal.bg }
      : { bg: pal.paleBg, text: pal.paleText, raw: pal.bg }
  }

  // Mock Stats
  const stats = [
    {
      label: 'Total Engines',
      value: '7',
      change: 'All systems operational',
      icon: Cpu,
      color: 'blue'
    },
    {
      label: 'Active Engines',
      value: '6',
      change: '1 under maintenance',
      icon: CheckCircle,
      color: 'green'
    },
    {
      label: 'Total Requests',
      value: '2.4M',
      change: 'This month',
      icon: Activity,
      color: 'purple'
    },
    {
      label: 'Avg Latency',
      value: '245ms',
      change: '-12ms vs last month',
      icon: Zap,
      color: 'orange'
    }
  ];

  // Mock Engines Data
  const engines = [
    {
      id: 1,
      name: 'Vision Engine',
      icon: Eye,
      status: 'Operational',
      version: 'v3.2.1',
      uptime: 99.98,
      requestCount: 456789,
      avgLatency: '180ms',
      color: 'blue',
      description: 'Image recognition and computer vision AI'
    },
    {
      id: 2,
      name: 'Audio Engine',
      icon: Ear,
      status: 'Operational',
      version: 'v2.8.3',
      uptime: 99.95,
      requestCount: 234567,
      avgLatency: '210ms',
      color: 'green',
      description: 'Speech recognition and audio processing'
    },
    {
      id: 3,
      name: 'Text Engine',
      icon: FileText,
      status: 'Operational',
      version: 'v4.1.0',
      uptime: 99.99,
      requestCount: 892345,
      avgLatency: '125ms',
      color: 'purple',
      description: 'Natural language processing and understanding'
    },
    {
      id: 4,
      name: 'Code Engine',
      icon: Code,
      status: 'Degraded',
      version: 'v3.5.2',
      uptime: 97.50,
      requestCount: 178234,
      avgLatency: '450ms',
      color: 'yellow',
      description: 'Code analysis, generation, and debugging'
    },
    {
      id: 5,
      name: 'Document Engine',
      icon: File,
      status: 'Operational',
      version: 'v2.9.1',
      uptime: 99.92,
      requestCount: 345678,
      avgLatency: '290ms',
      color: 'indigo',
      description: 'Document parsing and content extraction'
    },
    {
      id: 6,
      name: 'Data Engine',
      icon: Database,
      status: 'Operational',
      version: 'v3.0.5',
      uptime: 99.96,
      requestCount: 567890,
      avgLatency: '195ms',
      color: 'cyan',
      description: 'Data analysis and pattern recognition'
    },
    {
      id: 7,
      name: 'Web Engine',
      icon: Globe,
      status: 'Operational',
      version: 'v2.7.8',
      uptime: 99.94,
      requestCount: 423456,
      avgLatency: '320ms',
      color: 'pink',
      description: 'Web scraping and content understanding'
    }
  ];

  // Mock Error Logs
  const recentErrors = [
    {
      id: 1,
      engine: 'Code Engine',
      type: 'warning',
      message: 'High latency detected (>400ms)',
      timestamp: '2 minutes ago'
    },
    {
      id: 2,
      engine: 'Vision Engine',
      type: 'info',
      message: 'Cache cleared successfully',
      timestamp: '15 minutes ago'
    },
    {
      id: 3,
      engine: 'Code Engine',
      type: 'error',
      message: 'Rate limit exceeded for tenant TC-1234',
      timestamp: '1 hour ago'
    },
    {
      id: 4,
      engine: 'Audio Engine',
      type: 'warning',
      message: 'Memory usage at 85%',
      timestamp: '2 hours ago'
    },
    {
      id: 5,
      engine: 'Data Engine',
      type: 'info',
      message: 'Version updated to v3.0.5',
      timestamp: '3 hours ago'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Operational':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Degraded':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'Down':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Activity className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Operational':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Degraded':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Down':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getErrorTypeColor = (type) => {
    switch (type) {
      case 'error':
        return theme === 'dark' ? 'bg-red-900/50 border-red-500/50 text-red-300' : 'bg-red-50 border-red-200 text-red-700';
      case 'warning':
        return theme === 'dark' ? 'bg-yellow-900/50 border-yellow-500/50 text-yellow-300' : 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'info':
        return theme === 'dark' ? 'bg-blue-900/50 border-blue-500/50 text-blue-300' : 'bg-blue-50 border-blue-200 text-blue-700';
      default:
        return theme === 'dark' ? 'bg-gray-900/50 border-gray-500/50 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${textPrimary}`}>Engine Management</h1>
            <p className={textSecondary}>Monitor and manage Precision AI Engines Suite</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <button className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-700'}`}>
              <RefreshCw className="w-5 h-5" />
              <span className="font-semibold">Refresh Status</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all">
              <Settings className="w-5 h-5" />
              <span className="font-semibold">System Config</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colors = getColor(stat.color);
            return (
              <Card key={index} hover>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colors.bg}`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                </div>
                <h3 className={`text-3xl font-bold mb-1 ${textPrimary}`}>{stat.value}</h3>
                <p className={`${textSecondary} text-sm font-medium mb-2`}>{stat.label}</p>
                <p className={`${textSecondary} text-xs`}>{stat.change}</p>
              </Card>
            );
          })}
        </div>

        {/* Engines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {engines.map((engine) => {
            const Icon = engine.icon;
            const colors = getColor(engine.color);
            return (
              <Card
                key={engine.id}
                hover
                onClick={() => setSelectedEngine(engine)}
                className="cursor-pointer"
              >
                {/* Engine Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${colors.bg}`}>
                    <Icon className={`w-8 h-8 ${colors.text}`} />
                  </div>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(engine.status)}
                  </div>
                </div>

                {/* Engine Name */}
                <h3 className={`text-xl font-bold mb-1 ${textPrimary}`}>{engine.name}</h3>
                <p className={`text-xs mb-4 ${textSecondary}`}>{engine.description}</p>

                {/* Status Badge */}
                <div className="mb-4">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(engine.status)}`}>
                    {engine.status}
                  </span>
                </div>

                {/* Stats */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className={textSecondary}>Version</span>
                    <span className={`font-semibold ${textPrimary}`}>{engine.version}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className={textSecondary}>Uptime</span>
                    <span className="text-green-500 font-semibold">{engine.uptime}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className={textSecondary}>Requests</span>
                    <span className={`font-semibold ${textPrimary}`}>{engine.requestCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className={textSecondary}>Latency</span>
                    <span className="text-purple-500 font-semibold">{engine.avgLatency}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <button className={`flex items-center justify-center space-x-1 px-3 py-2 rounded-lg transition-colors text-xs ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}>
                    <Settings className="w-3 h-3" />
                    <span>Configure</span>
                  </button>
                  <button className={`flex items-center justify-center space-x-1 px-3 py-2 rounded-lg transition-colors text-xs ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}>
                    <BarChart3 className="w-3 h-3" />
                    <span>Metrics</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button className={`flex items-center justify-center space-x-1 px-3 py-2 rounded-lg transition-colors text-xs ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}>
                    <RefreshCw className="w-3 h-3" />
                    <span>Update</span>
                  </button>
                  <button className={`flex items-center justify-center space-x-1 px-3 py-2 rounded-lg transition-colors text-xs ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}>
                    <Power className="w-3 h-3" />
                    <span>Toggle</span>
                  </button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Performance Charts Section */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold flex items-center ${textPrimary}`}>
              <BarChart3 className="w-6 h-6 mr-2 text-purple-500" />
              Performance Overview
            </h2>
            <select className={`px-4 py-2 border rounded-lg text-sm focus:outline-none focus:border-purple-500 ${theme === 'dark' ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-slate-200 text-slate-700'}`}>
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`rounded-lg p-4 ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-slate-50'}`}>
              <h3 className={`text-sm font-semibold mb-2 ${textSecondary}`}>Request Volume</h3>
              <div className={`text-3xl font-bold mb-1 ${textPrimary}`}>2.4M</div>
              <div className="text-xs text-green-500">+18.5% from last period</div>
            </div>
            <div className={`rounded-lg p-4 ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-slate-50'}`}>
              <h3 className={`text-sm font-semibold mb-2 ${textSecondary}`}>Success Rate</h3>
              <div className={`text-3xl font-bold mb-1 ${textPrimary}`}>99.2%</div>
              <div className="text-xs text-green-500">+0.3% from last period</div>
            </div>
            <div className={`rounded-lg p-4 ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-slate-50'}`}>
              <h3 className={`text-sm font-semibold mb-2 ${textSecondary}`}>Error Rate</h3>
              <div className={`text-3xl font-bold mb-1 ${textPrimary}`}>0.8%</div>
              <div className="text-xs text-red-500">+0.1% from last period</div>
            </div>
          </div>
        </Card>

        {/* Recent Errors/Warnings */}
        <Card className="border-l-4 border-l-yellow-500">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold flex items-center ${textPrimary}`}>
              <AlertTriangle className="w-6 h-6 mr-2 text-yellow-500" />
              Recent Events & Logs
            </h2>
            <button className="text-purple-500 hover:text-purple-600 text-sm font-semibold">
              View All Logs
            </button>
          </div>
          <div className="space-y-3">
            {recentErrors.map((error) => (
              <div
                key={error.id}
                className={`rounded-lg p-4 border ${getErrorTypeColor(error.type)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold">{error.engine}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold uppercase ${error.type === 'error' ? 'bg-red-500/20' :
                          error.type === 'warning' ? 'bg-yellow-500/20' : 'bg-blue-500/20'
                        }`}>
                        {error.type}
                      </span>
                    </div>
                    <p className="text-sm">{error.message}</p>
                  </div>
                  <div className={`flex items-center space-x-2 text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>
                    <Clock className="w-3 h-3" />
                    <span>{error.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Version Management */}
        <Card>
          <h2 className={`text-2xl font-bold mb-6 flex items-center ${textPrimary}`}>
            <TrendingUp className="w-6 h-6 mr-2 text-green-500" />
            Version Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`rounded-lg p-4 ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-slate-50'}`}>
              <h3 className={`text-sm font-semibold mb-3 ${textSecondary}`}>Current Versions</h3>
              <div className="space-y-2">
                {engines.slice(0, 4).map((engine) => (
                  <div key={engine.id} className="flex items-center justify-between text-sm">
                    <span className={textPrimary}>{engine.name}</span>
                    <span className="text-purple-500 font-mono">{engine.version}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`rounded-lg p-4 ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-slate-50'}`}>
              <h3 className={`text-sm font-semibold mb-3 ${textSecondary}`}>Available Updates</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className={textPrimary}>Vision Engine</span>
                  <span className="text-green-500 font-mono">v3.3.0 available</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className={textPrimary}>Code Engine</span>
                  <span className="text-green-500 font-mono">v3.6.0 available</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className={textPrimary}>Audio Engine</span>
                  <span className="text-green-500 font-mono">v2.9.0 available</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default EngineManagementPage;
