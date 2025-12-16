import { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import logo from '../../assets/imgs/OBSOLIO-logo-cyan.png';

const VerificationSuccessPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        // Auto redirect after 3 seconds
        const timer = setTimeout(() => {
            navigate('/login');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="min-h-screen bg-[#0B0E14] relative flex items-center justify-center p-4">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-30 pointer-events-none">
                <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-green-900/40 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
            </div>

            <div className="w-full max-w-md relative z-10 animate-fade-in">
                {/* Logo */}
                <div className="text-center mb-8">
                    <img src={logo} alt="OBSOLIO" className="h-16 mx-auto object-contain" />
                </div>

                {/* Card */}
                <div className="glass-card rounded-3xl p-8 shadow-2xl border border-white/10 text-center">
                    {/* Success Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center">
                            <CheckCircle className="w-10 h-10 text-green-400" />
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-white mb-3">
                        Email Verified Successfully!
                    </h2>

                    {/* Description */}
                    <p className="text-gray-300 mb-6">
                        Your workspace is now activated and ready to use.
                    </p>

                    {/* Loading indicator */}
                    <div className="flex justify-center">
                        <div className="w-6 h-6 border-3 border-primary-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>

                    <p className="text-sm text-gray-400 mt-4">
                        Redirecting to login...
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VerificationSuccessPage;
