import { useState } from 'react';
import { Plus, Edit, Trash2, CheckCircle, XCircle, Send, Copy, Check } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Badge from '../../components/common/Badge/Badge';
import FormModal from '../../components/common/FormModal';
import ConfirmDialog from '../../components/common/ConfirmDialog';

const WebhooksPage = () => {
  const [webhooks, setWebhooks] = useState([
    {
      id: 1,
      name: 'Job Completion Notification',
      url: 'https://example.com/webhooks/job-complete',
      events: ['job.completed', 'job.failed'],
      status: 'active',
      lastTriggered: '2 hours ago',
      description: 'Notifies when jobs complete or fail',
      secretKey: 'whsec_' + 'a'.repeat(32)
    },
    {
      id: 2,
      name: 'Approval Request',
      url: 'https://example.com/webhooks/approval',
      events: ['approval.requested'],
      status: 'active',
      lastTriggered: '1 day ago',
      description: 'Sends approval request notifications',
      secretKey: 'whsec_' + 'b'.repeat(32)
    },
    {
      id: 3,
      name: 'Error Alerts',
      url: 'https://example.com/webhooks/errors',
      events: ['error.occurred'],
      status: 'inactive',
      lastTriggered: 'Never',
      description: 'Alerts on system errors',
      secretKey: 'whsec_' + 'c'.repeat(32)
    }
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [editingWebhook, setEditingWebhook] = useState(null);
  const [deletingWebhook, setDeletingWebhook] = useState(null);
  const [testingWebhook, setTestingWebhook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState(null);
  const [newWebhookSecret, setNewWebhookSecret] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    url: '',
    events: [],
    description: '',
    status: 'active'
  });

  const availableEvents = [
    { id: 'agent.deployed', label: 'Agent Deployed' },
    { id: 'agent.updated', label: 'Agent Updated' },
    { id: 'job.started', label: 'Job Started' },
    { id: 'job.completed', label: 'Job Completed' },
    { id: 'job.failed', label: 'Job Failed' },
    { id: 'approval.requested', label: 'Approval Requested' },
    { id: 'approval.approved', label: 'Approval Approved' },
    { id: 'approval.rejected', label: 'Approval Rejected' },
    { id: 'error.occurred', label: 'Error Occurred' },
    { id: 'workflow.executed', label: 'Workflow Executed' }
  ];

  const generateSecretKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = 'whsec_';
    for (let i = 0; i < 32; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
  };

  const handleCreateWebhook = () => {
    setFormData({
      name: '',
      url: '',
      events: [],
      description: '',
      status: 'active'
    });
    setIsCreateModalOpen(true);
  };

  const handleSubmitNewWebhook = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      alert('Please enter a webhook name');
      return;
    }
    if (!formData.url.trim()) {
      alert('Please enter a webhook URL');
      return;
    }
    // URL validation
    try {
      new URL(formData.url);
    } catch {
      alert('Please enter a valid URL');
      return;
    }
    if (formData.events.length === 0) {
      alert('Please select at least one event');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const secretKey = generateSecretKey();
      const newWebhook = {
        id: webhooks.length + 1,
        ...formData,
        secretKey,
        lastTriggered: 'Never',
        createdAt: new Date().toISOString()
      };

      setWebhooks([...webhooks, newWebhook]);
      setNewWebhookSecret(secretKey);
      setIsCreateModalOpen(false);
      setIsLoading(false);
    }, 500);
  };

  const handleEditWebhook = (webhook) => {
    setEditingWebhook(webhook);
    setFormData({
      name: webhook.name,
      url: webhook.url,
      events: webhook.events,
      description: webhook.description || '',
      status: webhook.status
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateWebhook = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      alert('Please enter a webhook name');
      return;
    }
    if (!formData.url.trim()) {
      alert('Please enter a webhook URL');
      return;
    }
    try {
      new URL(formData.url);
    } catch {
      alert('Please enter a valid URL');
      return;
    }
    if (formData.events.length === 0) {
      alert('Please select at least one event');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const updatedWebhook = {
        ...editingWebhook,
        ...formData
      };

      setWebhooks(webhooks.map(w => w.id === editingWebhook.id ? updatedWebhook : w));
      setIsEditModalOpen(false);
      setEditingWebhook(null);
      setIsLoading(false);
    }, 500);
  };

  const handleDeleteWebhook = (webhook) => {
    setDeletingWebhook(webhook);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsLoading(true);

    setTimeout(() => {
      setWebhooks(webhooks.filter(w => w.id !== deletingWebhook.id));
      setIsDeleteModalOpen(false);
      setDeletingWebhook(null);
      setIsLoading(false);
    }, 500);
  };

  const handleToggleStatus = async (webhook) => {
    setIsLoading(true);

    setTimeout(() => {
      const newStatus = webhook.status === 'active' ? 'inactive' : 'active';
      setWebhooks(webhooks.map(w =>
        w.id === webhook.id ? { ...w, status: newStatus } : w
      ));
      setIsLoading(false);
    }, 500);
  };

  const handleTestWebhook = (webhook) => {
    setTestingWebhook(webhook);
    setIsTestModalOpen(true);
  };

  const handleConfirmTest = async () => {
    setIsLoading(true);

    setTimeout(() => {
      // Update lastTriggered
      setWebhooks(webhooks.map(w =>
        w.id === testingWebhook.id ? { ...w, lastTriggered: 'Just now' } : w
      ));
      setIsTestModalOpen(false);
      setTestingWebhook(null);
      setIsLoading(false);
      alert('Test webhook sent successfully!');
    }, 1000);
  };

  const handleCopySecret = async (secretKey, id) => {
    await navigator.clipboard.writeText(secretKey);
    setCopiedSecret(id);
    setTimeout(() => setCopiedSecret(null), 2000);
  };

  const handleEventToggle = (eventId) => {
    if (formData.events.includes(eventId)) {
      setFormData({
        ...formData,
        events: formData.events.filter(e => e !== eventId)
      });
    } else {
      setFormData({
        ...formData,
        events: [...formData.events, eventId]
      });
    }
  };

  const handleCloseSecretModal = () => {
    setNewWebhookSecret(null);
  };

  return (
    <MainLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Webhooks</h1>
          <p className="text-secondary-600">
            Configure webhooks to receive real-time notifications
          </p>
        </div>

        <div className="flex justify-end mb-6">
          <Button onClick={handleCreateWebhook} icon={<Plus className="w-4 h-4" />}>
            Create Webhook
          </Button>
        </div>

        <div className="space-y-4">
          {webhooks.map((webhook) => (
            <Card key={webhook.id} className="hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-secondary-900">
                        {webhook.name}
                      </h3>
                      <Badge color={webhook.status === 'active' ? 'green' : 'gray'}>
                        {webhook.status}
                      </Badge>
                      {webhook.status === 'active' ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <code className="text-sm text-secondary-600 bg-gray-100 px-2 py-1 rounded">
                      {webhook.url}
                    </code>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Events:</p>
                  <div className="flex flex-wrap gap-2">
                    {webhook.events.map((event, idx) => (
                      <Badge key={idx} color="blue">{event}</Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <p className="text-sm text-secondary-600">
                    Last triggered: <span className="font-medium text-secondary-900">{webhook.lastTriggered}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleTestWebhook(webhook)}
                      icon={<Send className="w-4 h-4" />}
                    >
                      Test
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleStatus(webhook)}
                    >
                      {webhook.status === 'active' ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditWebhook(webhook)}
                      icon={<Edit className="w-4 h-4" />}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteWebhook(webhook)}
                      icon={<Trash2 className="w-4 h-4" />}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Create/Edit Modal */}
        <FormModal
          isOpen={isCreateModalOpen || isEditModalOpen}
          onClose={() => {
            setIsCreateModalOpen(false);
            setIsEditModalOpen(false);
            setEditingWebhook(null);
          }}
          onSubmit={isCreateModalOpen ? handleSubmitNewWebhook : handleUpdateWebhook}
          title={isCreateModalOpen ? 'Create Webhook' : 'Edit Webhook'}
          submitText={isCreateModalOpen ? 'Create Webhook' : 'Update Webhook'}
          isLoading={isLoading}
          size="lg"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-secondary-900 mb-2">
                Webhook Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., Job Completion Notification"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-900 mb-2">
                Webhook URL *
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="https://your-domain.com/webhooks/endpoint"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-900 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                rows="3"
                placeholder="What does this webhook do?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-900 mb-2">
                Events to Subscribe * (Select at least one)
              </label>
              <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto p-3 bg-gray-50 rounded-xl border border-gray-200">
                {availableEvents.map((event) => (
                  <label
                    key={event.id}
                    className="flex items-center gap-2 cursor-pointer hover:bg-white p-2 rounded-lg transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.events.includes(event.id)}
                      onChange={() => handleEventToggle(event.id)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-secondary-700">{event.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-900 mb-2">
                Status
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={formData.status === 'active'}
                    onChange={() => setFormData({ ...formData, status: 'active' })}
                    className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                  />
                  <span className="text-sm text-secondary-700">Active</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={formData.status === 'inactive'}
                    onChange={() => setFormData({ ...formData, status: 'inactive' })}
                    className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                  />
                  <span className="text-sm text-secondary-700">Inactive</span>
                </label>
              </div>
            </div>

            {editingWebhook && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-900 mb-1">Secret Key</p>
                    <code className="text-xs text-blue-700 bg-white px-2 py-1 rounded border border-blue-200">
                      {editingWebhook.secretKey}
                    </code>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopySecret(editingWebhook.secretKey, editingWebhook.id)}
                    icon={copiedSecret === editingWebhook.id ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  >
                    {copiedSecret === editingWebhook.id ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </FormModal>

        {/* Delete Confirmation */}
        <ConfirmDialog
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeletingWebhook(null);
          }}
          onConfirm={handleConfirmDelete}
          title="Delete Webhook"
          message={
            deletingWebhook
              ? `Are you sure you want to delete "${deletingWebhook.name}"? This action cannot be undone and will stop all webhook notifications.`
              : ''
          }
          confirmText="Delete Webhook"
          confirmVariant="danger"
          isLoading={isLoading}
        />

        {/* Test Webhook Confirmation */}
        <ConfirmDialog
          isOpen={isTestModalOpen}
          onClose={() => {
            setIsTestModalOpen(false);
            setTestingWebhook(null);
          }}
          onConfirm={handleConfirmTest}
          title="Test Webhook"
          message={
            testingWebhook
              ? `Send a test event to "${testingWebhook.name}"?\n\nURL: ${testingWebhook.url}\n\nThis will trigger a sample payload to verify your webhook is working correctly.`
              : ''
          }
          confirmText="Send Test Event"
          confirmVariant="primary"
          isLoading={isLoading}
        />

        {/* New Webhook Secret Modal */}
        {newWebhookSecret && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={handleCloseSecretModal}
            />
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg transform transition-all">
                <div className="p-6">
                  <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-center text-secondary-900 mb-2">
                    Webhook Created Successfully!
                  </h2>
                  <p className="text-center text-secondary-600 mb-6">
                    Your webhook has been created. Please save the secret key below - it won't be shown again.
                  </p>

                  <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 mb-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-yellow-900 text-sm font-bold">!</span>
                      </div>
                      <div>
                        <p className="font-semibold text-yellow-900 mb-1">Important Security Notice</p>
                        <p className="text-sm text-yellow-800">
                          This secret key will only be displayed once. Please copy it now and store it securely.
                          You'll need it to verify webhook signatures.
                        </p>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-3 border border-yellow-300">
                      <p className="text-xs text-gray-600 mb-1">Secret Key:</p>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 text-sm font-mono text-secondary-900 break-all">
                          {newWebhookSecret}
                        </code>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            navigator.clipboard.writeText(newWebhookSecret);
                            alert('Secret key copied to clipboard!');
                          }}
                          icon={<Copy className="w-4 h-4" />}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Button onClick={handleCloseSecretModal}>
                      I've Saved the Secret Key
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default WebhooksPage;
