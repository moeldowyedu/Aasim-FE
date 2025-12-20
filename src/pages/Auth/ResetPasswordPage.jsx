import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { Button, Input, Card } from '../../components/common';
import { authService } from '../../services';
import toast from 'react-hot-toast';
import { useTheme } from '../../contexts/ThemeContext';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const { theme } = useTheme();

  const handleChange = (e) => {
    setPasswordError('');
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      await authService.resetPassword(token, formData.password);
      toast.success('Password reset successful!');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
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
              <h1 className={`text-4xl font-heading font-bold mb-2 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Reset Password</h1>
              <p className={`font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>Enter your new password</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="New Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                fullWidth
                required
                helperText="Must be at least 8 characters"
                theme={theme}
              />

              <Input
                label="Confirm New Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                fullWidth
                required
                error={passwordError}
                theme={theme}
              />

              <Button
                type="submit"
                variant="primary"
                fullWidth
                loading={isLoading}
                disabled={isLoading}
              >
                Reset Password
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default ResetPasswordPage;
