import { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import { Card } from '../../components/common';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { translations } from '../../translations';
import { useUserStore } from '../../store/userStore';
import {
  Users, CheckCircle, Star, Ban, Search, UserPlus,
  Shield, Trash2, Clock, Mail
} from 'lucide-react';
import toast from 'react-hot-toast';

const UserManagementPage = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Styles
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-gray-400' : 'text-slate-500';

  // Use backend data from userStore instead of hardcoded data
  const { users, isLoading, fetchUsers, deleteUser, updateUserStatus } = useUserStore();

  useEffect(() => {
    // Fetch users from backend when component mounts
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSuspendUser = async (userId) => {
    try {
      await updateUserStatus(userId, 'suspended');
      toast.success(t.userSuspendedSuccess || 'User suspended successfully');
    } catch (error) {
      toast.error('Failed to suspend user');
    }
  };

  const handleActivateUser = async (userId) => {
    try {
      await updateUserStatus(userId, 'active');
      toast.success(t.userActivatedSuccess || 'User activated successfully');
    } catch (error) {
      toast.error('Failed to activate user');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm(t.deleteUserConfirmation || 'Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        toast.success(t.userDeletedSuccess || 'User deleted successfully');
      } catch (error) {
        toast.error('Failed to delete user');
      }
    }
  };

  const getStatusBadge = (status) => {
    const config = {
      active: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200', icon: CheckCircle },
      suspended: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200', icon: Ban },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200', icon: Clock },
    }[status] || { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200', icon: Clock };

    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const stats = [
    { label: t.totalUsersLabel, value: users.length, icon: Users, color: 'blue' },
    { label: t.activeUsersLabel, value: users.filter(u => u.status === 'active').length, icon: CheckCircle, color: 'green' },
    { label: t.premiumUsersLabel, value: users.filter(u => u.plan === 'Premium').length, icon: Star, color: 'yellow' },
    { label: t.suspendedLabel, value: users.filter(u => u.status === 'suspended').length, icon: Ban, color: 'red' },
  ];

  const COLORS = {
    blue: { bg: 'bg-blue-500', text: 'text-blue-500', lightBg: 'bg-blue-500/20', lightText: 'text-blue-400', paleBg: 'bg-blue-100', paleText: 'text-blue-600' },
    green: { bg: 'bg-green-500', text: 'text-green-500', lightBg: 'bg-green-500/20', lightText: 'text-green-400', paleBg: 'bg-green-100', paleText: 'text-green-600' },
    yellow: { bg: 'bg-yellow-500', text: 'text-yellow-500', lightBg: 'bg-yellow-500/20', lightText: 'text-yellow-400', paleBg: 'bg-yellow-100', paleText: 'text-yellow-600' },
    red: { bg: 'bg-red-500', text: 'text-red-500', lightBg: 'bg-red-500/20', lightText: 'text-red-400', paleBg: 'bg-red-100', paleText: 'text-red-600' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-500', lightBg: 'bg-purple-500/20', lightText: 'text-purple-400', paleBg: 'bg-purple-100', paleText: 'text-purple-600' },
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${textPrimary}`}>{t.userManagementTitle}</h1>
            <p className={textSecondary}>{t.userManagementDesc}</p>
          </div>
          <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all mt-4 md:mt-0">
            <UserPlus className="w-5 h-5" />
            <span className="font-semibold">{t.addNewUserButton}</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colors = COLORS[stat.color];
            return (
              <Card key={index}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${theme === 'dark' ? colors.lightBg : colors.paleBg}`}>
                  <Icon className={`w-6 h-6 ${theme === 'dark' ? colors.lightText : colors.paleText}`} />
                </div>
                <div className={`text-3xl font-bold mb-1 ${textPrimary}`}>{stat.value}</div>
                <div className={`text-sm ${textSecondary}`}>{stat.label}</div>
              </Card>
            );
          })}
        </div>

        {/* Filters */}
        <Card padding="sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${textSecondary}`} />
                <input
                  type="text"
                  placeholder={t.searchUsersPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                      : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                    }`}
                />
              </div>
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-slate-200 text-slate-900'
                }`}
            >
              <option value="all">{t.allRolesOption}</option>
              <option value="user">{t.userRoleOption}</option>
              <option value="admin">{t.adminRoleOption}</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${theme === 'dark'
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-slate-200 text-slate-900'
                }`}
            >
              <option value="all">{t.allStatusOption}</option>
              <option value="active">{t.activeStatusOption}</option>
              <option value="suspended">{t.suspendedStatusOption}</option>
              <option value="pending">{t.pendingStatusOption}</option>
            </select>
          </div>
        </Card>

        {/* Users Table */}
        <Card padding="none" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={theme === 'dark' ? 'bg-gray-900/50' : 'bg-slate-50'}>
                <tr>
                  <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>{t.tableHeaderUser}</th>
                  <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>{t.tableHeaderRole}</th>
                  <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>{t.tableHeaderPlan}</th>
                  <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>{t.tableHeaderStatus}</th>
                  <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>{t.tableHeaderSubmissions}</th>
                  <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>{t.tableHeaderAvgScore}</th>
                  <th className={`text-right py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>{t.tableHeaderActions}</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-800' : 'divide-slate-100'}`}>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className={`py-12 text-center ${textSecondary}`}>
                      {t.noUsersFoundMessage}
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className={`transition-colors ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-slate-50'}`}>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${theme === 'dark' ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
                            <span className="font-semibold text-lg">{user.name[0]}</span>
                          </div>
                          <div>
                            <div className={`font-semibold ${textPrimary}`}>{user.name}</div>
                            <div className={`text-sm ${textSecondary}`}>{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${user.role === 'admin'
                            ? 'bg-purple-100 text-purple-800 border border-purple-200'
                            : 'bg-gray-100 text-gray-800 border border-gray-200'
                          }`}>
                          {user.role === 'admin' && <Shield className="w-3 h-3 mr-1" />}
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${user.plan === 'Premium'
                            ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                            : 'bg-gray-100 text-gray-800 border border-gray-200'
                          }`}>
                          {user.plan === 'Premium' && <Star className="w-3 h-3 mr-1" />}
                          {user.plan}
                        </span>
                      </td>
                      <td className="py-4 px-6">{getStatusBadge(user.status)}</td>
                      <td className="py-4 px-6">
                        <span className={`font-semibold ${textPrimary}`}>{user.submissions}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-purple-500 font-bold">{user.avgScore}</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end space-x-2">
                          {user.status === 'active' ? (
                            <button
                              onClick={() => handleSuspendUser(user.id)}
                              className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-red-50 text-red-600'}`}
                              title="Suspend User"
                            >
                              <Ban className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleActivateUser(user.id)}
                              className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-gray-700 text-green-400' : 'hover:bg-green-50 text-green-600'}`}
                              title="Activate User"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-red-50 text-red-600'}`}
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default UserManagementPage;
