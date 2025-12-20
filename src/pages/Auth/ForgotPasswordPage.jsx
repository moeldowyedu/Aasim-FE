import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { Button, Input, Card } from '../../components/common';
import { authService } from '../../services';
import toast from 'react-hot-toast';
import { useTheme } from '../../contexts/ThemeContext';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { theme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authService.forgotPassword(email);
      setIsSubmitted(true);
      toast.success('Password reset link sent to your email');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout showFooter={false} showSidebar={false} theme={theme}>
      <div className={`min-h-[80vh] flex items-center justify-center px-6 py-12 ${theme === 'dark' ? 'bg-[#0B0E14]' : 'bg-slate-50'}`}>
        <div className="w-full max-w-md">
          <Card padding="lg">
            <div className="text-center mb-8">
              <h1 className={`text-4xl font-heading font-bold mb-2 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Forgot Password?</h1>
              <p className={`font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                {isSubmitted
                  ? 'Check your email for reset instructions'
                  : 'Enter your email to reset your password'}
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  fullWidth
                  required
                  theme={theme}
                />

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  loading={isLoading}
                  disabled={isLoading}
                >
                  Send Reset Link
                </Button>
              </form>
            ) : (
              <div className="text-center">
                <div className={`border rounded-xl p-6 mb-6 ${theme === 'dark' ? 'bg-green-900/20 border-green-800' : 'bg-green-50 border-green-200'}`}>
                  <div className="text-5xl mb-4">✓</div>
                  <p className={`font-medium ${theme === 'dark' ? 'text-green-400' : 'text-green-700'}`}>
                    We've sent a password reset link to <strong className={theme === 'dark' ? 'text-white' : 'text-green-900'}>{email}</strong>
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 text-center">
              <Link to="/login" className={`font-semibold transition-colors ${theme === 'dark' ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'}`}>
                ← Back to Login
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ForgotPasswordPage;
