import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Legacy Organization Setup Page
 * 
 * This page is deprecated. Organization details are now collected during registration.
 * Redirects to the unified tenant setup page (plan selection only).
 */
const OrganizationSetupPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to unified tenant setup page
    navigate('/onboarding/tenant-setup', { replace: true });
  }, [navigate]);

  return null;
};

export default OrganizationSetupPage;
