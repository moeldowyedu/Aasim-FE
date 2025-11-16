import { useState } from 'react';
import { Filter, Download, Search, Clock, User, CheckCircle, XCircle } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';
import Button from '../../components/common/Button/Button';
import { formatRelativeTime, formatDate } from '../../utils/formatters';

const ActivityLogsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const logs = [
    {
      id: '1',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      user: 'Sarah Johnson',
      userEmail: 'sarah.j@company.com',
      action: 'approved',
      agent: 'Legal Document Analyzer',
      agentIcon: '⚖️',
      task: 'Contract compliance review',
      decision: 'Flagged for review',
      confidence: 72,
      comment: 'Reviewed manually - clauses acceptable',
      duration: '3m 24s'
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 1000 * 60 * 12),
      user: 'Michael Chen',
      userEmail: 'michael.c@company.com',
      action: 'rejected',
      agent: 'Financial Audit AI',
      agentIcon: '💰',
      task: 'Transaction validation',
      decision: 'Approve with conditions',
      confidence: 68,
      comment: 'Vendor not on approved list',
      duration: '1m 45s'
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      user: 'Emma Rodriguez',
      userEmail: 'emma.r@company.com',
      action: 'approved',
      agent: 'Content Moderation AI',
      agentIcon: '🛡️',
      task: 'User content review',
      decision: 'Borderline violation',
      confidence: 65,
      comment: 'Context shows no violation',
      duration: '2m 10s'
    },
    {
      id: '4',
      timestamp: new Date(Date.now() - 1000 * 60 * 35),
      user: 'David Kim',
      userEmail: 'david.k@company.com',
      action: 'approved',
      agent: 'HR Recruitment Assistant',
      agentIcon: '👥',
      task: 'Candidate screening',
      decision: 'Strong match - recommend interview',
      confidence: 88,
      comment: null,
      duration: '45s'
    },
    {
      id: '5',
      timestamp: new Date(Date.now() - 1000 * 60 * 48),
      user: 'Sarah Johnson',
      userEmail: 'sarah.j@company.com',
      action: 'escalated',
      agent: 'Customer Support AI',
      agentIcon: '💬',
      task: 'Escalation decision',
      decision: 'Approve partial refund',
      confidence: 75,
      comment: 'Escalated to senior support',
      duration: '5m 12s'
    },
    {
      id: '6',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      user: 'Michael Chen',
      userEmail: 'michael.c@company.com',
      action: 'approved',
      agent: 'Invoice Validator',
      agentIcon: '📄',
      task: 'Invoice validation',
      decision: 'Approve payment',
      confidence: 92,
      comment: 'Verified PO match',
      duration: '1m 20s'
    },
    {
      id: '7',
      timestamp: new Date(Date.now() - 1000 * 60 * 80),
      user: 'Emma Rodriguez',
      userEmail: 'emma.r@company.com',
      action: 'rejected',
      agent: 'Code Review Assistant',
      agentIcon: '💻',
      task: 'PR security review',
      decision: 'Minor security concerns',
      confidence: 78,
      comment: 'SQL injection vulnerability found',
      duration: '8m 35s'
    },
    {
      id: '8',
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      user: 'David Kim',
      userEmail: 'david.k@company.com',
      action: 'approved',
      agent: 'Social Media Monitor',
      agentIcon: '📱',
      task: 'Brand sentiment analysis',
      decision: 'Negative sentiment detected',
      confidence: 84,
      comment: 'Valid concern - created support ticket',
      duration: '4m 18s'
    }
  ];

  const filteredLogs = logs.filter(log => {
    const matchesSearch = searchQuery === '' ||
      log.agent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.task.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filterType === 'all' || log.action === filterType;

    return matchesSearch && matchesFilter;
  });

  const getActionIcon = (action) => {
    switch (action) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'escalated':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getActionBadge = (action) => {
    switch (action) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'danger';
      case 'escalated':
        return 'warning';
      default:
        return 'default';
    }
  };

  const handleExport = () => {
    console.log('Exporting activity logs...');
    alert('Activity logs exported successfully!');
  };

  const stats = {
    total: logs.length,
    approved: logs.filter(l => l.action === 'approved').length,
    rejected: logs.filter(l => l.action === 'rejected').length,
    escalated: logs.filter(l => l.action === 'escalated').length,
    avgDuration: '3m 12s'
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-heading text-gray-900">Activity Logs</h1>
            <p className="text-gray-600 mt-2">
              Review history of all HITL decisions and actions
            </p>
          </div>
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <p className="text-sm text-gray-600 mb-1">Total Actions</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <p className="text-sm text-gray-600 mb-1">Approved</p>
            <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <p className="text-sm text-gray-600 mb-1">Rejected</p>
            <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <p className="text-sm text-gray-600 mb-1">Escalated</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.escalated}</p>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <p className="text-sm text-gray-600 mb-1">Avg Duration</p>
            <p className="text-3xl font-bold text-primary-600">{stats.avgDuration}</p>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-grow">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by agent, user, or task..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filter by Action */}
            <div className="flex gap-2">
              <Button
                variant={filterType === 'all' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilterType('all')}
              >
                All
              </Button>
              <Button
                variant={filterType === 'approved' ? 'success' : 'outline'}
                size="sm"
                onClick={() => setFilterType('approved')}
              >
                Approved
              </Button>
              <Button
                variant={filterType === 'rejected' ? 'danger' : 'outline'}
                size="sm"
                onClick={() => setFilterType('rejected')}
              >
                Rejected
              </Button>
              <Button
                variant={filterType === 'escalated' ? 'outline' : 'outline'}
                size="sm"
                onClick={() => setFilterType('escalated')}
              >
                Escalated
              </Button>
            </div>
          </div>
        </Card>

        {/* Activity Log Timeline */}
        <Card>
          <div className="space-y-0 divide-y divide-gray-200">
            {filteredLogs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No activity logs found matching your criteria</p>
              </div>
            ) : (
              filteredLogs.map((log) => (
                <div key={log.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex gap-4">
                    {/* Timeline Icon */}
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        {getActionIcon(log.action)}
                      </div>
                      {log.id !== filteredLogs[filteredLogs.length - 1].id && (
                        <div className="w-0.5 flex-grow bg-gray-200 mt-2" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{log.agentIcon}</span>
                          <div>
                            <h3 className="font-semibold text-gray-900">{log.agent}</h3>
                            <p className="text-sm text-gray-600">{log.task}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={getActionBadge(log.action)}>
                            {log.action}
                          </Badge>
                          <p className="text-xs text-gray-600 mt-1">
                            {formatRelativeTime(log.timestamp)}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4 mb-3">
                        <div className="grid md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-gray-600 mb-1">AI Decision</p>
                            <p className="text-sm font-medium text-gray-900">{log.decision}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Confidence</p>
                            <div className="flex items-center gap-2">
                              <div className="flex-grow max-w-[120px] bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    log.confidence >= 80
                                      ? 'bg-green-500'
                                      : log.confidence >= 60
                                      ? 'bg-yellow-500'
                                      : 'bg-red-500'
                                  }`}
                                  style={{ width: `${log.confidence}%` }}
                                />
                              </div>
                              <span className="text-sm font-semibold text-gray-900">
                                {log.confidence}%
                              </span>
                            </div>
                          </div>
                        </div>
                        {log.comment && (
                          <div>
                            <p className="text-xs text-gray-600 mb-1">Reviewer Comment</p>
                            <p className="text-sm text-gray-900 italic">"{log.comment}"</p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{log.user}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{log.duration}</span>
                        </div>
                        <div className="text-xs">
                          {formatDate(log.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ActivityLogsPage;
