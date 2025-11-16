import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Play, Pause, Settings, Trash2, TrendingUp } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Badge from '../../components/common/Badge/Badge';
import { formatNumber, formatRelativeTime } from '../../utils/formatters';

const MyAgentsPage = () => {
  const [agents, setAgents] = useState([
    {
      id: '1',
      name: 'Customer Support AI',
      icon: '💬',
      description: 'Intelligent customer support automation with multi-channel support',
      status: 'active',
      deployedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
      metrics: {
        totalRuns: 12450,
        successRate: 98.4,
        avgProcessingTime: '1.2s',
        lastRun: new Date(Date.now() - 1000 * 60 * 5)
      },
      engines: ['Text', 'Vision'],
      hitlMode: 'hitl',
      source: 'marketplace'
    },
    {
      id: '2',
      name: 'Invoice Validator',
      icon: '📄',
      description: 'Custom agent for validating vendor invoices against PO numbers',
      status: 'active',
      deployedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8),
      metrics: {
        totalRuns: 3280,
        successRate: 99.2,
        avgProcessingTime: '2.1s',
        lastRun: new Date(Date.now() - 1000 * 60 * 15)
      },
      engines: ['Document', 'Data'],
      hitlMode: 'spot-check',
      source: 'private'
    },
    {
      id: '3',
      name: 'Code Review Assistant',
      icon: '💻',
      description: 'Automated PR review with security and best practices checking',
      status: 'paused',
      deployedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      metrics: {
        totalRuns: 456,
        successRate: 96.8,
        avgProcessingTime: '4.5s',
        lastRun: new Date(Date.now() - 1000 * 60 * 60 * 12)
      },
      engines: ['Code'],
      hitlMode: 'full-review',
      source: 'private'
    },
    {
      id: '4',
      name: 'Social Media Monitor',
      icon: '📱',
      description: 'Real-time brand monitoring and sentiment analysis',
      status: 'active',
      deployedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 22),
      metrics: {
        totalRuns: 28900,
        successRate: 97.6,
        avgProcessingTime: '0.8s',
        lastRun: new Date(Date.now() - 1000 * 60 * 2)
      },
      engines: ['Text', 'Web', 'Vision'],
      hitlMode: 'spot-check',
      source: 'marketplace'
    }
  ]);

  const handleToggleStatus = (id) => {
    setAgents(agents.map(agent => {
      if (agent.id === id) {
        return {
          ...agent,
          status: agent.status === 'active' ? 'paused' : 'active'
        };
      }
      return agent;
    }));
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to undeploy this agent?')) {
      setAgents(agents.filter(agent => agent.id !== id));
    }
  };

  const activeAgents = agents.filter(a => a.status === 'active').length;
  const totalRuns = agents.reduce((sum, a) => sum + a.metrics.totalRuns, 0);
  const avgSuccessRate = agents.reduce((sum, a) => sum + a.metrics.successRate, 0) / agents.length;

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-heading text-gray-900">My Agents</h1>
            <p className="text-gray-600 mt-2">
              Manage your deployed AI agents and monitor their performance
            </p>
          </div>
          <Link to="/agentx/builder">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Agent
            </Button>
          </Link>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <p className="text-sm text-gray-600 mb-1">Total Agents</p>
            <p className="text-3xl font-bold text-gray-900">{agents.length}</p>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <p className="text-sm text-gray-600 mb-1">Active Agents</p>
            <p className="text-3xl font-bold text-secondary-500">{activeAgents}</p>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <p className="text-sm text-gray-600 mb-1">Total Runs</p>
            <p className="text-3xl font-bold text-primary-500">{formatNumber(totalRuns)}</p>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <p className="text-sm text-gray-600 mb-1">Avg Success Rate</p>
            <p className="text-3xl font-bold text-green-600">{avgSuccessRate.toFixed(1)}%</p>
          </Card>
        </div>

        {/* Agents List */}
        <div className="space-y-4">
          {agents.length === 0 ? (
            <Card className="text-center py-12">
              <p className="text-gray-600 text-lg font-semibold mb-2">No agents deployed yet</p>
              <p className="text-gray-500 mb-4">Deploy agents from the marketplace or create your own</p>
              <div className="flex gap-3 justify-center">
                <Link to="/agentx/marketplace">
                  <Button variant="outline">Browse Marketplace</Button>
                </Link>
                <Link to="/agentx/builder">
                  <Button>Create Agent</Button>
                </Link>
              </div>
            </Card>
          ) : (
            agents.map((agent) => (
              <Card key={agent.id} className="hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center text-3xl shadow-sm flex-shrink-0">
                    {agent.icon}
                  </div>

                  {/* Info */}
                  <div className="flex-grow min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-bold font-heading text-gray-900">{agent.name}</h3>
                          <Badge variant={agent.status === 'active' ? 'success' : 'warning'}>
                            {agent.status}
                          </Badge>
                          <Badge variant={agent.source === 'private' ? 'primary' : 'default'}>
                            {agent.source}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm">{agent.description}</p>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-600">Total Runs</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {formatNumber(agent.metrics.totalRuns)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Success Rate</p>
                        <p className="text-lg font-semibold text-green-600">
                          {agent.metrics.successRate}%
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Avg Time</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {agent.metrics.avgProcessingTime}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Last Run</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {formatRelativeTime(agent.metrics.lastRun)}
                        </p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs text-gray-600">Engines:</span>
                      {agent.engines.map((engine, index) => (
                        <Badge key={index} variant="primary" size="sm">
                          {engine}
                        </Badge>
                      ))}
                      <span className="text-xs text-gray-600 ml-2">HITL:</span>
                      <Badge variant="info" size="sm">
                        {agent.hitlMode}
                      </Badge>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant={agent.status === 'active' ? 'outline' : 'primary'}
                        size="sm"
                        onClick={() => handleToggleStatus(agent.id)}
                      >
                        {agent.status === 'active' ? (
                          <>
                            <Pause className="w-4 h-4 mr-1" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-1" />
                            Resume
                          </>
                        )}
                      </Button>
                      <Link to={`/agentx/agents/${agent.id}/analytics`}>
                        <Button variant="outline" size="sm">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          Analytics
                        </Button>
                      </Link>
                      <Link to={`/agentx/agents/${agent.id}/settings`}>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4 mr-1" />
                          Settings
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(agent.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Undeploy
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default MyAgentsPage;
