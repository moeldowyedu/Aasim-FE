import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, CheckCircle, ArrowRight, Zap, Users, Building, Rocket } from 'lucide-react';
import Button from '../../components/common/Button/Button';
import { useTenantStore } from '../../store/tenantStore';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

const TenantSetupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPlan, setSelectedPlan] = useState('free');
  const [isCreating, setIsCreating] = useState(false);
  const { createTenant, setCurrentTenant } = useTenantStore();
  const { user } = useAuthStore();

  // Get tenant data from navigation state (passed from registration)
  const tenantData = location.state || {};
  const { tenantType, organizationName, organizationDomain, userFullName } = tenantData;

  // If no tenant data, redirect to registration
  useEffect(() => {
    if (!tenantType) {
      toast.error('Please complete registration first');
      navigate('/register', { replace: true });
    }
  }, [tenantType, navigate]);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for getting started',
      features: [
        'Up to 5 AI agents',
        'Basic analytics',
        'Community support',
        '1 GB storage',
        'Email notifications'
      ],
      icon: Users,
      gradient: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-500',
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$29',
      period: 'per month',
      description: 'For professionals and small teams',
      features: [
        'Up to 50 AI agents',
        'Advanced analytics',
        'Priority email support',
        '50 GB storage',
        'Custom integrations',
        'API access'
      ],
      icon: Building,
      gradient: 'from-purple-500 to-pink-500',
      borderColor: 'border-purple-500',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For large organizations',
      features: [
        'Unlimited AI agents',
        'Enterprise analytics',
        '24/7 dedicated support',
        'Unlimited storage',
        'Custom integrations',
        'SLA guarantee',
        'On-premise deployment'
      ],
      icon: Rocket,
      gradient: 'from-orange-500 to-red-500',
      borderColor: 'border-orange-500',
      popular: false
    }
  ];

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
  };

  const handleContinue = async () => {
    try {
      setIsCreating(true);

      // Prepare tenant data based on type
      const newTenantData = {
        type: tenantType,
        plan: selectedPlan,
        owner: user?.id || user?._id
      };

      if (tenantType === 'organization') {
        // Use organization details from registration
        newTenantData.name = organizationName || 'My Organization';
        newTenantData.short_name = organizationDomain || organizationName?.toLowerCase().replace(/\s+/g, '-');
      } else {
        // Create personal workspace name
        newTenantData.name = `${userFullName || user?.name || 'Personal'}'s Workspace`;
        newTenantData.short_name = `${(userFullName || user?.name || 'user').toLowerCase().replace(/\s+/g, '-')}-workspace`;
      }

      // Create the tenant
      const tenant = await createTenant(newTenantData);

      if (tenant) {
        // Set as current tenant
        await setCurrentTenant(tenant.id || tenant._id);

        toast.success(
          tenantType === 'organization'
            ? 'Your organization is ready!'
            : 'Your workspace is ready!'
        );

        // Redirect to dashboard
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 500);
      }
    } catch (error) {
      console.error('Failed to create tenant:', error);
      toast.error('Failed to create workspace. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="w-full max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-secondary-900 mb-3">
            Choose Your Plan
          </h1>
          <p className="text-lg text-secondary-600">
            {tenantType === 'organization'
              ? `Setting up ${organizationName || 'your organization'}`
              : 'Setting up your personal workspace'
            }
          </p>
        </div>

        {/* Plan Selection Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isSelected = selectedPlan === plan.id;

            return (
              <button
                key={plan.id}
                onClick={() => handleSelectPlan(plan.id)}
                className={`
                  relative glass-card rounded-3xl p-8 text-left transition-all duration-300
                  ${isSelected
                    ? 'ring-4 ring-primary-500 shadow-2xl scale-[1.02]'
                    : 'hover:shadow-xl hover:scale-[1.01]'
                  }
                `}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 -right-3">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      POPULAR
                    </div>
                  </div>
                )}

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-6 right-6">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center shadow-lg`}>
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-secondary-900">{plan.price}</span>
                  <span className="text-sm text-secondary-600 ml-2">/ {plan.period}</span>
                </div>
                <p className="text-secondary-600 mb-6">
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-secondary-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleContinue}
            disabled={isCreating}
            className="px-12 py-4 text-lg font-semibold"
          >
            {isCreating ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Setting up your workspace...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Continue to Dashboard
                <ArrowRight className="w-5 h-5" />
              </span>
            )}
          </Button>
        </div>

        {/* Info Text */}
        <p className="text-center text-sm text-secondary-600 mt-6">
          You can upgrade or downgrade your plan anytime from settings
        </p>
      </div>
    </div>
  );
};

export default TenantSetupPage;
