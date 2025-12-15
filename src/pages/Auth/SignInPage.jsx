import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Loader, Mail, AlertCircle, Building, User } from 'lucide-react';
import toast from 'react-hot-toast';
import tenantLookupService from '../../services/tenantLookupService';
import { redirectToTenantLogin } from '../../utils/tenantDetection';

const SignInPage = () => {
    const [step, setStep] = useState('lookup'); // 'lookup', 'selection'
    const [loading, setLoading] = useState(false);
    const [tenants, setTenants] = useState([]);
    const [error, setError] = useState(null);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleLookup = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await tenantLookupService.findTenant(data.email);

            if (response.success) {
                if (response.tenants.length === 0) {
                    setError('No workspaces found for this email.');
                } else if (response.tenants.length === 1) {
                    // Auto-redirect
                    toast.success(`Found your workspace: ${response.tenants[0].name}`);
                    redirectToTenantLogin(response.tenants[0].slug);
                } else {
                    // Show selection
                    setTenants(response.tenants);
                    setStep('selection');
                }
            } else {
                setError('Failed to lookup tenants. Please try again.');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    const handleSelectTenant = (tenant) => {
        redirectToTenantLogin(tenant.slug);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    {/* Logo */}
                    <Link to="/" className="inline-block">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">
                            OBSOLIO
                        </h1>
                    </Link>
                    <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
                        {step === 'lookup' ? 'Sign in to your workspace' : 'Select your workspace'}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {step === 'lookup'
                            ? 'Enter your email to find your existing account.'
                            : `We found ${tenants.length} workspaces associated with your email.`}
                    </p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-xl flex items-center gap-2 text-sm border border-red-100 dark:border-red-900/50"
                    >
                        <AlertCircle size={16} />
                        {error}
                    </motion.div>
                )}

                <div className="mt-8 bg-white dark:bg-gray-800 py-8 px-4 shadow-xl rounded-2xl sm:px-10 border border-gray-100 dark:border-gray-700">

                    {step === 'lookup' && (
                        <form className="space-y-6" onSubmit={handleSubmit(handleLookup)}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Email address
                                </label>
                                <div className="mt-1 relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className={`appearance-none block w-full pl-10 px-3 py-3 border ${errors.email ? 'border-red-300' : 'border-gray-300 dark:border-gray-600'} rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm bg-gray-50 dark:bg-gray-700/50 dark:text-white transition-all`}
                                        placeholder="you@company.com"
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                                >
                                    {loading ? <Loader className="animate-spin h-5 w-5" /> : 'Continue'}
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 'selection' && (
                        <div className="space-y-4">
                            {tenants.map(tenant => (
                                <motion.button
                                    key={tenant.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    onClick={() => handleSelectTenant(tenant)}
                                    className="w-full flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group text-left"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-lg ${tenant.type === 'ORGANIZATION' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'}`}>
                                            {tenant.type === 'ORGANIZATION' ? <Building size={20} /> : <User size={20} />}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white">{tenant.name}</h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{tenant.slug}.obsolio.com</p>
                                        </div>
                                    </div>
                                    <ArrowRight size={18} className="text-gray-400 group-hover:text-primary-500 transform group-hover:translate-x-1 transition-all" />
                                </motion.button>
                            ))}

                            <button
                                onClick={() => setStep('lookup')}
                                className="w-full mt-4 text-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                Use a different email
                            </button>
                        </div>
                    )}

                </div>

                <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400">
                            Get started for free
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
