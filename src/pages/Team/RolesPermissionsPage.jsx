import { useState } from 'react';
import {
  Shield,
  Edit,
  Plus,
  Users,
  CheckCircle,
  XCircle,
  Trash2,
} from 'lucide-react';
import Button from '../../components/common/Button/Button';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';
import FormModal from '../../components/common/FormModal';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { useUserManagementStore } from '../../store/userManagementStore';
import MainLayout from '../../components/layout/MainLayout';

const RolesPermissionsPage = () => {
  const { roles: storeRoles } = useUserManagementStore();

  // Convert store roles to mutable state
  const [roles, setRoles] = useState(storeRoles);
  const [selectedRole, setSelectedRole] = useState('admin');

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Data states
  const [editingRole, setEditingRole] = useState(null);
  const [deletingRole, setDeletingRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [],
  });

  const [validationErrors, setValidationErrors] = useState({});

  const permissions = [
    {
      id: 'canViewAllAgents',
      name: 'View All Agents',
      description: 'Access to view all AI agents in the organization',
      category: 'Agents',
    },
    {
      id: 'canCreateAgents',
      name: 'Create Agents',
      description: 'Permission to create and configure new AI agents',
      category: 'Agents',
    },
    {
      id: 'canDeployAgents',
      name: 'Deploy Agents',
      description: 'Permission to deploy and schedule AI agents',
      category: 'Agents',
    },
    {
      id: 'canApproveHITL',
      name: 'Approve HITL Tasks',
      description: 'Access to HITL approval queue and decision-making',
      category: 'HITL',
    },
    {
      id: 'canInviteUsers',
      name: 'Invite Users',
      description: 'Permission to invite new team members',
      category: 'Users',
    },
    {
      id: 'canModifyOrgStructure',
      name: 'Modify Organization Structure',
      description: 'Permission to edit branches, departments, projects, and teams',
      category: 'Organization',
    },
    {
      id: 'canManageBilling',
      name: 'Manage Billing',
      description: 'Access to billing, subscriptions, and payment settings',
      category: 'Billing',
    },
    {
      id: 'canConfigureIntegrations',
      name: 'Configure Integrations',
      description: 'Permission to connect and manage third-party integrations',
      category: 'Integrations',
    },
  ];

  const groupedPermissions = permissions.reduce((acc, perm) => {
    if (!acc[perm.category]) {
      acc[perm.category] = [];
    }
    acc[perm.category].push(perm);
    return acc;
  }, {});

  // Get current role
  const currentRole = roles[selectedRole];

  // Validation
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Role name is required';
    }

    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }

    if (formData.permissions.length === 0) {
      errors.permissions = 'At least one permission must be selected';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      permissions: [],
    });
    setValidationErrors({});
    setEditingRole(null);
  };

  // Handle permission toggle
  const handlePermissionToggle = (permissionId, checked) => {
    setFormData(prev => ({
      ...prev,
      permissions: checked
        ? [...prev.permissions, permissionId]
        : prev.permissions.filter(p => p !== permissionId)
    }));
  };

  // CREATE ROLE
  const handleCreateRole = () => {
    resetForm();
    setIsCreateModalOpen(true);
  };

  const handleSubmitNewRole = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const newRoleId = `custom_${Date.now()}`;
    const newRole = {
      name: formData.name,
      description: formData.description,
      defaultPermissions: permissions.reduce((acc, perm) => {
        acc[perm.id] = formData.permissions.includes(perm.id);
        return acc;
      }, {}),
      type: 'custom',
      userCount: 0,
    };

    setRoles(prev => ({
      ...prev,
      [newRoleId]: newRole,
    }));

    setIsLoading(false);
    setIsCreateModalOpen(false);
    resetForm();
    setSelectedRole(newRoleId);
  };

  // EDIT ROLE
  const handleEditRole = (roleKey) => {
    const role = roles[roleKey];

    // Check if it's a system role
    if (role.type !== 'custom') {
      alert('System roles cannot be edited. Please create a custom role instead.');
      return;
    }

    // Populate form with current role data
    setFormData({
      name: role.name,
      description: role.description,
      permissions: Object.keys(role.defaultPermissions).filter(
        key => role.defaultPermissions[key]
      ),
    });

    setEditingRole(roleKey);
    setIsEditModalOpen(true);
  };

  const handleUpdateRole = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const updatedRole = {
      ...roles[editingRole],
      name: formData.name,
      description: formData.description,
      defaultPermissions: permissions.reduce((acc, perm) => {
        acc[perm.id] = formData.permissions.includes(perm.id);
        return acc;
      }, {}),
    };

    setRoles(prev => ({
      ...prev,
      [editingRole]: updatedRole,
    }));

    setIsLoading(false);
    setIsEditModalOpen(false);
    resetForm();
  };

  // DELETE ROLE
  const handleDeleteRole = (roleKey) => {
    const role = roles[roleKey];

    // Check if it's a system role
    if (role.type !== 'custom') {
      alert('System roles cannot be deleted.');
      return;
    }

    setDeletingRole(roleKey);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const newRoles = { ...roles };
    delete newRoles[deletingRole];
    setRoles(newRoles);

    // Select first available role if deleted role was selected
    if (selectedRole === deletingRole) {
      setSelectedRole(Object.keys(newRoles)[0]);
    }

    setIsLoading(false);
    setIsDeleteModalOpen(false);
    setDeletingRole(null);
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Roles & Permissions</h1>
            <p className="text-secondary-600 mt-1">
              Manage user roles and their permissions
            </p>
          </div>
          <Button
            variant="primary"
            leftIcon={<Plus className="w-5 h-5" />}
            onClick={handleCreateRole}
            disabled={isLoading}
          >
            Create Custom Role
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Roles List */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-secondary-900">Available Roles</h2>
            {Object.keys(roles).map((roleKey) => {
              const role = roles[roleKey];
              const isSelected = selectedRole === roleKey;
              const isCustomRole = role.type === 'custom';

              return (
                <Card
                  key={roleKey}
                  className={`cursor-pointer transition-all ${
                    isSelected
                      ? 'ring-2 ring-primary-500 bg-primary-50'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedRole(roleKey)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className={`w-5 h-5 ${isSelected ? 'text-primary-600' : 'text-gray-400'}`} />
                        <h3 className={`font-semibold ${isSelected ? 'text-primary-900' : 'text-gray-900'}`}>
                          {role.name}
                        </h3>
                        <Badge
                          variant={isCustomRole ? 'warning' : 'info'}
                          className="text-xs"
                        >
                          {isCustomRole ? 'Custom' : 'System'}
                        </Badge>
                      </div>
                      <p className="text-sm text-secondary-600 mb-3">{role.description}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Users className="w-4 h-4" />
                        <span>{role.userCount || 12} users</span>
                      </div>
                    </div>
                    {isSelected && (
                      <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0" />
                    )}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Permissions Detail */}
          <div className="lg:col-span-2 space-y-6">
            {/* Role Header */}
            <Card className="bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold text-primary-900">
                      {currentRole.name}
                    </h2>
                    <Badge
                      variant={currentRole.type === 'custom' ? 'warning' : 'info'}
                    >
                      {currentRole.type === 'custom' ? 'Custom Role' : 'System Role'}
                    </Badge>
                  </div>
                  <p className="text-primary-700">{currentRole.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Edit className="w-4 h-4" />}
                    onClick={() => handleEditRole(selectedRole)}
                    disabled={isLoading}
                  >
                    Edit Role
                  </Button>
                  {currentRole.type === 'custom' && (
                    <Button
                      variant="danger"
                      size="sm"
                      leftIcon={<Trash2 className="w-4 h-4" />}
                      onClick={() => handleDeleteRole(selectedRole)}
                      disabled={isLoading}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </Card>

            {/* Permissions by Category */}
            {Object.keys(groupedPermissions).map((category) => (
              <Card key={category}>
                <h3 className="text-lg font-semibold text-secondary-900 mb-4 flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-700">
                    {category}
                  </Badge>
                </h3>
                <div className="space-y-3">
                  {groupedPermissions[category].map((permission) => {
                    const hasPermission = currentRole.defaultPermissions[permission.id];
                    return (
                      <div
                        key={permission.id}
                        className={`flex items-start gap-3 p-3 rounded-lg border ${
                          hasPermission
                            ? 'bg-green-50 border-green-200'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        {hasPermission ? (
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className={`font-medium ${hasPermission ? 'text-green-900' : 'text-gray-700'}`}>
                            {permission.name}
                          </p>
                          <p className={`text-sm ${hasPermission ? 'text-green-700' : 'text-gray-600'}`}>
                            {permission.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            ))}

            {/* Permission Summary */}
            <Card className="bg-gray-50">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Permission Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {Object.values(currentRole.defaultPermissions).filter(Boolean).length}
                  </div>
                  <div className="text-sm text-secondary-600">Permissions Granted</div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-3xl font-bold text-secondary-600 mb-1">
                    {Object.values(currentRole.defaultPermissions).filter((v) => !v).length}
                  </div>
                  <div className="text-sm text-secondary-600">Permissions Denied</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* CREATE/EDIT MODAL */}
      <FormModal
        isOpen={isCreateModalOpen || isEditModalOpen}
        onClose={() => {
          if (isCreateModalOpen) setIsCreateModalOpen(false);
          if (isEditModalOpen) setIsEditModalOpen(false);
          resetForm();
        }}
        onSubmit={isEditModalOpen ? handleUpdateRole : handleSubmitNewRole}
        title={editingRole ? "Edit Role" : "Create Custom Role"}
        size="lg"
        submitText={isLoading ? "Saving..." : (editingRole ? "Update Role" : "Create Role")}
        disabled={isLoading}
      >
        <div className="space-y-6">
          {/* Role Name */}
          <div>
            <label className="block text-sm font-semibold text-secondary-900 mb-2">
              Role Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                validationErrors.name
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
              } focus:ring-2 focus:outline-none transition-colors`}
              placeholder="e.g., Project Manager"
              required
              disabled={isLoading}
            />
            {validationErrors.name && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-secondary-900 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                validationErrors.description
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
              } focus:ring-2 focus:outline-none transition-colors resize-none`}
              rows="3"
              placeholder="Describe the role and its responsibilities"
              required
              disabled={isLoading}
            />
            {validationErrors.description && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.description}</p>
            )}
          </div>

          {/* Permissions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-secondary-900">
                Permissions <span className="text-red-500">*</span>
              </h3>
              <span className="text-xs text-secondary-600">
                {formData.permissions.length} selected
              </span>
            </div>
            {validationErrors.permissions && (
              <p className="mb-2 text-sm text-red-600">{validationErrors.permissions}</p>
            )}

            <div className="space-y-4 max-h-96 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50">
              {Object.keys(groupedPermissions).map((category) => (
                <div key={category} className="bg-white rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-secondary-900 mb-3 flex items-center gap-2">
                    <Badge variant="info" className="text-xs">
                      {category}
                    </Badge>
                  </h4>
                  <div className="space-y-2">
                    {groupedPermissions[category].map((permission) => (
                      <label
                        key={permission.id}
                        className="flex items-start gap-3 p-2 rounded hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.permissions.includes(permission.id)}
                          onChange={(e) => handlePermissionToggle(permission.id, e.target.checked)}
                          className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500 focus:ring-2 mt-0.5"
                          disabled={isLoading}
                        />
                        <div className="flex-1">
                          <span className="text-sm font-medium text-secondary-900">
                            {permission.name}
                          </span>
                          <p className="text-xs text-secondary-600 mt-0.5">
                            {permission.description}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Users assigned to this role will have access to all selected permissions.
              You can modify these permissions at any time.
            </p>
          </div>
        </div>
      </FormModal>

      {/* DELETE CONFIRMATION DIALOG */}
      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingRole(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Custom Role"
        message={
          deletingRole && roles[deletingRole]
            ? `Are you sure you want to delete the "${roles[deletingRole].name}" role? This action cannot be undone. Users currently assigned to this role will need to be reassigned to a different role.`
            : 'Are you sure you want to delete this role?'
        }
        confirmText={isLoading ? "Deleting..." : "Delete Role"}
        confirmVariant="danger"
        disabled={isLoading}
      />
    </MainLayout>
  );
};

export default RolesPermissionsPage;
