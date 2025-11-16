import { useEffect } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { useAuthStore } from '../../store/authStore';
import MetricsRow from '../../components/common/MetricsRow/MetricsRow';
import EngineStatusGrid from '../../components/engines/EngineStatusGrid';
import AgentActivityFeed from '../../components/agentx/AgentActivityFeed';
import HITLQueuePreview from '../../components/hitl/HITLQueuePreview';
import { PLATFORM } from '../../utils/constants';

const DashboardPage = () => {
  const { user } = useAuthStore();

  const heroMetrics = [
    { label: 'Engines Active', value: '7/7', icon: '✓', change: 0 },
    { label: 'Agents Deployed', value: '24', icon: '🤖', change: 12.5 },
    { label: 'HITL Tasks Pending', value: '3', icon: '⏳', change: -25 },
    { label: 'Avg Rubric Score', value: '94.2%', icon: '⭐', change: 3.1 },
  ];

  return (
    <MainLayout>
      <div className="p-6 space-y-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-heading text-gray-900 mb-2">
            Welcome back, {user?.name || 'User'}
          </h1>
          <p className="text-gray-600">
            {PLATFORM.tagline}
          </p>
        </div>

        {/* Hero Metrics */}
        <section>
          <MetricsRow metrics={heroMetrics} />
        </section>

        {/* Engine Status Grid */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold font-heading text-gray-900">
                Precision AI Engines
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Monitor and manage your AI evaluation engines
              </p>
            </div>
          </div>
          <EngineStatusGrid />
        </section>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Agent Activity */}
          <section>
            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
              Recent Agent Activity
            </h2>
            <AgentActivityFeed />
          </section>

          {/* HITL Queue Preview */}
          <section>
            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
              HITL Approvals Needed
            </h2>
            <HITLQueuePreview />
          </section>
        </div>

        {/* Performance Overview */}
        <section>
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8 border border-primary-100">
            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
              Performance Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-4xl font-bold text-gray-900 mb-2">94%</div>
                <div className="text-sm text-gray-600 font-medium mb-1">Success Rate</div>
                <div className="text-xs text-secondary-600 font-semibold">
                  +2.3% from last month
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-4xl font-bold text-gray-900 mb-2">2.3</div>
                <div className="text-sm text-gray-600 font-medium mb-1">Avg. Processing Days</div>
                <div className="text-xs text-secondary-600 font-semibold">
                  -0.5 days improvement
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-4xl font-bold text-gray-900 mb-2">$2,450</div>
                <div className="text-sm text-gray-600 font-medium mb-1">Total Savings</div>
                <div className="text-xs text-gray-500">vs. manual evaluation</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
