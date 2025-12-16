import { Link, useSearchParams } from 'react-router-dom';
import { XCircle, AlertTriangle } from 'lucide-react';
import Button from '../../components/common/Button/Button';
import logo from '../../assets/imgs/OBSOLIO-logo-cyan.png';

const VerificationFailedPage = () => {
    const [searchParams] = useSearchParams();
    const reason = searchParams.get('reason');

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
        <div className="min-h-screen bg-[#0B0E14] relative flex items-center justify-center p-4">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-30 pointer-events-none">
                <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-red-900/40 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
            </div>

            <div className="w-full max-w-md relative z-10 animate-fade-in">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block">
                        <img src={logo} alt="OBSOLIO" className="h-16 mx-auto object-contain" />
                    </Link>
                </div>

                {/* Card */}
                <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/10 text-center">
                    {/* Error Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center">
                            <Icon className="w-10 h-10 text-red-400" />
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-white mb-3">
                        {title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-300 mb-6">
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
                            <Button variant="outline" className="w-full">
                                Back to Login
                            </Button>
                        </Link>
                    </div>

                    {/* Help Text */}
                    <div className="mt-6 pt-6 border-t border-white/10">
                        <p className="text-xs text-gray-500">
                            Need help? Contact support at{' '}
                            <a href="mailto:admin@obsolio.com" className="text-primary-400 hover:text-primary-300">
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
