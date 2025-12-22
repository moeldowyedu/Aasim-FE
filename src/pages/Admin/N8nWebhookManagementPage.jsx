import { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Card } from '../../components/common';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations';
import {
  Webhook, Activity, CheckCircle, Brain, Search, Plus,
  PauseCircle, PlayCircle, Edit, Trash2, Play, History,
  X, AlertCircle, Copy
} from 'lucide-react';
import toast from 'react-hot-toast';

const N8nWebhookManagementPage = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];

  // Styles
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-gray-400' : 'text-slate-500';

  const [webhooks, setWebhooks] = useState([
    {
      id: 1,
      name: 'Code Review Pipeline',
      url: 'https://n8n.example.com/webhook/code-review',
      status: 'active',
      agents: ['code-judge', 'security-judge', 'performance-judge'],
      trigger: 'on_submission',
      lastExecuted: '2025-11-06 14:23:00',
      executions: 145,
      successRate: 98.5
    },
    {
      id: 2,
      name: 'Content Moderation Workflow',
      url: 'https://n8n.example.com/webhook/content-moderation',
      status: 'active',
      agents: ['essay-judge', 'legal-judge'],
      trigger: 'on_completion',
      lastExecuted: '2025-11-06 13:15:00',
      executions: 89,
      successRate: 100
    },
    {
      id: 3,
      name: 'Quality Assurance Suite',
      url: 'https://n8n.example.com/webhook/qa-suite',
      status: 'paused',
      agents: ['test-judge', 'doc-judge'],
      trigger: 'scheduled',
      lastExecuted: '2025-11-05 09:00:00',
      executions: 234,
      successRate: 96.2
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingWebhook, setEditingWebhook] = useState(null);
  const [activeTab, setActiveTab] = useState('list'); // list, logs

  const [formData, setFormData] = useState({
    name: '',
    url: '',
    method: 'POST',
    authentication: 'none',
    apiKey: '',
    username: '',
    password: '',
    agents: [],
    trigger: 'on_submission',
    retryAttempts: 3,
    timeout: 30,
    headers: [{ key: '', value: '' }],
    notifyOnFailure: true,
    notifyEmail: ''
  });

  const availableAgents = [
    { id: 'code-judge', name: 'Precision Code Analyzer', icon: 'code', color: 'blue' },
    { id: 'security-judge', name: 'Security Auditor', icon: 'security', color: 'red' },
    { id: 'performance-judge', name: 'Performance Analyzer', icon: 'speed', color: 'green' },
    { id: 'doc-judge', name: 'Documentation Reviewer', icon: 'description', color: 'purple' },
    { id: 'test-judge', name: 'Test Coverage Analyzer', icon: 'science', color: 'orange' },
    { id: 'legal-judge', name: 'Legal Compliance', icon: 'gavel', color: 'indigo' },
    { id: 'essay-judge', name: 'Precision Writing Analyzer', icon: 'edit', color: 'green' },
    { id: 'video-judge', name: 'Precision Video Analyzer', icon: 'videocam', color: 'red' },
    { id: 'design-judge', name: 'Precision Design Analyzer', icon: 'palette', color: 'pink' }
  ];

  const webhookLogs = [
    {
      id: 1,
      webhookId: 1,
      timestamp: '2025-11-06 14:23:00',
      status: 'success',
      statusCode: 200,
      duration: 1.2,
      payload: { submissionId: 'sub_123', agentIds: ['code-judge'] },
      response: { success: true, workflowId: 'wf_abc123' }
    },
    {
      id: 2,
      webhookId: 1,
      timestamp: '2025-11-06 13:45:00',
      status: 'success',
      statusCode: 200,
      duration: 0.9,
      payload: { submissionId: 'sub_122', agentIds: ['code-judge', 'security-judge'] },
      response: { success: true, workflowId: 'wf_abc124' }
    },
    {
      id: 3,
      webhookId: 2,
      timestamp: '2025-11-06 13:15:00',
      status: 'failed',
      statusCode: 500,
      duration: 5.0,
      payload: { submissionId: 'sub_121', agentIds: ['essay-judge'] },
      error: 'Connection timeout'
    }
  ];

  const handleCreateWebhook = () => {
    setEditingWebhook(null);
    setFormData({
      name: '',
      url: '',
      method: 'POST',
      authentication: 'none',
      apiKey: '',
      username: '',
      password: '',
      agents: [],
      trigger: 'on_submission',
      retryAttempts: 3,
      timeout: 30,
      headers: [{ key: '', value: '' }],
      notifyOnFailure: true,
      notifyEmail: ''
    });
    setShowModal(true);
  };

  const handleEditWebhook = (webhook) => {
    setEditingWebhook(webhook);
    setFormData({
      name: webhook.name,
      url: webhook.url,
      method: 'POST',
      authentication: 'api_key',
      apiKey: '••••••••',
      username: '',
      password: '',
      agents: webhook.agents,
      trigger: webhook.trigger,
      retryAttempts: 3,
      timeout: 30,
      headers: [{ key: 'Content-Type', value: 'application/json' }],
      notifyOnFailure: true,
      notifyEmail: 'admin@example.com'
    });
    setShowModal(true);
  };

  const handleSaveWebhook = () => {
    if (editingWebhook) {
      setWebhooks(webhooks.map(w =>
        w.id === editingWebhook.id
          ? { ...w, name: formData.name, url: formData.url, agents: formData.agents, trigger: formData.trigger }
          : w
      ));
    } else {
      const newWebhook = {
        id: webhooks.length + 1,
        name: formData.name,
        url: formData.url,
        status: 'active',
        agents: formData.agents,
        trigger: formData.trigger,
        lastExecuted: null,
        executions: 0,
        successRate: 0
      };
      setWebhooks([...webhooks, newWebhook]);
    }
    setShowModal(false);
  };

  const handleDeleteWebhook = (id) => {
    if (window.confirm('Are you sure you want to delete this webhook?')) {
      setWebhooks(webhooks.filter(w => w.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    setWebhooks(webhooks.map(w =>
      w.id === id
        ? { ...w, status: w.status === 'active' ? 'paused' : 'active' }
        : w
    ));
  };

  const handleTestWebhook = async (webhook) => {
    toast.success(`Testing webhook: ${webhook.name}`);
  };

  const toggleAgentSelection = (agentId) => {
    if (formData.agents.includes(agentId)) {
      setFormData({ ...formData, agents: formData.agents.filter(id => id !== agentId) });
    } else {
      setFormData({ ...formData, agents: [...formData.agents, agentId] });
    }
  };

  const addHeaderRow = () => {
    setFormData({
      ...formData,
      headers: [...formData.headers, { key: '', value: '' }]
    });
  };

  const removeHeader = (index) => {
    setFormData({
      ...formData,
      headers: formData.headers.filter((_, i) => i !== index)
    });
  };

  const COLORS = {
    blue: { bg: 'bg-blue-500', text: 'text-blue-500', lightBg: 'bg-blue-500/20', lightText: 'text-blue-400', paleBg: 'bg-blue-100', paleText: 'text-blue-600' },
    green: { bg: 'bg-green-500', text: 'text-green-500', lightBg: 'bg-green-500/20', lightText: 'text-green-400', paleBg: 'bg-green-100', paleText: 'text-green-600' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-500', lightBg: 'bg-purple-500/20', lightText: 'text-purple-400', paleBg: 'bg-purple-100', paleText: 'text-purple-600' },
    orange: { bg: 'bg-orange-500', text: 'text-orange-500', lightBg: 'bg-orange-500/20', lightText: 'text-orange-400', paleBg: 'bg-orange-100', paleText: 'text-orange-600' },
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${textPrimary}`}>{t.webhookManagementTitle}</h1>
            <p className={textSecondary}>{t.webhookManagementDesc}</p>
          </div>
        </div>

        {/* Tabs */}
        <Card padding="none" className="p-2">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('list')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === 'list'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : `${theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`
                }`}
            >
              <Webhook className="w-5 h-5" />
              <span>{t.webhooksTab}</span>
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === 'logs'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : `${theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`
                }`}
            >
              <History className="w-5 h-5" />
              <span>{t.executionLogsTab}</span>
            </button>
          </div>
        </Card>

        {activeTab === 'list' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: t.activeWebhooksLabel, value: webhooks.filter(w => w.status === 'active').length, icon: Webhook, color: 'blue', sub: t.activeOption },
                { label: t.totalExecutionsLabel, value: webhooks.reduce((sum, w) => sum + w.executions, 0), icon: Activity, color: 'purple', sub: '' },
                { label: t.avgSuccessRateLabel, value: `${(webhooks.reduce((sum, w) => sum + w.successRate, 0) / webhooks.length).toFixed(1)}%`, icon: CheckCircle, color: 'green', sub: '' },
                { label: t.availableAgentsLabel, value: availableAgents.length, icon: Brain, color: 'orange', sub: '' }
              ].map((stat, i) => (
                <Card key={i}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${theme === 'dark' ? COLORS[stat.color].lightBg : COLORS[stat.color].paleBg}`}>
                      <stat.icon className={`w-6 h-6 ${theme === 'dark' ? COLORS[stat.color].lightText : COLORS[stat.color].paleText}`} />
                    </div>
                    {stat.sub && <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-800">{stat.sub}</span>}
                  </div>
                  <div className={`text-3xl font-bold mb-1 ${textPrimary}`}>{stat.value}</div>
                  <div className={`text-sm ${textSecondary}`}>{stat.label}</div>
                </Card>
              ))}
            </div>

            {/* Action Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative flex-1 md:max-w-md">
                  <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${textSecondary}`} />
                  <input
                    type="text"
                    placeholder={t.searchWebhooksPlaceholder}
                    className={`w-full pl-10 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                  />
                </div>
                <select className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}>
                  <option>{t.allStatusOption2}</option>
                  <option>{t.activeOption}</option>
                  <option>{t.pausedOption}</option>
                </select>
              </div>
              <button
                onClick={handleCreateWebhook}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                <Plus className="w-5 h-5" />
                <span className="font-semibold">{t.createWebhookButton}</span>
              </button>
            </div>

            {/* Webhooks Table */}
            <Card padding="none" className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={theme === 'dark' ? 'bg-gray-900/50' : 'bg-slate-50'}>
                    <tr>
                      <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>{t.tableHeaderWebhookName}</th>
                      <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>{t.tableHeaderStatus2}</th>
                      <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>{t.tableHeaderConnectedAgents}</th>
                      <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>{t.tableHeaderTrigger}</th>
                      <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>{t.tableHeaderExecutions}</th>
                      <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>{t.tableHeaderSuccessRate}</th>
                      <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>{t.tableHeaderLastExecuted}</th>
                      <th className={`text-center py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>{t.tableHeaderActions2}</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-800' : 'divide-slate-100'}`}>
                    {webhooks.map((webhook) => (
                      <tr key={webhook.id} className={`transition-colors ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-slate-50'}`}>
                        <td className="py-4 px-6">
                          <div>
                            <div className={`font-semibold ${textPrimary}`}>{webhook.name}</div>
                            <div className={`text-xs font-mono mt-1 w-48 truncate ${textSecondary}`}>{webhook.url}</div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${webhook.status === 'active'
                              ? 'bg-green-100 text-green-800 border border-green-200'
                              : 'bg-gray-100 text-gray-800 border border-gray-200'
                            }`}>
                            {webhook.status === 'active' ? <CheckCircle className="w-3 h-3 mr-1" /> : <PauseCircle className="w-3 h-3 mr-1" />}
                            {webhook.status === 'active' ? t.activeOption : t.pausedOption}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex flex-wrap gap-1">
                            {webhook.agents.slice(0, 3).map((agentId) => {
                              const agent = availableAgents.find(a => a.id === agentId);
                              return agent ? (
                                <span
                                  key={agentId}
                                  className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-${agent.color}-100 text-${agent.color}-800 border border-${agent.color}-200`}
                                >
                                  {agent.name.split(' ')[0]}
                                </span>
                              ) : null;
                            })}
                            {webhook.agents.length > 3 && (
                              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                                +{webhook.agents.length - 3}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`text-sm capitalize ${textSecondary}`}>{webhook.trigger.replace('_', ' ')}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`font-semibold ${textPrimary}`}>{webhook.executions}</span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <span className={`font-semibold mr-2 ${textPrimary}`}>{webhook.successRate}%</span>
                            <div className={`w-16 h-1.5 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                              <div className="h-full bg-green-500 rounded-full" style={{ width: `${webhook.successRate}%` }}></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`text-sm ${textSecondary}`}>{webhook.lastExecuted || 'Never'}</span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleTestWebhook(webhook)}
                              className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-gray-700 text-blue-400' : 'hover:bg-blue-50 text-blue-600'}`}
                              title="Test webhook"
                            >
                              <Play className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleToggleStatus(webhook.id)}
                              className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-gray-700 text-orange-400' : 'hover:bg-orange-50 text-orange-600'}`}
                              title={webhook.status === 'active' ? 'Pause' : 'Activate'}
                            >
                              {webhook.status === 'active' ? <PauseCircle className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => handleEditWebhook(webhook)}
                              className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-gray-700 text-green-400' : 'hover:bg-green-50 text-green-600'}`}
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteWebhook(webhook.id)}
                              className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-red-50 text-red-600'}`}
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}

        {/* Execution Logs Tab */}
        {activeTab === 'logs' && (
          <Card>
            <div className="mb-6 flex items-center justify-between">
              <h2 className={`text-2xl font-bold ${textPrimary}`}>{t.executionLogsTitle}</h2>
              <select className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}>
                <option>{t.allWebhooksOption}</option>
                {webhooks.map(w => (
                  <option key={w.id}>{w.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-4">
              {webhookLogs.map((log) => {
                const webhook = webhooks.find(w => w.id === log.webhookId);
                return (
                  <div key={log.id} className={`p-6 rounded-xl border transition-all ${theme === 'dark'
                      ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                      : 'bg-slate-50 border-slate-200 hover:border-purple-200'
                    }`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${log.status === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                          }`}>
                          {log.status === 'success' ? <CheckCircle className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                        </div>
                        <div>
                          <h3 className={`text-lg font-bold ${textPrimary}`}>{webhook?.name}</h3>
                          <p className={`text-sm ${textSecondary}`}>{log.timestamp}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-semibold ${log.status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                          Status: {log.statusCode}
                        </div>
                        <div className={`text-xs ${textSecondary}`}>Duration: {log.duration}s</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className={`text-sm font-semibold mb-2 ${textSecondary}`}>Payload</h4>
                        <pre className={`p-3 rounded-lg text-xs overflow-x-auto ${theme === 'dark' ? 'bg-black/50 text-gray-300' : 'bg-white border border-slate-200 text-slate-700'
                          }`}>
                          {JSON.stringify(log.payload, null, 2)}
                        </pre>
                      </div>
                      <div>
                        <h4 className={`text-sm font-semibold mb-2 ${textSecondary}`}>
                          {log.status === 'success' ? 'Response' : 'Error'}
                        </h4>
                        <pre className={`p-3 rounded-lg text-xs overflow-x-auto ${theme === 'dark' ? 'bg-black/50 text-gray-300' : 'bg-white border border-slate-200 text-slate-700'
                          }`}>
                          {log.status === 'success' ? JSON.stringify(log.response, null, 2) : log.error}
                        </pre>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* Create/Edit Webhook Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border ${theme === 'dark' ? 'bg-[#1e293b] border-gray-700' : 'bg-white border-slate-200'
              }`}>
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${textPrimary}`}>
                  {editingWebhook ? t.editWebhookTitle : t.createNewWebhookTitle}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
                    }`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className={`text-lg font-bold mb-4 ${textPrimary}`}>{t.basicInformationSection}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${textSecondary}`}>
                        {t.webhookNameLabel}
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                          }`}
                        placeholder={t.webhookNamePlaceholder}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${textSecondary}`}>
                        {t.triggerEventLabel}
                      </label>
                      <select
                        value={formData.trigger}
                        onChange={(e) => setFormData({ ...formData, trigger: e.target.value })}
                        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                          }`}
                      >
                        <option value="on_submission">{t.onSubmissionOption}</option>
                        <option value="on_completion">{t.onCompletionOption}</option>
                        <option value="on_approval">{t.onApprovalOption}</option>
                        <option value="on_rejection">{t.onRejectionOption}</option>
                        <option value="scheduled">{t.scheduledOption}</option>
                        <option value="manual">{t.manualOption}</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* URL and Agents */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${textSecondary}`}>
                    {t.n8nWebhookUrlLabel}
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                        }`}
                      placeholder="https://n8n.example.com/webhook/..."
                    />
                    <button className={`px-4 py-2 rounded-lg border transition-colors ${theme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}>
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${textSecondary}`}>
                    Connected Agents
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {availableAgents.map((agent) => (
                      <div
                        key={agent.id}
                        onClick={() => toggleAgentSelection(agent.id)}
                        className={`cursor-pointer p-3 rounded-lg border transition-all flex items-center space-x-2 ${formData.agents.includes(agent.id)
                            ? 'bg-purple-500/10 border-purple-500'
                            : theme === 'dark'
                              ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                              : 'bg-white border-slate-200 hover:border-purple-200'
                          }`}
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${formData.agents.includes(agent.id)
                            ? 'bg-purple-500 border-purple-500'
                            : `border-gray-400 ${theme === 'dark' ? 'bg-transparent' : 'bg-white'}`
                          }`}>
                          {formData.agents.includes(agent.id) && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                        <span className={`text-sm ${textPrimary}`}>{agent.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-700/50">
                  <button
                    onClick={() => setShowModal(false)}
                    className={`px-6 py-2 rounded-lg font-semibold transition-colors ${theme === 'dark'
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveWebhook}
                    className="px-6 py-2 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg transition-all"
                  >
                    {editingWebhook ? 'Save Changes' : 'Create Webhook'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default N8nWebhookManagementPage;
