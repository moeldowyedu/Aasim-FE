import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import api from '../../services/api';
import logo from '../../assets/imgs/OBSOLIO-logo-cyan.png';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * EmailVerificationHandlerPage
 *
 * Handles email verification links with query parameters format:
 * /verify-email?id=2&hash=xxx&expires=xxx&signature=xxx
 *
 * This component calls the backend verification endpoint and lets the backend
 * handle the verification logic, then redirects to the appropriate page.
 */
const EmailVerificationHandlerPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [status, setStatus] = useState('verifying');

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                // Extract all query parameters
                const id = searchParams.get('id');
                const hash = searchParams.get('hash');
                const expires = searchParams.get('expires');
                const signature = searchParams.get('signature');

                // Validate required parameters
                if (!id || !hash || !expires || !signature) {
                    console.error('Missing verification parameters');
                    navigate('/verification-failed?reason=invalid_link');
                    return;
                }

                // Call backend verification endpoint
                // The backend will process the verification and return the result
                const response = await api.get(`/verify-email/${id}/${hash}`, {
                    params: { expires, signature },
                    headers: {
                        'X-Forwarded-Host': window.location.host
                    }
                });

                // Check response for success
                if (response.data?.success) {
                    // Get workspace URL from response if available
                    const workspaceUrl = response.data?.workspace_url || response.data?.data?.workspace_url;

                    if (workspaceUrl) {
                        // Redirect to verification success page with workspace URL
                        navigate(`/verification-success?workspace=${encodeURIComponent(workspaceUrl)}`);
                    } else {
                        // Redirect to success page without workspace URL
                        navigate('/verification-success');
                    }
                } else {
                    // Backend returned non-success response
                    navigate('/verification-failed?reason=server_error');
                }

            } catch (error) {
                console.error('Email verification error:', error);

                // Handle specific error cases
                if (error.response?.status === 403) {
                    navigate('/verification-failed?reason=invalid_hash');
                } else if (error.response?.status === 410 || error.response?.data?.message?.includes('expired')) {
                    navigate('/verification-failed?reason=expired');
                } else if (error.response?.status === 404) {
                    navigate('/verification-failed?reason=invalid_link');
                } else {
                    navigate('/verification-failed?reason=server_error');
                }
            }
        };

        verifyEmail();
    }, [searchParams, navigate]);

    return (
        <div className={`min-h-screen relative flex items-center justify-center p-4 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0B0E14]' : 'bg-slate-50'}`}>
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                {theme === 'dark' ? (
                    <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-primary-900/40 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow opacity-30"></div>
                ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-200/40 via-transparent to-transparent opacity-80" />
                )}
            </div>

            <div className="w-full max-w-md relative z-10 animate-fade-in">
                {/* Logo */}
                <div className="text-center mb-8">
                    <img src={logo} alt="OBSOLIO" className="h-16 mx-auto object-contain" />
                </div>

                {/* Card */}
                <div className={`rounded-3xl p-8 text-center transition-all duration-300 ${theme === 'dark'
                    ? 'glass-card shadow-2xl border border-white/10 backdrop-blur-xl bg-[#1e293b]/40'
                    : 'bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)]'}`}>

                    {/* Loading State */}
                    <div className="py-8">
                        <div className="relative w-20 h-20 mx-auto mb-6">
                            <div className={`absolute inset-0 border-4 rounded-full ${theme === 'dark' ? 'border-primary-500/30' : 'border-primary-200'}`}></div>
                            <div className="absolute inset-0 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <h2 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            Verifying Your Email
                        </h2>
                        <p className={theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}>
                            Please wait while we verify your email address...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailVerificationHandlerPage;
