import { useState } from 'react';
import {
  Plus,
  Folder,
  Users,
  Calendar,
  TrendingUp,
  Edit,
  Trash2,
  Search,
  Filter,
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import Select from '../../components/common/Input/Select';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';
import FormModal from '../../components/common/FormModal';
import ConfirmDialog from '../../components/common/ConfirmDialog';

const ProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Customer Portal Redesign',
      description: 'Modernize the customer-facing portal with new UI/UX',
      status: 'in_progress',
      priority: 'high',
      department: 'Engineering',
      team: 'Team A',
      lead: 'Grace Lee',
      members: 12,
      agents: 3,
      startDate: '2025-01-15',
      endDate: '2025-04-30',
      progress: 65,
      budget: 150000,
    },
    {
      id: 2,
      name: 'HR Automation Initiative',
      description: 'Automate recruitment and onboarding processes',
      status: 'in_progress',
      priority: 'high',
      department: 'Human Resources',
      team: 'Team B',
      lead: 'Alice Johnson',
      members: 8,
      agents: 5,
      startDate: '2025-02-01',
      endDate: '2025-05-15',
      progress: 45,
      budget: 100000,
    },
    {
      id: 3,
      name: 'Financial Reporting Dashboard',
      description: 'Real-time financial analytics and reporting',
      status: 'planning',
      priority: 'medium',
      department: 'Finance',
      team: 'Team C',
      lead: 'David Brown',
      members: 6,
      agents: 2,
      startDate: '2025-03-01',
      endDate: '2025-06-30',
      progress: 15,
      budget: 80000,
    },
    {
      id: 4,
      name: 'Marketing Campaign Automation',
      description: 'AI-powered marketing campaign management',
      status: 'completed',
      priority: 'medium',
      department: 'Marketing',
      team: 'Team A',
      lead: 'Jack Taylor',
      members: 10,
      agents: 4,
      startDate: '2024-10-01',
      endDate: '2025-01-15',
      progress: 100,
      budget: 120000,
    },
    {
      id: 5,
      name: 'Data Migration Project',
      description: 'Migrate legacy systems to cloud infrastructure',
      status: 'on_hold',
      priority: 'low',
      department: 'Engineering',
      team: 'Team B',
      lead: 'Henry Wilson',
      members: 5,
      agents: 1,
      startDate: '2025-02-15',
      endDate: '2025-08-30',
      progress: 25,
      budget: 200000,
    },
  ]);

  // CREATE states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // EDIT states
  const [editingProject, setEditingProject] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // DELETE states
  const [deletingProject, setDeletingProject] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active',
    priority: 'Medium',
    department: '',
    team: '',
    manager: '',
    budget: '',
    startDate: '',
    deadline: '',
    progress: '0',
  });

  // Form validation errors
  const [formErrors, setFormErrors] = useState({});

  const getStatusColor = (status) => {
    const colors = {
      planning: 'bg-blue-100 text-blue-700 border-blue-300',
      in_progress: 'bg-green-100 text-green-700 border-green-300',
      on_hold: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      completed: 'bg-gray-100 text-gray-700 border-gray-300',
    };
    return colors[status] || colors.planning;
  };

  const getStatusLabel = (status) => {
    const labels = {
      planning: 'Planning',
      in_progress: 'In Progress',
      on_hold: 'On Hold',
      completed: 'Completed',
    };
    return labels[status] || status;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-700',
      medium: 'bg-orange-100 text-orange-700',
      low: 'bg-blue-100 text-blue-700',
    };
    return colors[priority] || colors.medium;
  };

  // Map form status to internal status
  const mapFormStatusToInternal = (formStatus) => {
    const mapping = {
      active: 'in_progress',
      'on-hold': 'on_hold',
      completed: 'completed',
    };
    return mapping[formStatus] || 'in_progress';
  };

  // Map internal status to form status
  const mapInternalStatusToForm = (internalStatus) => {
    const mapping = {
      in_progress: 'active',
      on_hold: 'on-hold',
      completed: 'completed',
      planning: 'active',
    };
    return mapping[internalStatus] || 'active';
  };

  // Validate form data
  const validateForm = (data) => {
    const errors = {};

    if (!data.name || data.name.trim() === '') {
      errors.name = 'Project name is required';
    }

    if (!data.status) {
      errors.status = 'Status is required';
    }

    if (!data.priority) {
      errors.priority = 'Priority is required';
    }

    if (!data.department) {
      errors.department = 'Department is required';
    }

    if (!data.team) {
      errors.team = 'Team is required';
    }

    if (!data.manager || data.manager.trim() === '') {
      errors.manager = 'Manager is required';
    }

    if (!data.startDate) {
      errors.startDate = 'Start date is required';
    }

    if (!data.deadline) {
      errors.deadline = 'Deadline is required';
    }

    if (data.budget && parseFloat(data.budget) <= 0) {
      errors.budget = 'Budget must be positive';
    }

    if (data.progress && (parseFloat(data.progress) < 0 || parseFloat(data.progress) > 100)) {
      errors.progress = 'Progress must be between 0 and 100';
    }

    return errors;
  };

  // Handle form field change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // CREATE handlers
  const handleCreateProject = () => {
    setFormData({
      name: '',
      description: '',
      status: 'active',
      priority: 'Medium',
      department: '',
      team: '',
      manager: '',
      budget: '',
      startDate: '',
      deadline: '',
      progress: '0',
    });
    setFormErrors({});
    setIsCreateModalOpen(true);
  };

  const handleSubmitNewProject = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);

    // Simulate API call with 500ms delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Generate new ID
    const newId = projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1;

    // Create new project
    const newProject = {
      id: newId,
      name: formData.name,
      description: formData.description,
      status: mapFormStatusToInternal(formData.status),
      priority: formData.priority.toLowerCase(),
      department: formData.department,
      team: formData.team,
      lead: formData.manager,
      members: 0,
      agents: 0,
      startDate: formData.startDate,
      endDate: formData.deadline,
      progress: parseInt(formData.progress) || 0,
      budget: parseFloat(formData.budget) || 0,
    };

    setProjects((prev) => [...prev, newProject]);
    setIsLoading(false);
    setIsCreateModalOpen(false);
  };

  // EDIT handlers
  const handleEditProject = (project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description,
      status: mapInternalStatusToForm(project.status),
      priority: project.priority.charAt(0).toUpperCase() + project.priority.slice(1),
      department: project.department,
      team: project.team,
      manager: project.lead,
      budget: project.budget?.toString() || '',
      startDate: project.startDate,
      deadline: project.endDate,
      progress: project.progress?.toString() || '0',
    });
    setFormErrors({});
    setIsEditModalOpen(true);
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();

    // Validate form
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);

    // Simulate API call with 500ms delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Update project
    setProjects((prev) =>
      prev.map((project) =>
        project.id === editingProject.id
          ? {
              ...project,
              name: formData.name,
              description: formData.description,
              status: mapFormStatusToInternal(formData.status),
              priority: formData.priority.toLowerCase(),
              department: formData.department,
              team: formData.team,
              lead: formData.manager,
              startDate: formData.startDate,
              endDate: formData.deadline,
              progress: parseInt(formData.progress) || 0,
              budget: parseFloat(formData.budget) || 0,
            }
          : project
      )
    );

    setIsLoading(false);
    setIsEditModalOpen(false);
    setEditingProject(null);
  };

  // DELETE handlers
  const handleDeleteProject = (project) => {
    setDeletingProject(project);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsLoading(true);

    // Simulate API call with 500ms delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Delete project
    setProjects((prev) => prev.filter((project) => project.id !== deletingProject.id));

    setIsLoading(false);
    setIsDeleteDialogOpen(false);
    setDeletingProject(null);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: projects.length,
    inProgress: projects.filter((p) => p.status === 'in_progress').length,
    completed: projects.filter((p) => p.status === 'completed').length,
    onHold: projects.filter((p) => p.status === 'on_hold').length,
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Projects</h1>
            <p className="text-secondary-600 mt-1">
              Manage projects across your organization
            </p>
          </div>
          <Button
            variant="primary"
            leftIcon={<Plus className="w-5 h-5" />}
            onClick={handleCreateProject}
          >
            Create Project
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-900">{stats.total}</div>
                <div className="text-sm text-blue-700">Total Projects</div>
              </div>
              <Folder className="w-10 h-10 text-blue-500" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-900">{stats.inProgress}</div>
                <div className="text-sm text-green-700">In Progress</div>
              </div>
              <TrendingUp className="w-10 h-10 text-green-500" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-900">{stats.completed}</div>
                <div className="text-sm text-purple-700">Completed</div>
              </div>
              <TrendingUp className="w-10 h-10 text-purple-500" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-900">{stats.onHold}</div>
                <div className="text-sm text-yellow-700">On Hold</div>
              </div>
              <TrendingUp className="w-10 h-10 text-yellow-500" />
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search projects by name, description, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="w-5 h-5" />}
                fullWidth
              />
            </div>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'planning', label: 'Planning' },
                { value: 'in_progress', label: 'In Progress' },
                { value: 'on_hold', label: 'On Hold' },
                { value: 'completed', label: 'Completed' },
              ]}
              className="min-w-[180px]"
            />
          </div>
        </Card>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Folder className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-secondary-900 mb-1">
                        {project.name}
                      </h3>
                      <p className="text-sm text-secondary-600">{project.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditProject(project)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteProject(project)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>

                {/* Status and Priority */}
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(project.status)}>
                    {getStatusLabel(project.status)}
                  </Badge>
                  <Badge className={getPriorityColor(project.priority)}>
                    {project.priority.toUpperCase()}
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-secondary-600">Progress</span>
                    <span className="font-semibold text-secondary-900">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Department</p>
                    <p className="text-sm font-medium text-secondary-900">{project.department}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Project Lead</p>
                    <p className="text-sm font-medium text-secondary-900">{project.lead}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Team Size</p>
                    <p className="text-sm font-medium text-secondary-900">
                      {project.members} members • {project.agents} AI agents
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Timeline</p>
                    <p className="text-sm font-medium text-secondary-900">
                      {new Date(project.startDate).toLocaleDateString()} -{' '}
                      {new Date(project.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <Card>
            <div className="text-center py-12">
              <Folder className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                No Projects Found
              </h3>
              <p className="text-secondary-600">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Get started by creating your first project'}
              </p>
            </div>
          </Card>
        )}
      </div>

      {/* CREATE/EDIT Modal */}
      <FormModal
        isOpen={isCreateModalOpen || isEditModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setIsEditModalOpen(false);
          setEditingProject(null);
        }}
        onSubmit={isEditModalOpen ? handleUpdateProject : handleSubmitNewProject}
        title={isEditModalOpen ? 'Edit Project' : 'Create New Project'}
        submitText={isEditModalOpen ? 'Update Project' : 'Create Project'}
        isLoading={isLoading}
        size="lg"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-semibold text-secondary-900 mb-2">
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                formErrors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter project name"
            />
            {formErrors.name && (
              <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
            )}
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-semibold text-secondary-900 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Enter project description"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-secondary-900 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleFormChange}
              className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                formErrors.status ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="active">Active</option>
              <option value="on-hold">On Hold</option>
              <option value="completed">Completed</option>
            </select>
            {formErrors.status && (
              <p className="mt-1 text-sm text-red-500">{formErrors.status}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-secondary-900 mb-2">
              Priority <span className="text-red-500">*</span>
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleFormChange}
              className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                formErrors.priority ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            {formErrors.priority && (
              <p className="mt-1 text-sm text-red-500">{formErrors.priority}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-secondary-900 mb-2">
              Department <span className="text-red-500">*</span>
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleFormChange}
              className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                formErrors.department ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select...</option>
              <option value="Product">Product</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </select>
            {formErrors.department && (
              <p className="mt-1 text-sm text-red-500">{formErrors.department}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-secondary-900 mb-2">
              Team <span className="text-red-500">*</span>
            </label>
            <select
              name="team"
              value={formData.team}
              onChange={handleFormChange}
              className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                formErrors.team ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select...</option>
              <option value="Team A">Team A</option>
              <option value="Team B">Team B</option>
              <option value="Team C">Team C</option>
            </select>
            {formErrors.team && (
              <p className="mt-1 text-sm text-red-500">{formErrors.team}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-secondary-900 mb-2">
              Manager <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="manager"
              value={formData.manager}
              onChange={handleFormChange}
              className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                formErrors.manager ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter manager name"
            />
            {formErrors.manager && (
              <p className="mt-1 text-sm text-red-500">{formErrors.manager}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-secondary-900 mb-2">
              Budget ($)
            </label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleFormChange}
              className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                formErrors.budget ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter budget"
              min="0"
            />
            {formErrors.budget && (
              <p className="mt-1 text-sm text-red-500">{formErrors.budget}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-secondary-900 mb-2">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleFormChange}
              className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                formErrors.startDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.startDate && (
              <p className="mt-1 text-sm text-red-500">{formErrors.startDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-secondary-900 mb-2">
              Deadline <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleFormChange}
              className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                formErrors.deadline ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.deadline && (
              <p className="mt-1 text-sm text-red-500">{formErrors.deadline}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-secondary-900 mb-2">
              Progress (%)
            </label>
            <input
              type="number"
              name="progress"
              value={formData.progress}
              onChange={handleFormChange}
              className={`w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                formErrors.progress ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter progress"
              min="0"
              max="100"
            />
            {formErrors.progress && (
              <p className="mt-1 text-sm text-red-500">{formErrors.progress}</p>
            )}
          </div>
        </div>
      </FormModal>

      {/* DELETE Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setDeletingProject(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Project"
        message={`Are you sure you want to delete "${deletingProject?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmVariant="danger"
        isLoading={isLoading}
      />
    </MainLayout>
  );
};

export default ProjectsPage;
