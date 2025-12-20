import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { useTheme } from '../../contexts/ThemeContext';

const PrivacyPolicyPage = () => {
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
                            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-200">Policy</span>
                        </h1>
                        <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                            We are committed to protecting your personal data and ensuring transparency in how we handle it.
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
                                <h2>1. Introduction</h2>
                                <p>
                                    Welcome to Obsolio ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and use our SaaS platform, and tell you about your privacy rights and how the law protects you.
                                </p>
                            </section>

                            <div className={`w-full h-px my-8 ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-100'}`} />

                            <section className="mb-12">
                                <h2>2. Data We Collect</h2>
                                <p>
                                    We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                                </p>
                                <ul className="space-y-2 mt-4 ml-4 list-disc marker:text-primary-500">
                                    <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                                    <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                                    <li><strong>Financial Data:</strong> includes bank account and payment card details.</li>
                                    <li><strong>Transaction Data:</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
                                    <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform on the devices you use to access this website.</li>
                                </ul>
                            </section>

                            <div className={`w-full h-px my-8 ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-100'}`} />

                            <section className="mb-12">
                                <h2>3. How We Use Your Data</h2>
                                <p>
                                    We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                                </p>
                                <ul className="space-y-2 mt-4 ml-4 list-disc marker:text-primary-500">
                                    <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                                    <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                                    <li>Where we need to comply with a legal or regulatory obligation.</li>
                                </ul>
                            </section>

                            <div className={`w-full h-px my-8 ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-100'}`} />

                            <section className="mb-12">
                                <h2>4. Data Security</h2>
                                <p>
                                    We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know. They will only process your personal data on our instructions and they are subject to a duty of confidentiality.
                                </p>
                            </section>

                            <div className={`w-full h-px my-8 ${theme === 'dark' ? 'bg-white/10' : 'bg-slate-100'}`} />

                            <section className="mb-12">
                                <h2>5. Contact Us</h2>
                                <p>
                                    If you have any questions about this privacy policy or our privacy practices, please contact us at:
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

export default PrivacyPolicyPage;
