import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegistrationWizardStore } from '../../store/registrationWizardStore';
import { useAuthStore } from '../../store/authStore';
import WizardSteps from '../wizard/WizardSteps';
import AccountCreationStep from './AccountCreationStep';
import TenantTypeSelectionStep from './TenantTypeSelectionStep';
import PlanSelectionStep from './organization/PlanSelectionStep';
import MainLayout from '../layout/MainLayout';

const RegistrationWizard = () => {
  const navigate = useNavigate();
  const {
    currentStep,
    totalSteps,
    tenantType,
    accountData,
    organizationData,
    personalData,
    nextStep,
    prevStep,
    setCurrentStep,
    resetWizard,
    isComplete,
    completeRegistration,
  } = useRegistrationWizardStore();

  const { register, isLoading } = useAuthStore();

  // Simplified wizard steps - same for both personal and organization
  const wizardSteps = [
    {
      id: 'account',
      title: 'Account',
      description: 'Create account',
    },
    {
      id: 'tenant-type',
      title: 'Account Type',
      description: 'Choose type',
    },
    {
      id: 'plan',
      title: 'Plan',
      description: 'Select plan',
    },
  ];

  // Handle final registration submission
  const handleComplete = async () => {
    try {
      // Prepare simplified registration data
      const registrationData = {
        email: accountData.email,
        password: accountData.password,
        firstName: accountData.firstName,
        lastName: accountData.lastName,
        phone: accountData.phone,
        tenantType,
      };

      // Add plan selection
      if (tenantType === 'organization') {
        registrationData.plan = organizationData.selectedPlan;
      } else {
        registrationData.plan = personalData.selectedPlan;
      }

      // Register user
      await register(registrationData);

      // Mark as complete
      completeRegistration();

      // Navigate to dashboard where they can set up organization structure
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      // Error is handled by the auth store
    }
  };

  // Redirect if already complete
  useEffect(() => {
    if (isComplete) {
      navigate('/dashboard');
    }
  }, [isComplete, navigate]);

  // Render current step - simplified to 3 steps for all users
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <AccountCreationStep onNext={nextStep} />;
      case 2:
        return <TenantTypeSelectionStep onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <PlanSelectionStep onNext={handleComplete} onBack={prevStep} />;
      default:
        return null;
    }
  };

  return (
    <MainLayout showSidebar={false}>
      <div className="bg-gradient-to-br from-primary-50 via-white to-secondary-50 min-h-full p-8">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to Aasim AI</h1>
            <p className="text-gray-600">
              Let's get you started. This will only take a minute.
            </p>
          </div>

          {/* Wizard Steps Progress */}
          <div className="mb-8">
            <WizardSteps steps={wizardSteps} currentStep={currentStep} />
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Creating your account...</p>
                </div>
              </div>
            ) : (
              renderStep()
            )}
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500">
            <p>
              By continuing, you agree to our{' '}
              <a href="/terms" className="text-primary-500 hover:text-primary-600">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-primary-500 hover:text-primary-600">
                Privacy Policy
              </a>
            </p>
            {tenantType === 'organization' && currentStep === 3 && (
              <p className="mt-4 text-sm text-gray-600">
                💡 You can set up your organization structure (branches, departments, teams) after registration from your dashboard.
              </p>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RegistrationWizard;
