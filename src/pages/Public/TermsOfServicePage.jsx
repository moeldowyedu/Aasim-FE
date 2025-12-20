import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { useTheme } from '../../contexts/ThemeContext';

const TermsOfServicePage = () => {
    const { theme } = useTheme();

    return (
        <MainLayout showSidebar={false} showFooter={true} theme={theme}>
            <div className={`min-h-screen font-sans selection:bg-primary-500/30 ${theme === 'dark' ? 'bg-[#0B0E14] text-gray-300' : 'bg-slate-50 text-slate-600'}`}>

                {/* Header Section */}
                <div className="relative pt-32 pb-16 overflow-hidden">
                    <div className={`absolute inset-0 bg-[size:32px_32px] ${theme === 'dark' ? 'bg-grid-white/[0.02]' : 'bg-grid-slate-900/[0.04]'}`} />
                    {theme === 'dark' && (
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
                    )}

                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm font-medium mb-6 animate-fadeIn">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                            Legal Documentation
                        </div>
                        <h1 className={`text-4xl md:text-5xl font-bold mb-6 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-200">Service</span>
                        </h1>
                        <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                            Please read these terms carefully before using the Obsolio platform.
                        </p>
                        <p className="mt-4 text-sm text-gray-500">
                            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>
                </div>

                {/* Content Section */}
                <div className="container mx-auto px-6 pb-24">
                    <div className={`max-w-4xl mx-auto backdrop-blur-sm border rounded-3xl p-8 md:p-12 shadow-2xl ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)]'}`}>

                        <div className={`prose prose-lg max-w-none hover:prose-a:text-primary-300 ${theme === 'dark' ? 'prose-invert prose-headings:text-white prose-strong:text-white prose-a:text-primary-400' : 'prose-slate prose-headings:text-slate-900 prose-strong:text-slate-900 prose-a:text-primary-600'}`}>
                            <section className="mb-12">
                                <h2>1. Acceptance of Terms</h2>
                                <p>
                                    By accessing and using the Obsolio website and services (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                                </p>
                            </section>

                            <div className={`w-full h-px my-8 ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-100'}`} />

                            <section className="mb-12">
                                <h2>2. Description of Service</h2>
                                <p>
                                    Obsolio provides a suite of AI-powered tools for business automation, analysis, and orchestration (the "Service"). You understand and agree that the Service is provided "AS-IS" and that Obsolio assumes no responsibility for the timeliness, deletion, mis-delivery or failure to store any user communications or personalization settings.
                                </p>
                            </section>

                            <div className={`w-full h-px my-8 ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-100'}`} />

                            <section className="mb-12">
                                <h2>3. User Account</h2>
                                <p>
                                    To access certain features of the Service, you must register for an account. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account or password.
                                </p>
                                <p className="mt-4">
                                    Obsolio reserves the right to refuse service, terminate accounts, remove or edit content, or cancel orders in its sole discretion.
                                </p>
                            </section>

                            <div className={`w-full h-px my-8 ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-100'}`} />

                            <section className="mb-12">
                                <h2>4. Intellectual Property</h2>
                                <p>
                                    The Service and its original content, features, and functionality are and will remain the exclusive property of Obsolio and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Obsolio.
                                </p>
                            </section>

                            <div className={`w-full h-px my-8 ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-100'}`} />

                            <section className="mb-12">
                                <h2>5. Termination</h2>
                                <p>
                                    We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
                                </p>
                            </section>

                            <div className={`w-full h-px my-8 ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-100'}`} />

                            <section className="mb-12">
                                <h2>6. Contact Us</h2>
                                <p>
                                    If you have any questions about these Terms, please contact us at:
                                </p>
                                <div className={`rounded-xl p-6 border mt-6 inline-block ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                                    <p className={`m-0 text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Obsolio Legal Team</p>
                                    <a href="mailto:info@obsolio.com" className={`transition-colors no-underline text-lg ${theme === 'dark' ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'}`}>
                                        info@obsolio.com
                                    </a>
                                </div>
                            </section>
                        </div>

                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default TermsOfServicePage;
