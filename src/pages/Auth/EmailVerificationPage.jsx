import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Loader, CheckCircle, XCircle, ArrowRight, Sun, Moon } from 'lucide-react';
import authService from '../../services/authService';
import logo from '../../assets/imgs/OBSOLIO-logo-cyan.png';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const EmailVerificationPage = () => {
    const { id, hash } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [message, setMessage] = useState('Verifying your email address...');
    const { theme, toggleTheme } = useTheme();

    const [targetUrl, setTargetUrl] = useState('/');

    useEffect(() => {
        const verify = async () => {
            if (!id || !hash) {
                setStatus('error');
                setMessage('Invalid verification link.');
                return;
            }

            try {
                // Pass query params (expires, signature) to the service
                const response = await authService.verifyEmail(id, hash, location.search);
                setStatus('success');
                setMessage('Email verified successfully! You can now access your workspace.');

                // Determine redirect URL
                // Backend might return workspace_url, or we construct it if we have tenant context
                const url = response.workspace_url || response?.data?.workspace_url || '/login';
                setTargetUrl(url);

                // Optional: Auto-redirect after short delay
                setTimeout(() => {
                    window.location.href = url;
                }, 3000);

            } catch (error) {
                console.error("Verification failed", error);
                setStatus('error');
                // Check for specific error reasons if returned
                setMessage(error.response?.data?.message || 'Verification failed. The link may have expired.');
            }
        };

        verify();
    }, [id, hash, navigate, location.search]);

    return (
        <div className={`min-h-screen relative flex items-center justify-center p-4 overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0B0E14]' : 'bg-slate-50'}`}>

            {/* Theme Toggle */}
            <div className="absolute top-6 right-6 z-50">
                <button
                    onClick={toggleTheme}
                    className={`p-3 rounded-full transition-all duration-300 backdrop-blur-md ${theme === 'dark'
                        ? 'bg-white/5 hover:bg-white/10 text-yellow-400 shadow-lg shadow-yellow-400/10'
                        : 'bg-white/80 hover:bg-white text-slate-700 shadow-lg shadow-slate-200'}`}
                    aria-label="Toggle theme"
                >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </div>

            {/* Background Ambience */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                {theme === 'dark' ? (
                    <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-primary-900/40 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow opacity-30"></div>
                ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-200/40 via-transparent to-transparent opacity-80" />
                )}
            </div>

            <div className="w-full max-w-md relative z-10 animate-fade-in">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block">
                        <img src={logo} alt="OBSOLIO" className="h-16 mx-auto object-contain" />
                    </Link>
                </div>

                <div className={`p-8 rounded-3xl relative overflow-hidden text-center transition-all duration-300 ${theme === 'dark'
                    ? 'glass-card shadow-2xl border border-white/10 backdrop-blur-xl bg-[#1e293b]/40'
                    : 'bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.12)]'}`}>

                    {/* Decor glow (Dark Mode Only) */}
                    {theme === 'dark' && (
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50"></div>
                    )}

                    {status === 'verifying' && (
                        <div className="py-8">
                            <div className="relative w-20 h-20 mx-auto mb-6">
                                <div className={`absolute inset-0 border-4 rounded-full ${theme === 'dark' ? 'border-primary-500/30' : 'border-primary-200'}`}></div>
                                <div className="absolute inset-0 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <h2 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Verifying...</h2>
                            <p className={theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}>Validating your security token</p>
                        </div>
                    )}

                    {status === 'success' && (
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-4">
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${theme === 'dark' ? 'bg-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.2)]' : 'bg-green-100 shadow-sm'}`}>
                                <CheckCircle className={`w-10 h-10 ${theme === 'dark' ? 'text-green-500' : 'text-green-600'}`} />
                            </div>
                            <h2 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Verified!</h2>
                            <p className={`mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>{message}</p>

                            <button
                                onClick={() => window.location.href = targetUrl}
                                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-primary-500/25"
                            >
                                Continue to Workspace <ArrowRight size={18} />
                            </button>

                            <p className={`text-xs mt-4 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>
                                Redirecting automatically...
                            </p>
                        </motion.div>
                    )}

                    {status === 'error' && (
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="py-4">
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${theme === 'dark' ? 'bg-red-500/20' : 'bg-red-100'}`}>
                                <XCircle className={`w-10 h-10 ${theme === 'dark' ? 'text-red-500' : 'text-red-600'}`} />
                            </div>
                            <h2 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Verification Failed</h2>
                            <p className={`mb-8 ${theme === 'dark' ? 'text-red-300' : 'text-red-600'}`}>{message}</p>

                            <Link
                                to="/resend-verification"
                                className={`block w-full py-3.5 px-4 font-semibold rounded-xl transition-all border ${theme === 'dark'
                                    ? 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'}`}
                            >
                                Resend Verification Link
                            </Link>
                        </motion.div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default EmailVerificationPage;
