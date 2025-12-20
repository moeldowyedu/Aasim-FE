import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import Button from '../../components/common/Button/Button';
import logo from '../../assets/imgs/OBSOLIO-logo-cyan.png';
import { useTheme } from '../../contexts/ThemeContext';

const VerifyEmailSentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { email, workspacePreview } = location.state || {};
    const { theme } = useTheme();

    return (
        <div className={`min-h-screen relative flex items-center justify-center p-4 overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0B0E14]' : 'bg-slate-50'}`}>
            {/* Background Ambience */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                {theme === 'dark' ? (
                    <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-primary-900/40 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow opacity-30"></div>
                ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-200/40 via-transparent to-transparent opacity-80" />
                )}
            </div>

            <div className="w-full max-w-lg relative z-10 animate-fade-in my-4">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block mb-4 hover:opacity-90 transition-opacity">
                        <img src={logo} alt="OBSOLIO" className="h-16 mx-auto object-contain" />
                    </Link>
                </div>

                {/* Content Card */}
                <div className={`rounded-3xl p-8 sm:p-10 relative overflow-hidden transition-all duration-300 ${theme === 'dark'
                    ? 'glass-card shadow-2xl border border-white/10 backdrop-blur-xl bg-[#1e293b]/40'
                    : 'bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)]'}`}>

                    {/* Decor glow (Dark Only) */}
                    {theme === 'dark' && (
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50"></div>
                    )}

                    <div className="text-center">
                        {/* Animated Icon */}
                        <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 border animate-pulse-slow ${theme === 'dark'
                            ? 'bg-primary-500/10 border-primary-500/20 shadow-[0_0_30px_rgba(6,182,212,0.15)]'
                            : 'bg-primary-50 border-primary-100 shadow-sm'}`}>
                            <Mail className={`w-10 h-10 ${theme === 'dark' ? 'text-primary-400' : 'text-primary-600'}`} />
                        </div>

                        <h1 className={`text-3xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            Check Your Email
                        </h1>

                        <p className={`mb-8 max-w-sm mx-auto leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                            We've sent a verification link to<br />
                            <span className={`font-medium px-3 py-1 rounded-lg mt-2 inline-block border ${theme === 'dark'
                                ? 'text-white bg-white/5 border-white/5'
                                : 'text-slate-900 bg-slate-100 border-slate-200'}`}>
                                {email || 'your email address'}
                            </span>
                        </p>

                        {/* Workspace Preview */}
                        {workspacePreview && (
                            <div className={`rounded-xl p-5 mb-8 text-left relative overflow-hidden group border transition-colors ${theme === 'dark'
                                ? 'bg-[#0f172a]/60 border-white/10 hover:border-primary-500/30'
                                : 'bg-slate-50 border-slate-200 hover:border-primary-200'}`}>
                                <div className="absolute top-0 right-0 p-2 opacity-10">
                                    <Mail className="w-24 h-24" />
                                </div>
                                <p className="text-xs text-primary-400 uppercase tracking-wider font-bold mb-1">Target Workspace</p>
                                <p className={`font-mono text-sm truncate relative z-10 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>
                                    {workspacePreview}
                                </p>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm px-1 pt-2">
                                <button
                                    onClick={() => navigate('/login')}
                                    className={`flex items-center gap-2 transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-slate-700'}`}
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Login
                                </button>

                                <p className={theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}>
                                    Didn't receive it?{' '}
                                    <Link
                                        to="/resend-verification"
                                        state={{ email }}
                                        className={`font-medium hover:underline transition-all ${theme === 'dark' ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'}`}
                                    >
                                        Resend
                                    </Link>
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer Help */}
                <p className={`text-center text-sm mt-8 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>
                    Need help? <a href="mailto:support@obsolio.com" className={`transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-slate-500 hover:text-slate-700'}`}>Contact Support</a>
                </p>
            </div>
        </div>
    );
};

export default VerifyEmailSentPage;
