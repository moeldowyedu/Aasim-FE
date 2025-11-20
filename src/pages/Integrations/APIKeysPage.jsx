import { useState } from 'react';
import { Plus, Copy, Trash2, Eye, EyeOff, Check } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Badge from '../../components/common/Badge/Badge';
import FormModal from '../../components/common/FormModal';
import ConfirmDialog from '../../components/common/ConfirmDialog';

const APIKeysPage = () => {
  const [showKey, setShowKey] = useState({});
  const [apiKeys, setApiKeys] = useState([
    {
      id: 1,
      name: 'Production API Key',
      key: 'aas_prod_xxxxxxxxxxxxxxxxxxxxxxxxxxx',
      permissions: ['agents:read', 'agents:write', 'jobs:execute'],
      createdAt: '2024-01-10',
      lastUsed: '2 hours ago',
      status: 'active'
    },
    {
      id: 2,
      name: 'Development API Key',
      key: 'aas_dev_yyyyyyyyyyyyyyyyyyyyyyyyyy',
      permissions: ['agents:read', 'jobs:execute'],
      createdAt: '2024-01-05',
      lastUsed: '1 day ago',
      status: 'active'
    }
  ]);

  // CREATE states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  // Show newly created key
  const [newlyCreatedKey, setNewlyCreatedKey] = useState(null);
  const [isShowKeyModalOpen, setIsShowKeyModalOpen] = useState(false);

  // REVOKE states
  const [revokingKey, setRevokingKey] = useState(null);
  const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false);

  // COPY feedback
  const [copiedKeyId, setCopiedKeyId] = useState(null);

  const availablePermissions = [
    'agents:read',
    'agents:write',
    'jobs:execute',
    'workflows:manage',
    'billing:read'
  ];

  // Generate API Key
  const generateApiKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = 'ak_';
    for (let i = 0; i < 32; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
  };

  const toggleShowKey = (id) => {
    setShowKey(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // CREATE: Open create modal
  const handleCreateKey = () => {
    setNewKeyName('');
    setSelectedPermissions([]);
    setFormErrors({});
    setIsCreateModalOpen(true);
  };

  // CREATE: Toggle permission
  const handlePermissionToggle = (permission) => {
    setSelectedPermissions(prev => {
      if (prev.includes(permission)) {
        return prev.filter(p => p !== permission);
      } else {
        return [...prev, permission];
      }
    });
    // Clear permission error when user selects a permission
    if (formErrors.permissions) {
      setFormErrors(prev => ({ ...prev, permissions: null }));
    }
  };

  // CREATE: Validate form
  const validateForm = () => {
    const errors = {};

    if (!newKeyName.trim()) {
      errors.name = 'API Key name is required';
    }

    if (selectedPermissions.length === 0) {
      errors.permissions = 'At least one permission must be selected';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // CREATE: Submit new key
  const handleSubmitNewKey = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call with 500ms delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const newKey = {
      id: apiKeys.length > 0 ? Math.max(...apiKeys.map(k => k.id)) + 1 : 1,
      name: newKeyName.trim(),
      key: generateApiKey(),
      permissions: [...selectedPermissions],
      createdAt: new Date().toISOString().split('T')[0],
      lastUsed: null,
      status: 'active'
    };

    setApiKeys(prev => [...prev, newKey]);
    setIsLoading(false);
    setIsCreateModalOpen(false);

    // Show the newly created key
    setNewlyCreatedKey(newKey);
    setIsShowKeyModalOpen(true);
  };

  // COPY: Copy API key to clipboard
  const handleCopyKey = async (key, id) => {
    try {
      await navigator.clipboard.writeText(key);
      setCopiedKeyId(id);

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopiedKeyId(null);
      }, 2000);
    } catch (err) {
      alert('Failed to copy API key to clipboard');
      console.error('Failed to copy:', err);
    }
  };

  // REVOKE: Open revoke confirmation
  const handleRevokeKey = (apiKey) => {
    setRevokingKey(apiKey);
    setIsRevokeModalOpen(true);
  };

  // REVOKE: Confirm and delete key
  const handleConfirmRevoke = async () => {
    if (!revokingKey) return;

    setIsLoading(true);

    // Simulate API call with 500ms delay
    await new Promise(resolve => setTimeout(resolve, 500));

    setApiKeys(prev => prev.filter(key => key.id !== revokingKey.id));
    setIsLoading(false);
    setIsRevokeModalOpen(false);
    setRevokingKey(null);
  };

  // Close newly created key modal
  const handleCloseNewKeyModal = () => {
    setIsShowKeyModalOpen(false);
    setNewlyCreatedKey(null);
  };

  return (
    <MainLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">API Keys</h1>
          <p className="text-secondary-600">
            Manage your API keys for programmatic access
          </p>
        </div>

        <div className="flex justify-end mb-6">
          <Button
            icon={<Plus className="w-4 h-4" />}
            onClick={handleCreateKey}
          >
            Create API Key
          </Button>
        </div>

        <div className="space-y-4">
          {apiKeys.length === 0 ? (
            <Card>
              <div className="p-12 text-center">
                <p className="text-secondary-600">No API keys created yet. Create your first API key to get started.</p>
              </div>
            </Card>
          ) : (
            apiKeys.map((apiKey) => (
              <Card key={apiKey.id}>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-secondary-900">
                          {apiKey.name}
                        </h3>
                        <Badge color="green">{apiKey.status}</Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <code className="text-sm bg-gray-100 px-3 py-1 rounded font-mono">
                          {showKey[apiKey.id] ? apiKey.key : '••••••••••••••••••••••••••••••'}
                        </code>
                        <button
                          onClick={() => toggleShowKey(apiKey.id)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                          title={showKey[apiKey.id] ? 'Hide key' : 'Show key'}
                        >
                          {showKey[apiKey.id] ? (
                            <EyeOff className="w-4 h-4 text-secondary-600" />
                          ) : (
                            <Eye className="w-4 h-4 text-secondary-600" />
                          )}
                        </button>
                        <button
                          onClick={() => handleCopyKey(apiKey.key, apiKey.id)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors relative"
                          title="Copy to clipboard"
                        >
                          {copiedKeyId === apiKey.id ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4 text-secondary-600" />
                          )}
                        </button>
                      </div>
                      {apiKey.permissions && apiKey.permissions.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {apiKey.permissions.map(perm => (
                            <span
                              key={perm}
                              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                            >
                              {perm}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      icon={<Trash2 className="w-4 h-4" />}
                      onClick={() => handleRevokeKey(apiKey)}
                    >
                      Revoke
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Created</p>
                      <p className="font-medium text-secondary-900">{apiKey.createdAt}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Last Used</p>
                      <p className="font-medium text-secondary-900">{apiKey.lastUsed || 'Never'}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* CREATE MODAL */}
      <FormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleSubmitNewKey}
        title="Create API Key"
        size="md"
        submitText="Create API Key"
        isLoading={isLoading}
      >
        <div className="space-y-4">
          <div>
            <label className="block font-medium text-secondary-900 mb-2">
              API Key Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={newKeyName}
              onChange={(e) => {
                setNewKeyName(e.target.value);
                if (formErrors.name) {
                  setFormErrors(prev => ({ ...prev, name: null }));
                }
              }}
              placeholder="e.g., Production Server, Dev Environment"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                formErrors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.name && (
              <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-secondary-900 mb-2">
              Permissions <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {availablePermissions.map(perm => (
                <label key={perm} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedPermissions.includes(perm)}
                    onChange={() => handlePermissionToggle(perm)}
                    className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                  />
                  <span className="text-sm text-secondary-700">{perm}</span>
                </label>
              ))}
            </div>
            {formErrors.permissions && (
              <p className="mt-1 text-sm text-red-600">{formErrors.permissions}</p>
            )}
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> Copy your API key immediately after creation. You won't be able to see it again.
            </p>
          </div>
        </div>
      </FormModal>

      {/* SHOW NEWLY CREATED KEY MODAL */}
      <FormModal
        isOpen={isShowKeyModalOpen}
        onClose={handleCloseNewKeyModal}
        onSubmit={handleCloseNewKeyModal}
        title="API Key Created Successfully"
        size="md"
        submitText="Done"
        showCancel={false}
      >
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800 mb-3">
              <strong>Success!</strong> Your API key has been created. Make sure to copy it now as you won't be able to see it again.
            </p>
            {newlyCreatedKey && (
              <div className="bg-white border border-green-300 rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-secondary-900">
                    {newlyCreatedKey.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-sm bg-gray-100 px-3 py-2 rounded font-mono break-all">
                    {newlyCreatedKey.key}
                  </code>
                  <button
                    onClick={() => handleCopyKey(newlyCreatedKey.key, newlyCreatedKey.id)}
                    className="p-2 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
                    title="Copy to clipboard"
                  >
                    {copiedKeyId === newlyCreatedKey.id ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5 text-secondary-600" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {newlyCreatedKey && newlyCreatedKey.permissions && (
            <div>
              <label className="block font-medium text-secondary-900 mb-2">Permissions</label>
              <div className="flex flex-wrap gap-2">
                {newlyCreatedKey.permissions.map(perm => (
                  <span
                    key={perm}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                  >
                    {perm}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-sm text-amber-800">
              <strong>Security Notice:</strong> Store this key securely. Anyone with this key can access your account with the selected permissions.
            </p>
          </div>
        </div>
      </FormModal>

      {/* REVOKE CONFIRMATION DIALOG */}
      <ConfirmDialog
        isOpen={isRevokeModalOpen}
        onClose={() => setIsRevokeModalOpen(false)}
        onConfirm={handleConfirmRevoke}
        title="Revoke API Key"
        message={
          revokingKey ? (
            <div className="space-y-2">
              <p>Are you sure you want to revoke the API key:</p>
              <p className="font-semibold text-secondary-900">{revokingKey.name}</p>
              <p className="text-sm text-secondary-600">
                This action cannot be undone. Any applications using this key will immediately lose access.
              </p>
            </div>
          ) : null
        }
        confirmText="Revoke Key"
        variant="danger"
        isLoading={isLoading}
      />
    </MainLayout>
  );
};

export default APIKeysPage;
