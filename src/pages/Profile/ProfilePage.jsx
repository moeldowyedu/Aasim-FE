import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';
import { useTheme } from '../../contexts/ThemeContext';
import { Card } from '../../components/common';
import {
  User, Bell, Shield, CreditCard, Edit2, CheckCircle,
  Award, Smartphone, Globe, Mail, Phone, Briefcase
} from 'lucide-react';

const ProfilePage = () => {
  const { user } = useAuthStore();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('general');
  const [isEditing, setIsEditing] = useState(false);

  // Styles
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-gray-400' : 'text-slate-500';
  const inputClass = `w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-200 text-slate-900'
    }`;
  const labelClass = `block text-sm font-medium mb-2 ${textSecondary}`;

  const [formData, setFormData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Tech Solutions Inc.',
    jobTitle: 'Senior Developer',
    bio: 'Passionate about AI and machine learning. 5+ years of experience in software development.',
  });

  const [notifications, setNotifications] = useState({
    emailSubmission: true,
    emailEvaluation: true,
    emailWeekly: false,
    pushSubmission: true,
    pushEvaluation: true,
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: '30',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNotificationChange = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const handleSaveNotifications = () => {
    toast.success('Notification preferences saved!');
  };

  const handleSaveSecurity = () => {
    toast.success('Security settings updated!');
  };

  const tabs = [
    { id: 'general', label: 'General', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  return (
    <MainLayout>
      <div className="py-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className={`text-4xl font-bold mb-2 font-heading ${textPrimary}`}>Profile Settings</h1>
          <p className={textSecondary}>Manage your account settings and preferences</p>
        </div>

        {/* Profile Card with Avatar */}
        <Card className="p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-5xl">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Edit2 className="w-4 h-4 text-primary-600" />
              </button>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className={`text-3xl font-bold mb-2 ${textPrimary}`}>{formData.name}</h2>
              <p className={`mb-1 ${textSecondary}`}>{formData.jobTitle} at {formData.company}</p>
              <p className="text-primary-600 font-medium">{formData.email}</p>

              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
                  <Award className="w-3 h-3 mr-1" />
                  Pro Member
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center p-5">
            <div className={`text-3xl font-bold ${textPrimary}`}>124</div>
            <div className={`text-sm mt-1 ${textSecondary}`}>Total Submissions</div>
          </Card>
          <Card className="text-center p-5">
            <div className="text-3xl font-bold text-green-600">98</div>
            <div className={`text-sm mt-1 ${textSecondary}`}>Completed</div>
          </Card>
          <Card className="text-center p-5">
            <div className="text-3xl font-bold text-primary-600">87.5</div>
            <div className={`text-sm mt-1 ${textSecondary}`}>Avg. Score</div>
          </Card>
          <Card className="text-center p-5">
            <div className={`text-3xl font-bold ${textPrimary}`}>156</div>
            <div className={`text-sm mt-1 ${textSecondary}`}>Days Active</div>
          </Card>
        </div>

        {/* Tabs and Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Tabs */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <Card padding="none" className="overflow-hidden">
              <nav className="flex flex-col">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-3 px-6 py-4 text-sm font-semibold transition-colors border-l-4 ${activeTab === tab.id
                        ? `${theme === 'dark' ? 'bg-gray-800 border-primary-500' : 'bg-primary-50 border-primary-600'} text-primary-600`
                        : `border-transparent ${textSecondary} hover:bg-gray-100 dark:hover:bg-gray-800`
                      }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </Card>
          </div>

          {/* Tab Content */}
          <div className="flex-1">
            <Card className="p-8">
              {/* General Tab */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-2xl font-bold ${textPrimary}`}>Personal Information</h3>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className={`px-4 py-2 rounded-lg flex items-center transition-colors ${theme === 'dark'
                            ? 'bg-gray-800 text-white hover:bg-gray-700'
                            : 'bg-white border text-slate-700 hover:bg-slate-50'
                          }`}
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit Profile
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>Full Name</label>
                      <div className="relative">
                        <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${textSecondary}`} />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`${inputClass} pl-10`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Email Address</label>
                      <div className="relative">
                        <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${textSecondary}`} />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`${inputClass} pl-10`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Phone Number</label>
                      <div className="relative">
                        <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${textSecondary}`} />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`${inputClass} pl-10`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Company</label>
                      <div className="relative">
                        <Briefcase className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${textSecondary}`} />
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`${inputClass} pl-10`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Job Title</label>
                      <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      rows="4"
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {isEditing && (
                    <div className="flex items-center justify-end space-x-3 pt-4">
                      <button
                        onClick={() => setIsEditing(false)}
                        className={`px-6 py-2 rounded-lg font-semibold ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                          }`}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        className="px-6 py-2 rounded-lg font-semibold bg-primary-600 text-white hover:bg-primary-700 shadow-lg transition-all"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h3 className={`text-2xl font-bold mb-6 ${textPrimary}`}>Notification Preferences</h3>

                  <div className="space-y-6">
                    <div>
                      <h4 className={`text-lg font-semibold mb-4 ${textPrimary}`}>Email Notifications</h4>
                      <div className="space-y-4">
                        {[
                          { key: 'emailSubmission', label: 'New Submission', desc: 'Get notified when a new submission is created' },
                          { key: 'emailEvaluation', label: 'Evaluation Complete', desc: 'Get notified when an evaluation is completed' },
                          { key: 'emailWeekly', label: 'Weekly Summary', desc: 'Receive a weekly summary of your activity' }
                        ].map((item) => (
                          <div key={item.key} className="flex items-center justify-between p-4 rounded-lg border border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <div>
                              <p className={`font-medium ${textPrimary}`}>{item.label}</p>
                              <p className={`text-sm ${textSecondary}`}>{item.desc}</p>
                            </div>
                            <button
                              onClick={() => handleNotificationChange(item.key)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications[item.key] ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                                }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications[item.key] ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h4 className={`text-lg font-semibold mb-4 ${textPrimary}`}>Push Notifications</h4>
                      <div className="space-y-4">
                        {[
                          { key: 'pushSubmission', label: 'Submission Updates', desc: 'Push notifications for submission status changes' },
                          { key: 'pushEvaluation', label: 'Evaluation Results', desc: 'Push notifications when results are ready' }
                        ].map((item) => (
                          <div key={item.key} className="flex items-center justify-between p-4 rounded-lg border border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                            <div>
                              <p className={`font-medium ${textPrimary}`}>{item.label}</p>
                              <p className={`text-sm ${textSecondary}`}>{item.desc}</p>
                            </div>
                            <button
                              onClick={() => handleNotificationChange(item.key)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications[item.key] ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                                }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications[item.key] ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-6">
                    <button
                      onClick={handleSaveNotifications}
                      className="px-6 py-2 rounded-lg font-semibold bg-primary-600 text-white hover:bg-primary-700 shadow-lg transition-all"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h3 className={`text-2xl font-bold mb-6 ${textPrimary}`}>Security Settings</h3>

                  <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-slate-50 border-slate-200'}`}>
                    <h4 className={`text-lg font-semibold mb-2 ${textPrimary}`}>Password</h4>
                    <p className={`mb-4 ${textSecondary}`}>Change your password to keep your account secure</p>
                    <button className={`px-4 py-2 rounded-lg border transition-colors ${theme === 'dark' ? 'border-gray-600 hover:bg-gray-700 text-white' : 'border-gray-300 hover:bg-white text-slate-700'
                      }`}>
                      Change Password
                    </button>
                  </div>

                  <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className={`text-lg font-semibold mb-1 ${textPrimary}`}>Two-Factor Authentication</h4>
                        <p className={textSecondary}>Add an extra layer of security to your account</p>
                      </div>
                      <button
                        onClick={() => setSecurity({ ...security, twoFactor: !security.twoFactor })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${security.twoFactor ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${security.twoFactor ? 'translate-x-6' : 'translate-x-1'
                            }`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-slate-50 border-slate-200'}`}>
                    <h4 className={`text-lg font-semibold mb-4 ${textPrimary}`}>Active Sessions</h4>
                    <div className="space-y-3">
                      <div className={`flex items-center justify-between p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-slate-200'}`}>
                        <div className="flex items-center">
                          <Smartphone className="text-green-500 mr-3 w-5 h-5" />
                          <div>
                            <p className={`font-medium ${textPrimary}`}>Current Session</p>
                            <p className={`text-sm ${textSecondary}`}>Chrome on MacOS • New York, USA</p>
                          </div>
                        </div>
                        <span className="text-xs text-green-500 font-semibold px-2 py-1 bg-green-500/10 rounded-full">Active Now</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-6">
                    <button
                      onClick={handleSaveSecurity}
                      className="px-6 py-2 rounded-lg font-semibold bg-primary-600 text-white hover:bg-primary-700 shadow-lg transition-all"
                    >
                      Save Security Settings
                    </button>
                  </div>
                </div>
              )}

              {/* Billing Tab */}
              {activeTab === 'billing' && (
                <div className="space-y-6">
                  <h3 className={`text-2xl font-bold mb-6 ${textPrimary}`}>Billing & Subscription</h3>

                  <div className={`p-6 rounded-xl border-2 border-primary-500 ${theme === 'dark' ? 'bg-primary-900/10' : 'bg-primary-50'}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className={`text-2xl font-bold ${textPrimary}`}>Pro Plan</h4>
                        <p className={textSecondary}>300 evaluations/month</p>
                      </div>
                      <span className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                        Active
                      </span>
                    </div>
                    <div className="flex items-end space-x-2 mb-4">
                      <span className={`text-4xl font-bold ${textPrimary}`}>$250</span>
                      <span className={`mb-1 ${textSecondary}`}>/month</span>
                    </div>
                    <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-white border hover:bg-gray-50 text-slate-700'
                      }`}>
                      Manage Subscription
                    </button>
                  </div>

                  <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-slate-50 border-slate-200'}`}>
                    <h4 className={`text-lg font-semibold mb-4 ${textPrimary}`}>Payment Method</h4>
                    <div className={`flex items-center justify-between p-4 rounded-lg mb-4 ${theme === 'dark' ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-slate-200'}`}>
                      <div className="flex items-center">
                        <CreditCard className={`mr-3 w-5 h-5 ${textSecondary}`} />
                        <div>
                          <p className={`font-medium ${textPrimary}`}>•••• •••• •••• 4242</p>
                          <p className={`text-sm ${textSecondary}`}>Expires 12/25</p>
                        </div>
                      </div>
                      <button className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
                        Edit
                      </button>
                    </div>
                    <button className={`px-6 py-2 rounded-lg font-semibold border transition-colors ${theme === 'dark' ? 'border-gray-600 hover:bg-gray-700 text-white' : 'border-gray-300 hover:bg-white text-slate-700'
                      }`}>
                      Add Payment Method
                    </button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
