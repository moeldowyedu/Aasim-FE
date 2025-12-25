import { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import logo from '../../assets/imgs/OBSOLIO-logo-cyan.png';
import { useTheme } from '../../contexts/ThemeContext';

const VerificationSuccessPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { theme } = useTheme();

    useEffect(() => {
        // Get workspace URL from query params (sent by backend after verification)
        const workspaceUrl = searchParams.get('workspace');

        // Auto redirect after 3 seconds
        const timer = setTimeout(() => {
            if (workspaceUrl) {
                // Redirect to the workspace subdomain login
                window.location.href = workspaceUrl;
            } else {
                // Fallback to main login if no workspace URL provided
                navigate('/login');
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate, searchParams]);

    return (
        <div className={`min-h-screen relative flex items-center justify-center p-4 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0B0E14]' : 'bg-slate-50'}`}>
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                {theme === 'dark' ? (
                    <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-green-900/40 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow opacity-30"></div>
                ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-green-100/40 via-transparent to-transparent opacity-80" />
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

                    {/* Success Icon */}
                    <div className="flex justify-center mb-6">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-green-500/20' : 'bg-green-100 shadow-sm'}`}>
                            <CheckCircle className={`w-10 h-10 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className={`text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        Email Verified Successfully!
                    </h2>

                    {/* Description */}
                    <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>
                        Your workspace is now activated and ready to use.
                    </p>

                    {/* Loading indicator */}
                    <div className="flex justify-center">
                        <div className="w-6 h-6 border-3 border-primary-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>

                    <p className={`text-sm mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-400'}`}>
                        Redirecting to your workspace...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VerificationSuccessPage;
