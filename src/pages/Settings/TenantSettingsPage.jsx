import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Badge from '../../components/common/Badge/Badge';

const TenantSettingsPage = () => {
  const [tenantInfo, setTenantInfo] = useState({
    name: 'Acme Corporation',
    plan: 'Enterprise',
    domain: 'acme.aasim.ai',
    adminEmail: 'admin@acme.com',
    maxUsers: 100,
    currentUsers: 47,
    storageLimit: '1TB',
    storageUsed: '450GB'
  });

  const [settings, setSettings] = useState({
    enableSSO: true,
    enableMFA: true,
    enableAuditLogs: true,
    dataRetention: 90,
    allowPublicAgents: true,
    allowPrivateAgents: true
  });

  const handleSave = () => {
    console.log('Saving tenant settings:', { tenantInfo, settings });
    // TODO: Implement actual save logic
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tenant Settings</h1>
        <p className="text-gray-600 mt-2">
          Manage your organization's configuration and preferences
        </p>
      </div>

      {/* Tenant Overview */}
      <Card>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{tenantInfo.name}</h2>
            <p className="text-sm text-gray-600 mt-1">{tenantInfo.domain}</p>
          </div>
          <Badge variant="success" size="lg">{tenantInfo.plan}</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-600">Users</p>
            <p className="text-2xl font-bold text-gray-900">
              {tenantInfo.currentUsers} / {tenantInfo.maxUsers}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Storage</p>
            <p className="text-2xl font-bold text-gray-900">
              {tenantInfo.storageUsed} / {tenantInfo.storageLimit}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Admin Email</p>
            <p className="text-sm font-medium text-gray-900 mt-2">{tenantInfo.adminEmail}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Plan Type</p>
            <p className="text-sm font-medium text-gray-900 mt-2">{tenantInfo.plan}</p>
          </div>
        </div>
      </Card>

      {/* Basic Information */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organization Name
            </label>
            <input
              type="text"
              value={tenantInfo.name}
              onChange={(e) => setTenantInfo({ ...tenantInfo, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Domain
            </label>
            <input
              type="text"
              value={tenantInfo.domain}
              onChange={(e) => setTenantInfo({ ...tenantInfo, domain: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin Email
            </label>
            <input
              type="email"
              value={tenantInfo.adminEmail}
              onChange={(e) => setTenantInfo({ ...tenantInfo, adminEmail: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security & Compliance</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Single Sign-On (SSO)</p>
              <p className="text-sm text-gray-600">Enable SAML/OAuth authentication</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableSSO}
                onChange={(e) => setSettings({ ...settings, enableSSO: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Multi-Factor Authentication</p>
              <p className="text-sm text-gray-600">Require MFA for all users</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableMFA}
                onChange={(e) => setSettings({ ...settings, enableMFA: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Audit Logs</p>
              <p className="text-sm text-gray-600">Track all system activities</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableAuditLogs}
                onChange={(e) => setSettings({ ...settings, enableAuditLogs: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Retention (days)
            </label>
            <input
              type="number"
              value={settings.dataRetention}
              onChange={(e) => setSettings({ ...settings, dataRetention: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </Card>

      {/* Agent Permissions */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Agent Permissions</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Allow Public Agents</p>
              <p className="text-sm text-gray-600">Users can deploy public marketplace agents</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.allowPublicAgents}
                onChange={(e) => setSettings({ ...settings, allowPublicAgents: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Allow Private Agents</p>
              <p className="text-sm text-gray-600">Users can create custom private agents</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.allowPrivateAgents}
                onChange={(e) => setSettings({ ...settings, allowPrivateAgents: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex items-center gap-3">
        <Button onClick={handleSave}>
          Save Settings
        </Button>
        <Button variant="ghost">
          Cancel
        </Button>
      </div>
      </div>
    </MainLayout>
  );
};

export default TenantSettingsPage;
