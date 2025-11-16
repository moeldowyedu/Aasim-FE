import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { Tabs, Button, Alert } from '../../components/common';
import {
  PlanSelector,
  PaymentMethod,
  Invoices,
  UsageMetrics,
} from '../../components/billing';
import { useBillingStore } from '../../store/billingStore';
import { PLANS } from '../../utils/constants';
import { CreditCard, FileText, BarChart3, Package } from 'lucide-react';
import toast from 'react-hot-toast';

const BillingPage = () => {
  const navigate = useNavigate();
  const {
    currentSubscription,
    usage,
    paymentMethods,
    invoices,
    fetchSubscription,
    fetchUsage,
    fetchPaymentMethods,
    fetchInvoices,
    updateSubscription,
    addPaymentMethod,
    removePaymentMethod,
    setDefaultPaymentMethod,
  } = useBillingStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBillingData = async () => {
      try {
        await Promise.all([
          fetchSubscription(),
          fetchUsage(),
          fetchPaymentMethods(),
          fetchInvoices(),
        ]);
      } catch (error) {
        toast.error('Failed to load billing data');
      } finally {
        setLoading(false);
      }
    };

    loadBillingData();
  }, [fetchSubscription, fetchUsage, fetchPaymentMethods, fetchInvoices]);

  const currentPlan = PLANS.find((p) => p.id === currentSubscription?.plan_id) || PLANS[0];

  const handleSelectPlan = async (planId, billingCycle) => {
    try {
      await updateSubscription(planId, billingCycle);
      toast.success('Plan updated successfully!');
    } catch (error) {
      toast.error('Failed to update plan');
    }
  };

  const handleAddPaymentMethod = async (cardData) => {
    await addPaymentMethod(cardData);
  };

  const handleRemovePaymentMethod = async (methodId) => {
    await removePaymentMethod(methodId);
  };

  const handleSetDefaultPaymentMethod = async (methodId) => {
    await setDefaultPaymentMethod(methodId);
    toast.success('Default payment method updated');
  };

  const tabs = [
    {
      id: 'usage',
      label: 'Usage & Limits',
      icon: <BarChart3 className="w-4 h-4" />,
      content: (
        <UsageMetrics
          usage={usage}
          limits={currentPlan.limits}
          plan={currentPlan}
        />
      ),
    },
    {
      id: 'plans',
      label: 'Plans & Pricing',
      icon: <Package className="w-4 h-4" />,
      content: (
        <PlanSelector
          currentPlanId={currentPlan.id}
          onSelectPlan={handleSelectPlan}
        />
      ),
    },
    {
      id: 'payment',
      label: 'Payment Methods',
      icon: <CreditCard className="w-4 h-4" />,
      content: (
        <PaymentMethod
          paymentMethods={paymentMethods}
          onAdd={handleAddPaymentMethod}
          onRemove={handleRemovePaymentMethod}
          onSetDefault={handleSetDefaultPaymentMethod}
        />
      ),
    },
    {
      id: 'invoices',
      label: 'Billing History',
      icon: <FileText className="w-4 h-4" />,
      badge: invoices.length > 0 ? invoices.length.toString() : undefined,
      content: <Invoices invoices={invoices} />,
    },
  ];

  if (loading) {
    return (
      <MainLayout>
        <div className="py-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading billing information...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="py-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">
              Billing & Subscription
            </h1>
            <p className="text-lg text-gray-600">
              Manage your plan, payment methods, and billing history
            </p>
          </div>
          <Button
            onClick={() => navigate('/dashboard')}
            variant="outline"
          >
            Back to Dashboard
          </Button>
        </div>

        {/* Trial/Subscription Status Alert */}
        {currentSubscription?.status === 'trialing' && (
          <Alert variant="info" title="Free Trial Active">
            You have {currentSubscription.trial_days_remaining} days remaining in
            your free trial. Add a payment method to continue after the trial ends.
          </Alert>
        )}

        {currentSubscription?.status === 'past_due' && (
          <Alert variant="warning" title="Payment Past Due">
            Your last payment failed. Please update your payment method to avoid
            service interruption.
          </Alert>
        )}

        {/* Tabs */}
        <Tabs
          tabs={tabs}
          defaultTab="usage"
          variant="default"
        />
      </div>
    </MainLayout>
  );
};

export default BillingPage;
