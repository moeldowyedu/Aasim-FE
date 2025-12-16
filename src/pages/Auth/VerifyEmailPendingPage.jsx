import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, ArrowRight, RefreshCw } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import Button from '../../components/common/Button/Button';
import toast from 'react-hot-toast';
import logo from '../../assets/imgs/OBSOLIO-logo-cyan.png';

const VerifyEmailPendingPage = () => {
    const location = useLocation();
    const { email, workspacePreview } = location.state || {};
    const { resendVerification } = useAuthStore();

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
        <div className="min-h-screen bg-[#0B0E14] relative flex items-center justify-center p-4 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-30 pointer-events-none">
                <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-primary-900/40 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="w-full max-w-md relative z-10 animate-fade-in">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block mb-4">
                        <img src={logo} alt="OBSOLIO" className="h-16 mx-auto object-contain" />
                    </Link>
                </div>

                {/* Card */}
                <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/10 relative overflow-hidden backdrop-blur-xl bg-[#1e293b]/40">
                    {/* Success Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-primary-500/20 flex items-center justify-center">
                            <Mail className="w-10 h-10 text-primary-400" />
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-white mb-3 text-center">
                        Check Your Email!
                    </h2>

                    {/* Description */}
                    <div className="text-center space-y-3 mb-6">
                        <p className="text-gray-300">
                            We've sent a verification link to:
                        </p>
                        <p className="text-primary-400 font-semibold text-lg">
                            {email || 'your email address'}
                        </p>

                        {workspacePreview && (
                            <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
                                <p className="text-sm text-gray-400 mb-1">Your workspace will be ready at:</p>
                                <p className="text-white font-medium">{workspacePreview}</p>
                            </div>
                        )}
                    </div>

                    {/* Instructions */}
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
                        <p className="text-sm text-gray-300 text-center">
                            Click the <span className="font-semibold text-white">"Activate Workspace"</span> button in the email to complete your registration.
                        </p>
                    </div>

                    {/* Resend Button */}
                    <Button
                        onClick={handleResend}
                        disabled={isResending || resendDisabled}
                        variant="outline"
                        className="w-full mb-4"
                    >
                        {isResending ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
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
                    <div className="text-center space-y-2">
                        <p className="text-xs text-gray-500">
                            Didn't receive the email? Check your spam folder.
                        </p>
                        <p className="text-xs text-gray-500">
                            The verification link expires in 24 hours.
                        </p>
                    </div>

                    {/* Back to Login */}
                    <div className="mt-6 pt-6 border-t border-white/10 text-center">
                        <Link
                            to="/login"
                            className="text-sm text-gray-400 hover:text-gray-300 transition-colors inline-flex items-center gap-2"
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
