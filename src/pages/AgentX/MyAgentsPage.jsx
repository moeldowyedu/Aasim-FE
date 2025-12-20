import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Play, Pause, Settings, Trash2, TrendingUp, Grid3x3, List, Eye, Activity, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import { formatNumber, formatRelativeTime } from '../../utils/formatters';
import { useAgentStore } from '../../store/agentStore';
import toast from 'react-hot-toast';
import { useTheme } from '../../contexts/ThemeContext';

const MyAgentsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const { agents, isLoading, error, fetchAgents, deleteAgent, updateAgentStatus, clearError } = useAgentStore();
  const { theme } = useTheme();

  useEffect(() => {
    // Fetch agents from backend when component mounts
    const loadAgents = async () => {
      try {
        await fetchAgents();
      } catch (err) {
        console.error('Failed to load agents:', err);
        // Error is already set in the store
      }
    };

    loadAgents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once on mount

  const handleToggleStatus = async (agentId, currentStatus) => {
    if (currentStatus === 'error') return;

    try {
      const newStatus = currentStatus === 'active' ? 'paused' : 'active';
      await updateAgentStatus(agentId, newStatus);
      toast.success(`Agent ${newStatus === 'active' ? 'activated' : 'paused'} successfully`);
    } catch (error) {
      toast.error('Failed to update agent status');
    }
  };

  const handleDelete = async (agentId, agentName) => {
    if (confirm(`Are you sure you want to undeploy "${agentName}"? This action cannot be undone.`)) {
      try {
        await deleteAgent(agentId);
        toast.success('Agent deleted successfully');
      } catch (error) {
        toast.error('Failed to delete agent');
      }
    }
  };

  const activeAgents = agents.filter(a => a.status === 'active').length;
  const totalExecutions = agents.reduce((sum, a) => sum + (a.executions || 0), 0);
  const avgSuccessRate = agents.length > 0
    ? agents.reduce((sum, a) => sum + (a.success_rate || 0), 0) / agents.length
    : 0;

  const getStatusBadge = (status) => {
    const configs = {
      active: {
        icon: CheckCircle,
        className: theme === 'dark' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-green-100 text-green-700 border-green-200',
        label: 'Active'
      },
      paused: {
        icon: Pause,
        className: theme === 'dark' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-yellow-100 text-yellow-700 border-yellow-200',
        label: 'Paused'
      },
      error: {
        icon: AlertCircle,
        className: theme === 'dark' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-red-100 text-red-700 border-red-200',
        label: 'Error'
      }
    };

    const config = configs[status] || configs.active;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${config.className}`}>
        <Icon className="w-3 h-3" />
        {config.label}
      </span>
    );
  };

  return (
    <MainLayout showSidebar={true} theme={theme}>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>My Agents</h1>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
              Manage your deployed AI agents and monitor their performance
            </p>
          </div>
          <Link to="/agentx/marketplace">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow inline-flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Deploy New Agent
            </button>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className={`rounded-2xl p-6 transition-all duration-300 ${theme === 'dark' ? 'glass-card' : 'bg-white border border-slate-200 shadow-sm hover:shadow-md'}`}>
            <div className="flex items-center justify-between mb-2">
              <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Total Agents</div>
              <Grid3x3 className="w-5 h-5 text-blue-600" />
            </div>
            <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{agents.length}</div>
            <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>Deployed agents</div>
          </div>

          <div className={`rounded-2xl p-6 transition-all duration-300 ${theme === 'dark' ? 'glass-card' : 'bg-white border border-slate-200 shadow-sm hover:shadow-md'}`}>
            <div className="flex items-center justify-between mb-2">
              <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Active</div>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600">{activeAgents}</div>
            <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>Currently running</div>
          </div>

          <div className={`rounded-2xl p-6 transition-all duration-300 ${theme === 'dark' ? 'glass-card' : 'bg-white border border-slate-200 shadow-sm hover:shadow-md'}`}>
            <div className="flex items-center justify-between mb-2">
              <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Total Executions</div>
              <Activity className="w-5 h-5 text-purple-600" />
            </div>
            <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{formatNumber(totalExecutions)}</div>
            <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>All-time runs</div>
          </div>

          <div className={`rounded-2xl p-6 transition-all duration-300 ${theme === 'dark' ? 'glass-card' : 'bg-white border border-slate-200 shadow-sm hover:shadow-md'}`}>
            <div className="flex items-center justify-between mb-2">
              <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Success Rate</div>
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-orange-600">{avgSuccessRate.toFixed(1)}%</div>
            <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>Average across all agents</div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between">
          <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Your Agents</h2>
          <div className={`flex items-center gap-2 rounded-lg p-1 ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'}`}>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded flex items-center gap-2 transition-all ${viewMode === 'grid'
                  ? theme === 'dark' ? 'bg-white/10 text-white shadow-sm' : 'bg-white text-slate-900 shadow-sm'
                  : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
            >
              <Grid3x3 className="w-4 h-4" />
              <span className="text-sm font-medium">Grid</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded flex items-center gap-2 transition-all ${viewMode === 'list'
                  ? theme === 'dark' ? 'bg-white/10 text-white shadow-sm' : 'bg-white text-slate-900 shadow-sm'
                  : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                }`}
            >
              <List className="w-4 h-4" />
              <span className="text-sm font-medium">List</span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className={`rounded-3xl p-12 text-center ${theme === 'dark' ? 'glass-card' : 'bg-white border border-slate-200'}`}>
            <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-spin" />
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Loading agents...</h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Please wait while we fetch your agents</p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className={`rounded-3xl p-12 text-center ${theme === 'dark' ? 'glass-card' : 'bg-white border border-slate-200'}`}>
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Failed to load agents</h3>
            <p className={`mb-6 max-w-md mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>{error}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  clearError();
                  fetchAgents();
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
              >
                Try Again
              </button>
              <Link to="/agentx/marketplace">
                <button className={`px-6 py-3 border rounded-xl font-semibold ${theme === 'dark' ? 'border-white/20 text-white hover:bg-white/5' : 'border-slate-300 text-slate-700 hover:bg-slate-50'}`}>
                  Browse Marketplace
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && agents.length === 0 && (
          <div className={`rounded-3xl p-12 text-center ${theme === 'dark' ? 'glass-card' : 'bg-white border border-slate-200 shadow-sm'}`}>
            <Grid3x3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>No agents deployed yet</h3>
            <p className={`mb-6 max-w-md mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
              Deploy agents from the marketplace or create your own custom agents to get started
            </p>
            <div className="flex gap-3 justify-center">
              <Link to="/agentx/marketplace">
                <button className={`px-6 py-3 border rounded-xl font-semibold ${theme === 'dark' ? 'border-white/20 text-white hover:bg-white/5' : 'border-slate-300 text-slate-700 hover:bg-slate-50'}`}>
                  Browse Marketplace
                </button>
              </Link>
              <Link to="/agentx/builder">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700">
                  Create Agent
                </button>
              </Link>
            </div>
          </div>
        )}

        {/* Agents Grid */}
        {!isLoading && !error && agents.length > 0 && viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <div key={agent.id} className={`rounded-2xl p-6 transition-all duration-300 ${theme === 'dark'
                ? 'glass-card hover:shadow-2xl hover:border-white/20'
                : 'bg-white border border-slate-200 shadow-sm hover:shadow-lg'}`}>
                {/* Icon and Status */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg">
                    {agent.icon || '🤖'}
                  </div>
                  {getStatusBadge(agent.status)}
                </div>

                {/* Name and Description */}
                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{agent.name}</h3>
                <p className={`text-sm mb-4 line-clamp-2 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>{agent.description || 'No description provided'}</p>

                {/* Metrics */}
                <div className={`grid grid-cols-2 gap-4 mb-4 pb-4 border-b ${theme === 'dark' ? 'border-white/10' : 'border-slate-100'}`}>
                  <div>
                    <div className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>Executions</div>
                    <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      {formatNumber(agent.executions || 0)}
                    </div>
                  </div>
                  <div>
                    <div className={`text-xs mb-1 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>Success Rate</div>
                    <div className="text-lg font-bold text-green-600">
                      {agent.success_rate || 0}%
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleToggleStatus(agent.id, agent.status)}
                    disabled={agent.status === 'error'}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1 transition-colors ${agent.status === 'active'
                        ? theme === 'dark' ? 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        : agent.status === 'error'
                          ? theme === 'dark' ? 'bg-white/5 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : theme === 'dark' ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20' : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                  >
                    {agent.status === 'active' ? (
                      <><Pause className="w-4 h-4" /> Pause</>
                    ) : agent.status === 'error' ? (
                      <><AlertCircle className="w-4 h-4" /> Error</>
                    ) : (
                      <><Play className="w-4 h-4" /> Resume</>
                    )}
                  </button>
                  <button className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1 transition-colors ${theme === 'dark' ? 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    }`}>
                    <Settings className="w-4 h-4" />
                    Configure
                  </button>
                  <button className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1 transition-colors border ${theme === 'dark' ? 'border-white/10 text-gray-300 hover:bg-white/5' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}>
                    <Eye className="w-4 h-4" />
                    View Logs
                  </button>
                  <button
                    onClick={() => handleDelete(agent.id, agent.name)}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-1 transition-colors ${theme === 'dark' ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20' : 'bg-red-50 text-red-700 hover:bg-red-100'
                      }`}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default MyAgentsPage;
