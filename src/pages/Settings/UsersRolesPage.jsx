import { useState } from 'react';
import { UserPlus, Shield, Mail, MoreVertical, Search, Filter, Edit, Trash2, RefreshCw, X, Check } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Modal from '../../components/common/Modal/Modal';
import Button from '../../components/common/Button/Button';

const UsersRolesPage = () => {
  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'Admin',
      status: 'active',
      lastActive: new Date(Date.now() - 1000 * 60 * 15),
      avatar: 'https://i.pravatar.cc/150?img=1',
      agentsManaged: 12
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.chen@company.com',
      role: 'Developer',
      status: 'active',
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 2),
      avatar: 'https://i.pravatar.cc/150?img=12',
      agentsManaged: 8
    },
    {
      id: '3',
      name: 'Emily Rodriguez',
      email: 'emily.r@company.com',
      role: 'Reviewer',
      status: 'active',
      lastActive: new Date(Date.now() - 1000 * 60 * 30),
      avatar: 'https://i.pravatar.cc/150?img=45',
      agentsManaged: 5
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'david.kim@company.com',
      role: 'Viewer',
      status: 'active',
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24),
      avatar: 'https://i.pravatar.cc/150?img=33',
      agentsManaged: 0
    },
    {
      id: '5',
      name: 'Lisa Williams',
      email: 'lisa.w@company.com',
      role: 'Developer',
      status: 'invited',
      lastActive: null,
      avatar: 'https://i.pravatar.cc/150?img=49',
      agentsManaged: 0
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Modal states
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Form states
  const [inviteForm, setInviteForm] = useState({
    name: '',
    email: '',
    role: 'Viewer'
  });

  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    role: ''
  });

  const roles = [
    {
      name: 'Admin',
      color: 'bg-red-100 text-red-700 border-red-200',
      permissions: ['Full access', 'User management', 'Billing', 'All agents'],
      count: users.filter(u => u.role === 'Admin').length
    },
    {
      name: 'Developer',
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      permissions: ['Create agents', 'Modify agents', 'Deploy agents', 'API access'],
      count: users.filter(u => u.role === 'Developer').length
    },
    {
      name: 'Reviewer',
      color: 'bg-purple-100 text-purple-700 border-purple-200',
      permissions: ['View agents', 'HITL approvals', 'Activity logs', 'Reports'],
      count: users.filter(u => u.role === 'Reviewer').length
    },
    {
      name: 'Viewer',
      color: 'bg-gray-100 text-gray-700 border-gray-200',
      permissions: ['View agents', 'View reports', 'Read-only access'],
      count: users.filter(u => u.role === 'Viewer').length
    }
  ];

  const getRoleBadge = (role) => {
    const roleConfig = roles.find(r => r.name === role);
    if (!roleConfig) return null;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${roleConfig.color}`}>
        {role}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    if (status === 'active') {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
          Active
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200">
        Invited
      </span>
    );
  };

  // Filter and search logic
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Handle invite user
  const handleInviteUser = () => {
    if (!inviteForm.name || !inviteForm.email) {
      alert('Please fill in all required fields');
      return;
    }

    const newUser = {
      id: String(users.length + 1),
      name: inviteForm.name,
      email: inviteForm.email,
      role: inviteForm.role,
      status: 'invited',
      lastActive: null,
      avatar: `https://i.pravatar.cc/150?img=${users.length + 1}`,
      agentsManaged: 0
    };

    setUsers([...users, newUser]);
    setInviteForm({ name: '', email: '', role: 'Viewer' });
    setShowInviteModal(false);
  };

  // Handle edit user
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role
    });
    setShowEditModal(true);
    setActiveDropdown(null);
  };

  const handleSaveEdit = () => {
    if (!editForm.name || !editForm.email) {
      alert('Please fill in all required fields');
      return;
    }

    setUsers(users.map(u =>
      u.id === selectedUser.id
        ? { ...u, name: editForm.name, email: editForm.email, role: editForm.role }
        : u
    ));
    setShowEditModal(false);
    setSelectedUser(null);
  };

  // Handle delete user
  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
    setActiveDropdown(null);
  };

  const confirmDeleteUser = () => {
    setUsers(users.filter(u => u.id !== selectedUser.id));
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  // Handle resend invite
  const handleResendInvite = (user) => {
    alert(`Invitation resent to ${user.email}`);
    setActiveDropdown(null);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterRole('all');
    setFilterStatus('all');
    setSearchQuery('');
  };

  return (
    <MainLayout showSidebar={true}>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary-600" />
                Users & Roles
              </h1>
              <p className="text-gray-600 mt-2">
                Manage team members, roles, and permissions
              </p>
            </div>
            <button
              onClick={() => setShowInviteModal(true)}
              className="glass-btn-primary rounded-xl px-6 py-3 font-semibold inline-flex items-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              Invite User
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-card rounded-2xl p-6">
            <div className="text-sm font-medium text-gray-600 mb-2">Total Users</div>
            <div className="text-3xl font-bold text-gray-900">{users.length}</div>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="text-sm font-medium text-gray-600 mb-2">Active Users</div>
            <div className="text-3xl font-bold text-green-600">
              {users.filter(u => u.status === 'active').length}
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="text-sm font-medium text-gray-600 mb-2">Pending Invites</div>
            <div className="text-3xl font-bold text-yellow-600">
              {users.filter(u => u.status === 'invited').length}
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="text-sm font-medium text-gray-600 mb-2">Roles</div>
            <div className="text-3xl font-bold text-gray-900">{roles.length}</div>
          </div>
        </div>

        {/* Roles Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Roles & Permissions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role) => (
              <div key={role.name} className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">{role.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${role.color}`}>
                    {role.count} users
                  </span>
                </div>
                <ul className="space-y-2">
                  {role.permissions.map((permission, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>{permission}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input w-full pl-10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="glass-btn-secondary rounded-xl px-4 py-3 inline-flex items-center gap-2"
            >
              <Filter className="w-5 h-5" />
              Filter
              {(filterRole !== 'all' || filterStatus !== 'all') && (
                <span className="ml-1 bg-primary-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {(filterRole !== 'all' ? 1 : 0) + (filterStatus !== 'all' ? 1 : 0)}
                </span>
              )}
            </button>

            {showFilterDropdown && (
              <div className="absolute right-0 mt-2 w-64 glass-card rounded-xl p-4 shadow-xl z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Filters</h3>
                  <button
                    onClick={resetFilters}
                    className="text-xs text-primary-600 hover:text-primary-700"
                  >
                    Reset
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <select
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    >
                      <option value="all">All Roles</option>
                      {roles.map(role => (
                        <option key={role.name} value={role.name}>{role.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="invited">Invited</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {(filterRole !== 'all' || filterStatus !== 'all' || searchQuery) && (
          <div className="mb-4 flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600">Active filters:</span>
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:text-primary-900">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filterRole !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                Role: {filterRole}
                <button onClick={() => setFilterRole('all')} className="hover:text-primary-900">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filterStatus !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                Status: {filterStatus}
                <button onClick={() => setFilterStatus('all')} className="hover:text-primary-900">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Users Table */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Agents Managed
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <Search className="w-12 h-12 text-gray-300" />
                        <p className="font-medium">No users found</p>
                        <p className="text-sm">Try adjusting your search or filters</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <div className="font-semibold text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getRoleBadge(user.role)}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(user.status)}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">{user.agentsManaged}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {user.lastActive ? user.lastActive.toLocaleString() : 'Never'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="relative inline-block">
                          <button
                            onClick={() => setActiveDropdown(activeDropdown === user.id ? null : user.id)}
                            className="glass-btn-secondary rounded-lg px-3 py-2 inline-flex items-center"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {activeDropdown === user.id && (
                            <div className="absolute right-0 mt-2 w-48 glass-card rounded-lg shadow-xl z-10 py-2">
                              <button
                                onClick={() => handleEditUser(user)}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                              >
                                <Edit className="w-4 h-4" />
                                Edit User
                              </button>
                              {user.status === 'invited' && (
                                <button
                                  onClick={() => handleResendInvite(user)}
                                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                                >
                                  <RefreshCw className="w-4 h-4" />
                                  Resend Invite
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteUser(user)}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete User
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results count */}
        {filteredUsers.length > 0 && (
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        )}

        {/* Info Box */}
        <div className="mt-8 glass-card rounded-2xl p-6 bg-gradient-to-r from-primary-50 to-purple-50">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-primary-600 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Role-Based Access Control</h4>
              <p className="text-gray-700 text-sm">
                Control exactly what each team member can see and do with granular role-based permissions.
                Admins have full access, Developers can create and manage agents, Reviewers handle HITL approvals,
                and Viewers have read-only access to reports and analytics.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Invite User Modal */}
      <Modal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        title="Invite New User"
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowInviteModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleInviteUser}>
              Send Invitation
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={inviteForm.name}
              onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={inviteForm.email}
              onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="user@company.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              value={inviteForm.role}
              onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {roles.map(role => (
                <option key={role.name} value={role.name}>{role.name}</option>
              ))}
            </select>
            <p className="mt-2 text-sm text-gray-500">
              {roles.find(r => r.name === inviteForm.role)?.permissions.join(', ')}
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">Invitation Email</p>
                <p className="text-xs text-blue-700 mt-1">
                  An invitation email will be sent to the user with instructions to set up their account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit User"
        size="md"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={editForm.email}
              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="user@company.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              value={editForm.role}
              onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {roles.map(role => (
                <option key={role.name} value={role.name}>{role.name}</option>
              ))}
            </select>
            <p className="mt-2 text-sm text-gray-500">
              {roles.find(r => r.name === editForm.role)?.permissions.join(', ')}
            </p>
          </div>
        </div>
      </Modal>

      {/* Delete User Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete User"
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={confirmDeleteUser}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete User
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900">
                Are you sure you want to delete this user?
              </p>
            </div>
          </div>

          {selectedUser && (
            <div className="pl-4 border-l-2 border-gray-200">
              <p className="text-sm text-gray-600">User:</p>
              <p className="font-semibold text-gray-900">{selectedUser.name}</p>
              <p className="text-sm text-gray-600 mt-1">{selectedUser.email}</p>
            </div>
          )}

          <p className="text-sm text-gray-600">
            This action cannot be undone. The user will lose access to all resources and data.
          </p>
        </div>
      </Modal>

      {/* Click outside to close dropdowns */}
      {(activeDropdown || showFilterDropdown) && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => {
            setActiveDropdown(null);
            setShowFilterDropdown(false);
          }}
        />
      )}
    </MainLayout>
  );
};

export default UsersRolesPage;
