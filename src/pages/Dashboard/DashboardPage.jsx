import { useEffect, useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { useAuthStore } from '../../store/authStore';
import { useBillingStore } from '../../store/billingStore';
import { Badge } from '../../components/common';
import { StatCard, QuickActions, RecentActivity, UsageChart, MyAgents } from '../../components/dashboard';
import { PLANS } from '../../utils/constants';
import { authService } from '../../services';
import { useTheme } from '../../contexts/ThemeContext';
import { differenceInDays } from 'date-fns';

const DashboardPage = () => {
  const { user } = useAuthStore();
  const { currentSubscription, fetchSubscription } = useBillingStore();
  const { theme } = useTheme();
  const [stats, setStats] = useState({
    total_agents: 0,
    total_executions: 0,
    active_workflows: 0,
    marketplace_sales: 0
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  // Calculate Trial Status
  const trialEndsAt = user?.tenant?.trial_ends_at;
  const isTrial = !!trialEndsAt;
  const daysLeft = trialEndsAt ? differenceInDays(new Date(trialEndsAt), new Date()) : 0;

  useEffect(() => {
    fetchSubscription();
    fetchDashboardStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setIsLoadingStats(true);
      const response = await authService.getDashboardStats();
      setStats(response.data || response);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      // Keep default stats if fetch fails
    } finally {
      setIsLoadingStats(false);
    }
  };

  // Get current plan details
  const currentPlan = currentSubscription
    ? PLANS.find((p) => p.id === currentSubscription.plan_id)
    : PLANS[0]; // Default to Starter

  return (
    <MainLayout showFooter={false} theme={theme}>
      <div className="py-6 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className={`text-3xl font-heading font-bold mb-1 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Dashboard
            </h1>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Current Plan</p>
                <div className="flex flex-col items-end">
                  <Badge
                    variant={isTrial ? (daysLeft >= 0 ? "warning" : "error") : "primary"}
                    size="lg"
                  >
                    {isTrial
                      ? (daysLeft >= 0 ? 'Free Trial' : 'Trial Expired')
                      : (currentPlan?.name || 'Starter')
                    }
                  </Badge>
                  {isTrial && daysLeft >= 0 && (
                    <span className="text-xs font-medium text-orange-600 mt-1">
                      {daysLeft} days remaining
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Agents"
            value={isLoadingStats ? "..." : String(stats.total_agents || 0)}
            icon={<span className="material-icons text-2xl text-primary-600">smart_toy</span>}
            color="primary"
            trend="up"
            trendValue={stats.agents_trend || "0"}
          />
          <StatCard
            title="Runs This Month"
            value={isLoadingStats ? "..." : String(stats.total_executions || 0)}
            icon={<span className="material-icons text-2xl text-secondary-600">play_arrow</span>}
            color="secondary"
            trend="up"
            trendValue={stats.executions_trend || "0%"}
          />
          <StatCard
            title="Active Workflows"
            value={isLoadingStats ? "..." : String(stats.active_workflows || 0)}
            icon={<span className="material-icons text-2xl text-purple-600">account_tree</span>}
            color="purple"
            trend="up"
            trendValue={stats.workflows_trend || "0"}
          />
          <StatCard
            title="Marketplace Sales"
            value={isLoadingStats ? "..." : `$${stats.marketplace_sales || 0}`}
            icon={<span className="material-icons text-2xl text-orange-600">payments</span>}
            color="orange"
            trend="up"
            trendValue={stats.sales_trend || "$0"}
          />
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className={`text-2xl font-heading font-bold mb-4 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Quick Actions
          </h2>
          <QuickActions />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Usage Chart - Takes 2 columns */}
          <div className="lg:col-span-2">
            <UsageChart />
          </div>

          {/* Recent Activity - Takes 1 column */}
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>

        {/* My Agents */}
        <div>
          <MyAgents />
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`rounded-xl p-6 border transition-all duration-300 ${theme === 'dark'
              ? 'glass-card border-primary-500/20 bg-primary-900/10'
              : 'bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200'
            }`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="material-icons text-white text-xl">precision_manufacturing</span>
              </div>
              <h3 className={`font-heading font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Precision AI Engines
              </h3>
            </div>
            <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-700'}`}>
              Access 7 powerful engines to build custom agents
            </p>
            <a
              href="/engines"
              className="text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              Explore Engines →
            </a>
          </div>

          <div className={`rounded-xl p-6 border transition-all duration-300 ${theme === 'dark'
              ? 'glass-card border-secondary-500/20 bg-secondary-900/10'
              : 'bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200'
            }`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-secondary-500 rounded-lg flex items-center justify-center">
                <span className="material-icons text-white text-xl">store</span>
              </div>
              <h3 className={`font-heading font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                AgentX Hub
              </h3>
            </div>
            <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-700'}`}>
              Discover & deploy agents. Earn 70% revenue share
            </p>
            <a
              href="/agentx/marketplace"
              className={`text-sm font-medium ${theme === 'dark' ? 'text-secondary-400 hover:text-secondary-300' : 'text-slate-600 hover:text-slate-700'}`}
            >
              Visit Marketplace →
            </a>
          </div>

          <div className={`rounded-xl p-6 border transition-all duration-300 ${theme === 'dark'
              ? 'glass-card border-purple-500/20 bg-purple-900/10'
              : 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200'
            }`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="material-icons text-white text-xl">supervised_user_circle</span>
              </div>
              <h3 className={`font-heading font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                HITL Mode
              </h3>
            </div>
            <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-purple-800'}`}>
              Human-in-the-Loop oversight for critical tasks
            </p>
            <a
              href="/hitl"
              className="text-sm font-medium text-purple-600 hover:text-purple-700"
            >
              Configure HITL →
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
