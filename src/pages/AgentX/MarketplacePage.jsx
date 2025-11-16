import { useState, useEffect } from 'react';
import AgentCard from '../../components/agentx/AgentCard';
import MarketplaceFilters from '../../components/agentx/MarketplaceFilters';
import DeploymentModal from '../../components/agentx/DeploymentModal';
import Button from '../../components/common/Button/Button';

const MarketplacePage = () => {
  const [agents, setAgents] = useState([]);
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [activeFilters, setActiveFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockAgents = [
      {
        id: '1',
        name: 'Customer Support AI',
        icon: '💬',
        description: 'Intelligent customer support automation with multi-channel support',
        category: 'Support',
        industry: 'Customer Service',
        pricing: '$99/mo',
        rating: 4.8,
        deployments: 1250,
        isPublic: true,
        tags: ['chatbot', 'support', 'automation']
      },
      {
        id: '2',
        name: 'Legal Document Analyzer',
        icon: '⚖️',
        description: 'AI-powered contract review and compliance checking',
        category: 'Analysis',
        industry: 'Legal',
        pricing: '$299/mo',
        rating: 4.9,
        deployments: 580,
        isPublic: true,
        tags: ['legal', 'documents', 'compliance']
      },
      {
        id: '3',
        name: 'Sales Forecasting AI',
        icon: '📈',
        description: 'Predictive analytics for sales pipeline and revenue forecasting',
        category: 'Analytics',
        industry: 'Sales',
        pricing: '$199/mo',
        rating: 4.7,
        deployments: 920,
        isPublic: true,
        tags: ['sales', 'forecasting', 'analytics']
      },
      {
        id: '4',
        name: 'HR Recruitment Assistant',
        icon: '👥',
        description: 'Automated candidate screening and interview scheduling',
        category: 'HR',
        industry: 'Human Resources',
        pricing: '$149/mo',
        rating: 4.6,
        deployments: 670,
        isPublic: true,
        tags: ['hr', 'recruitment', 'automation']
      },
      {
        id: '5',
        name: 'Financial Audit AI',
        icon: '💰',
        description: 'Automated financial statement analysis and anomaly detection',
        category: 'Finance',
        industry: 'Finance',
        pricing: '$399/mo',
        rating: 4.9,
        deployments: 450,
        isPublic: true,
        tags: ['finance', 'audit', 'compliance']
      },
      {
        id: '6',
        name: 'Content Moderation AI',
        icon: '🛡️',
        description: 'Real-time content moderation for social platforms',
        category: 'Moderation',
        industry: 'Social Media',
        pricing: '$249/mo',
        rating: 4.8,
        deployments: 1100,
        isPublic: true,
        tags: ['moderation', 'content', 'safety']
      }
    ];

    setAgents(mockAgents);
    setFilteredAgents(mockAgents);
  }, []);

  useEffect(() => {
    let filtered = agents;

    // Apply filters
    if (activeFilters.category?.length) {
      filtered = filtered.filter(agent =>
        activeFilters.category.includes(agent.category)
      );
    }

    if (activeFilters.industry?.length) {
      filtered = filtered.filter(agent =>
        activeFilters.industry.includes(agent.industry)
      );
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(agent =>
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredAgents(filtered);
  }, [activeFilters, searchQuery, agents]);

  const handleDeploy = (agent) => {
    setSelectedAgent(agent);
    setIsDeployModalOpen(true);
  };

  const handleDeployConfirm = async (agent, config) => {
    console.log('Deploying agent:', agent, 'with config:', config);
    // TODO: Implement actual deployment logic
  };

  const filters = {
    categories: [
      { value: 'Support', label: 'Support', count: 15 },
      { value: 'Analysis', label: 'Analysis', count: 12 },
      { value: 'Analytics', label: 'Analytics', count: 8 },
      { value: 'HR', label: 'HR', count: 6 },
      { value: 'Finance', label: 'Finance', count: 10 },
      { value: 'Moderation', label: 'Moderation', count: 7 }
    ],
    industries: [
      { value: 'Customer Service', label: 'Customer Service', count: 18 },
      { value: 'Legal', label: 'Legal', count: 9 },
      { value: 'Sales', label: 'Sales', count: 11 },
      { value: 'Human Resources', label: 'Human Resources', count: 8 },
      { value: 'Finance', label: 'Finance', count: 13 },
      { value: 'Social Media', label: 'Social Media', count: 10 }
    ],
    pricing: [
      { value: 'free', label: 'Free', count: 5 },
      { value: 'under-100', label: 'Under $100', count: 12 },
      { value: '100-300', label: '$100 - $300', count: 25 },
      { value: 'over-300', label: 'Over $300', count: 8 }
    ]
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">AgentX Marketplace</h1>
        <p className="text-gray-600 mt-2">
          Discover and deploy pre-built AI agents for your enterprise
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search agents..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <MarketplaceFilters
            filters={filters}
            activeFilters={activeFilters}
            onFilterChange={setActiveFilters}
          />
        </div>

        {/* Agents Grid */}
        <div className="lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-600">
              {filteredAgents.length} agents found
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onDeploy={handleDeploy}
              />
            ))}
          </div>

          {filteredAgents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No agents found matching your criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Deployment Modal */}
      <DeploymentModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        agent={selectedAgent}
        onDeploy={handleDeployConfirm}
      />
    </div>
  );
};

export default MarketplacePage;
