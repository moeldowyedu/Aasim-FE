import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, ArrowRight, RefreshCw } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import Button from '../../components/common/Button/Button';
import toast from 'react-hot-toast';
import logo from '../../assets/imgs/OBSOLIO-logo-cyan.png';
import { useTheme } from '../../contexts/ThemeContext';

const VerifyEmailPendingPage = () => {
    const location = useLocation();
    const { email, workspacePreview } = location.state || {};
    const { resendVerification } = useAuthStore();
    const { theme } = useTheme();

    const [isResending, setIsResending] = useState(false);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const handleResend = async () => {
        if (!email) {
            toast.error('Email not found. Please register again.');
            return;
        }

        setIsResending(true);

        try {
            await resendVerification(email);
            toast.success('Verification email sent! Please check your inbox.');

            // Disable resend for 60 seconds
            setResendDisabled(true);
            setCountdown(60);

            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setResendDisabled(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to resend email. Please try again.');
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className={`min-h-screen relative flex items-center justify-center p-4 overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0B0E14]' : 'bg-slate-50'}`}>
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                {theme === 'dark' ? (
                    <>
                        <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-primary-900/40 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow opacity-30"></div>
                        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow opacity-30" style={{ animationDelay: '1s' }}></div>
                    </>
                ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-200/40 via-transparent to-transparent opacity-80" />
                )}
            </div>

            <div className="w-full max-w-md relative z-10 animate-fade-in">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block mb-4">
                        <img src={logo} alt="OBSOLIO" className="h-16 mx-auto object-contain" />
                    </Link>
                </div>

                {/* Card */}
                <div className={`p-8 rounded-3xl relative overflow-hidden transition-all duration-300 ${theme === 'dark'
                    ? 'glass-card shadow-2xl border border-white/10 backdrop-blur-xl bg-[#1e293b]/40'
                    : 'bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)]'}`}>

                    {/* Success Icon */}
                    <div className="flex justify-center mb-6">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-primary-500/20' : 'bg-primary-50 shadow-sm'}`}>
                            <Mail className={`w-10 h-10 ${theme === 'dark' ? 'text-primary-400' : 'text-primary-600'}`} />
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className={`text-2xl font-bold mb-3 text-center ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        Check Your Email!
                    </h2>

                    {/* Description */}
                    <div className="text-center space-y-3 mb-6">
                        <p className={theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}>
                            We've sent a verification link to:
                        </p>
                        <p className={`font-semibold text-lg ${theme === 'dark' ? 'text-primary-400' : 'text-primary-600'}`}>
                            {email || 'your email address'}
                        </p>

                        {workspacePreview && (
                            <div className={`mt-4 p-4 rounded-lg border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                                <p className={`text-sm mb-1 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Your workspace will be ready at:</p>
                                <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{workspacePreview}</p>
                            </div>
                        )}
                    </div>

                    {/* Instructions */}
                    <div className={`rounded-xl p-4 mb-6 border ${theme === 'dark' ? 'bg-blue-500/10 border-blue-500/30' : 'bg-blue-50 border-blue-200'}`}>
                        <p className={`text-sm text-center ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                            Click the <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>"Activate Workspace"</span> button in the email to complete your registration.
                        </p>
                    </div>

                    {/* Resend Button */}
                    <Button
                        onClick={handleResend}
                        disabled={isResending || resendDisabled}
                        variant="outline"
                        className={`w-full mb-4 ${theme === 'light' ? 'hover:bg-slate-50' : ''}`}
                    >
                        {isResending ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                Sending...
                            </span>
                        ) : resendDisabled ? (
                            <span>Resend available in {countdown}s</span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <RefreshCw className="w-4 h-4" />
                                Resend Verification Email
                            </span>
                        )}
                    </Button>

                    {/* Help Text */}
                    <div className={`text-center space-y-2 text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>
                        <p>
                            Didn't receive the email? Check your spam folder.
                        </p>
                        <p>
                            The verification link expires in 24 hours.
                        </p>
                    </div>

                    {/* Back to Login */}
                    <div className={`mt-6 pt-6 border-t text-center ${theme === 'dark' ? 'border-white/10' : 'border-slate-100'}`}>
                        <Link
                            to="/login"
                            className={`text-sm transition-colors inline-flex items-center gap-2 ${theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            ← Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmailPendingPage;
