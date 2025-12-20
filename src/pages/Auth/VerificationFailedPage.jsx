import { Link, useSearchParams } from 'react-router-dom';
import { XCircle, AlertTriangle } from 'lucide-react';
import Button from '../../components/common/Button/Button';
import logo from '../../assets/imgs/OBSOLIO-logo-cyan.png';
import { useTheme } from '../../contexts/ThemeContext';

const VerificationFailedPage = () => {
    const [searchParams] = useSearchParams();
    const reason = searchParams.get('reason');
    const { theme } = useTheme();

    const getErrorMessage = () => {
        switch (reason) {
            case 'invalid_link':
                return {
                    title: 'Invalid Verification Link',
                    message: 'This verification link is invalid or has been used already.',
                    icon: XCircle,
                };
            case 'invalid_hash':
                return {
                    title: 'Invalid Verification Link',
                    message: 'This verification link appears to be corrupted. Please request a new one.',
                    icon: XCircle,
                };
            case 'expired':
                return {
                    title: 'Link Expired',
                    message: 'This verification link has expired. Verification links are valid for 24 hours.',
                    icon: AlertTriangle,
                };
            case 'server_error':
                return {
                    title: 'Server Error',
                    message: 'Something went wrong on our end. Please try again later.',
                    icon: AlertTriangle,
                };
            default:
                return {
                    title: 'Verification Failed',
                    message: 'We could not verify your email address. Please try again.',
                    icon: XCircle,
                };
        }
    };

    const { title, message, icon: Icon } = getErrorMessage();

    return (
        <div className={`min-h-screen relative flex items-center justify-center p-4 transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0B0E14]' : 'bg-slate-50'}`}>
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                {theme === 'dark' ? (
                    <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-red-900/40 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
                ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-red-100/40 via-transparent to-transparent opacity-80" />
                )}
            </div>

            <div className="w-full max-w-md relative z-10 animate-fade-in">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block">
                        <img src={logo} alt="OBSOLIO" className="h-16 mx-auto object-contain" />
                    </Link>
                </div>

                {/* Card */}
                <div className={`rounded-3xl p-8 text-center transition-all duration-300 ${theme === 'dark'
                    ? 'glass-card shadow-2xl border border-white/10 backdrop-blur-xl bg-[#1e293b]/40'
                    : 'bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)]'}`}>

                    {/* Error Icon */}
                    <div className="flex justify-center mb-6">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-red-500/20' : 'bg-red-100 shadow-sm'}`}>
                            <Icon className={`w-10 h-10 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className={`text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        {title}
                    </h2>

                    {/* Description */}
                    <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>
                        {message}
                    </p>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <Link to="/register" className="block">
                            <Button variant="primary" className="w-full">
                                Register New Account
                            </Button>
                        </Link>

                        <Link to="/login" className="block">
                            <Button variant="outline" className={`w-full ${theme === 'light' ? 'hover:bg-slate-50' : ''}`}>
                                Back to Login
                            </Button>
                        </Link>
                    </div>

                    {/* Help Text */}
                    <div className={`mt-6 pt-6 border-t ${theme === 'dark' ? 'border-white/10' : 'border-slate-100'}`}>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>
                            Need help? Contact support at{' '}
                            <a href="mailto:admin@obsolio.com" className={`transition-colors ${theme === 'dark' ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'}`}>
                                admin@obsolio.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerificationFailedPage;
