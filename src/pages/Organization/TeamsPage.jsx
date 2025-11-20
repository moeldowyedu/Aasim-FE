import { useState } from 'react';
import {
  Plus,
  Users,
  User,
  Edit,
  Trash2,
  Search,
  Mail,
  Building,
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import Select from '../../components/common/Input/Select';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';
import FormModal from '../../components/common/FormModal';
import ConfirmDialog from '../../components/common/ConfirmDialog';

const TeamsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  // Mutable teams state
  const [teams, setTeams] = useState([
    {
      id: 1,
      name: 'Frontend Development',
      description: 'User interface development team',
      department: 'Engineering',
      lead: 'Ivy Chen',
      leadEmail: 'ivy.chen@company.com',
      members: [
        { name: 'Ivy Chen', role: 'Team Lead' },
        { name: 'Tom Harris', role: 'Senior Developer' },
        { name: 'Sarah Kim', role: 'Developer' },
        { name: 'Mike Johnson', role: 'Developer' },
        { name: 'Lisa Wang', role: 'Junior Developer' },
        { name: 'Alex Turner', role: 'UI/UX Designer' },
        { name: 'Emma Brown', role: 'Developer' },
        { name: 'Chris Lee', role: 'Developer' },
      ],
      agents: 2,
      projects: ['Customer Portal Redesign'],
      status: 'active',
    },
    {
      id: 2,
      name: 'Backend Development',
      description: 'Server-side and API development',
      department: 'Engineering',
      lead: 'Henry Wilson',
      leadEmail: 'henry.wilson@company.com',
      members: [
        { name: 'Henry Wilson', role: 'Team Lead' },
        { name: 'Maria Garcia', role: 'Senior Developer' },
        { name: 'John Smith', role: 'Developer' },
        { name: 'David Lee', role: 'Developer' },
        { name: 'Anna Johnson', role: 'Developer' },
        { name: 'Ryan Clark', role: 'Developer' },
        { name: 'Sophie Turner', role: 'Junior Developer' },
        { name: 'Mark Davis', role: 'Developer' },
        { name: 'Julia White', role: 'DevOps Engineer' },
        { name: 'Kevin Brown', role: 'Developer' },
        { name: 'Rachel Green', role: 'Developer' },
        { name: 'Peter Parker', role: 'Junior Developer' },
      ],
      agents: 3,
      projects: ['Customer Portal Redesign', 'Data Migration Project'],
      status: 'active',
    },
    {
      id: 3,
      name: 'Recruitment Team',
      description: 'Talent acquisition specialists',
      department: 'Human Resources',
      lead: 'Bob Smith',
      leadEmail: 'bob.smith@company.com',
      members: [
        { name: 'Bob Smith', role: 'Team Lead' },
        { name: 'Jennifer Lopez', role: 'Senior Recruiter' },
        { name: 'Michael Chen', role: 'Recruiter' },
        { name: 'Diana Prince', role: 'Recruiter' },
        { name: 'Bruce Wayne', role: 'HR Coordinator' },
      ],
      agents: 2,
      projects: ['HR Automation Initiative'],
      status: 'active',
    },
    {
      id: 4,
      name: 'Financial Analysis',
      description: 'Financial planning and analysis',
      department: 'Finance',
      lead: 'Emma Davis',
      leadEmail: 'emma.davis@company.com',
      members: [
        { name: 'Emma Davis', role: 'Team Lead' },
        { name: 'Robert Miller', role: 'Senior Analyst' },
        { name: 'Jessica Taylor', role: 'Financial Analyst' },
        { name: 'Daniel Moore', role: 'Financial Analyst' },
        { name: 'Olivia Martinez', role: 'Junior Analyst' },
        { name: 'William Anderson', role: 'Financial Analyst' },
      ],
      agents: 2,
      projects: ['Financial Reporting Dashboard'],
      status: 'active',
    },
    {
      id: 5,
      name: 'Content Marketing',
      description: 'Content creation and strategy',
      department: 'Marketing',
      lead: 'Sarah Thompson',
      leadEmail: 'sarah.thompson@company.com',
      members: [
        { name: 'Sarah Thompson', role: 'Team Lead' },
        { name: 'James Wilson', role: 'Content Strategist' },
        { name: 'Emily Clark', role: 'Content Writer' },
        { name: 'Andrew Scott', role: 'Content Writer' },
        { name: 'Megan Adams', role: 'Social Media Manager' },
        { name: 'Ryan Hughes', role: 'SEO Specialist' },
        { name: 'Laura Bell', role: 'Content Writer' },
      ],
      agents: 3,
      projects: ['Marketing Campaign Automation'],
      status: 'active',
    },
  ]);

  // CREATE states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // EDIT states
  const [editingTeam, setEditingTeam] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // DELETE states
  const [deletingTeam, setDeletingTeam] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // VIEW MEMBERS states
  const [viewingTeam, setViewingTeam] = useState(null);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    lead: '',
    description: '',
    status: 'active',
  });

  const departments = ['all', ...new Set(teams.map((t) => t.department))];

  const filteredTeams = teams.filter((team) => {
    const matchesSearch =
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.lead.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      departmentFilter === 'all' || team.department === departmentFilter;

    return matchesSearch && matchesDepartment;
  });

  const stats = {
    totalTeams: teams.length,
    totalMembers: teams.reduce((sum, t) => sum + t.members.length, 0),
    totalAgents: teams.reduce((sum, t) => sum + t.agents, 0),
    avgTeamSize: teams.length > 0
      ? Math.round(teams.reduce((sum, t) => sum + t.members.length, 0) / teams.length)
      : 0,
  };

  // CREATE handlers
  const handleCreateTeam = () => {
    setFormData({
      name: '',
      department: '',
      lead: '',
      description: '',
      status: 'active',
    });
    setEditingTeam(null);
    setIsCreateModalOpen(true);
  };

  const handleSubmitNewTeam = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      alert('Team name is required');
      return;
    }
    if (!formData.department) {
      alert('Department is required');
      return;
    }
    if (!formData.lead.trim()) {
      alert('Team lead is required');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const newTeam = {
      id: Math.max(...teams.map(t => t.id), 0) + 1,
      name: formData.name.trim(),
      department: formData.department,
      description: formData.description.trim(),
      lead: formData.lead.trim(),
      leadEmail: `${formData.lead.toLowerCase().replace(' ', '.')}@company.com`,
      members: [
        { name: formData.lead.trim(), role: 'Team Lead' }
      ],
      agents: 0,
      projects: [],
      status: formData.status,
    };

    setTeams([...teams, newTeam]);
    setIsLoading(false);
    setIsCreateModalOpen(false);
    setFormData({
      name: '',
      department: '',
      lead: '',
      description: '',
      status: 'active',
    });
  };

  // EDIT handlers
  const handleEditTeam = (team) => {
    setEditingTeam(team);
    setFormData({
      name: team.name,
      department: team.department,
      lead: team.lead,
      description: team.description,
      status: team.status,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateTeam = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      alert('Team name is required');
      return;
    }
    if (!formData.department) {
      alert('Department is required');
      return;
    }
    if (!formData.lead.trim()) {
      alert('Team lead is required');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    setTeams(teams.map(team =>
      team.id === editingTeam.id
        ? {
            ...team,
            name: formData.name.trim(),
            department: formData.department,
            description: formData.description.trim(),
            lead: formData.lead.trim(),
            leadEmail: `${formData.lead.toLowerCase().replace(' ', '.')}@company.com`,
            status: formData.status,
          }
        : team
    ));

    setIsLoading(false);
    setIsEditModalOpen(false);
    setEditingTeam(null);
    setFormData({
      name: '',
      department: '',
      lead: '',
      description: '',
      status: 'active',
    });
  };

  // DELETE handlers
  const handleDeleteTeam = (team) => {
    setDeletingTeam(team);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    setTeams(teams.filter(team => team.id !== deletingTeam.id));

    setIsLoading(false);
    setIsDeleteModalOpen(false);
    setDeletingTeam(null);
  };

  // VIEW MEMBERS handler
  const handleViewMembers = (team) => {
    setViewingTeam(team);
    setIsMembersModalOpen(true);
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900">Teams</h1>
            <p className="text-secondary-600 mt-1">
              Manage teams across your organization
            </p>
          </div>
          <Button
            variant="primary"
            leftIcon={<Plus className="w-5 h-5" />}
            onClick={handleCreateTeam}
          >
            Create Team
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-900">{stats.totalTeams}</div>
                <div className="text-sm text-blue-700">Total Teams</div>
              </div>
              <Users className="w-10 h-10 text-blue-500" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-900">{stats.totalMembers}</div>
                <div className="text-sm text-green-700">Total Members</div>
              </div>
              <User className="w-10 h-10 text-green-500" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-900">{stats.totalAgents}</div>
                <div className="text-sm text-purple-700">AI Agents</div>
              </div>
              <Users className="w-10 h-10 text-purple-500" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-900">{stats.avgTeamSize}</div>
                <div className="text-sm text-orange-700">Avg Team Size</div>
              </div>
              <Users className="w-10 h-10 text-orange-500" />
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search teams by name, description, or lead..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="w-5 h-5" />}
                fullWidth
              />
            </div>
            <Select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              options={departments.map((dept) => ({
                value: dept,
                label: dept === 'all' ? 'All Departments' : dept,
              }))}
              className="min-w-[200px]"
            />
          </div>
        </Card>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTeams.map((team) => (
            <Card key={team.id} className="hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-secondary-900 mb-1">
                        {team.name}
                      </h3>
                      <p className="text-sm text-secondary-600">{team.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditTeam(team)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteTeam(team)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>

                {/* Department Badge */}
                <div>
                  <Badge className="bg-blue-100 text-blue-700">
                    <Building className="w-3 h-3 inline mr-1" />
                    {team.department}
                  </Badge>
                </div>

                {/* Team Lead */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500 uppercase mb-2">Team Lead</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {team.lead.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-secondary-900">{team.lead}</p>
                      <p className="text-xs text-secondary-600 flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {team.leadEmail}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Members</p>
                    <p className="text-lg font-bold text-secondary-900">{team.members.length}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">AI Agents</p>
                    <p className="text-lg font-bold text-secondary-900">{team.agents}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Projects</p>
                    <p className="text-lg font-bold text-secondary-900">{team.projects.length}</p>
                  </div>
                </div>

                {/* Projects */}
                {team.projects.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase mb-2">Active Projects</p>
                    <div className="flex flex-wrap gap-2">
                      {team.projects.map((project, idx) => (
                        <Badge key={idx} className="bg-green-100 text-green-700">
                          {project}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* View Members Button */}
                <Button
                  variant="outline"
                  className="w-full"
                  size="sm"
                  onClick={() => handleViewMembers(team)}
                >
                  View All Members
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredTeams.length === 0 && (
          <Card>
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                No Teams Found
              </h3>
              <p className="text-secondary-600">
                {searchTerm || departmentFilter !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Get started by creating your first team'}
              </p>
            </div>
          </Card>
        )}
      </div>

      {/* CREATE/EDIT Team Modal */}
      <FormModal
        isOpen={isCreateModalOpen || isEditModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setIsEditModalOpen(false);
          setEditingTeam(null);
          setFormData({
            name: '',
            department: '',
            lead: '',
            description: '',
            status: 'active',
          });
        }}
        onSubmit={editingTeam ? handleUpdateTeam : handleSubmitNewTeam}
        title={editingTeam ? 'Edit Team' : 'Create Team'}
        submitText={editingTeam ? 'Update Team' : 'Create Team'}
        isLoading={isLoading}
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-secondary-900 mb-2">
              Team Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter team name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-secondary-900 mb-2">
              Department *
            </label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            >
              <option value="">Select department...</option>
              <option value="Product">Product</option>
              <option value="Engineering">Engineering</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Customer Success">Customer Success</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Human Resources">Human Resources</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-secondary-900 mb-2">
              Team Lead *
            </label>
            <input
              type="text"
              value={formData.lead}
              onChange={(e) => setFormData({ ...formData, lead: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter team lead name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-secondary-900 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Enter team description"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-secondary-900 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </FormModal>

      {/* DELETE Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingTeam(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Team"
        message={`Are you sure you want to delete "${deletingTeam?.name}"? This action cannot be undone.`}
        confirmText="Delete Team"
        cancelText="Cancel"
        confirmVariant="danger"
        isLoading={isLoading}
      />

      {/* VIEW MEMBERS Modal */}
      <FormModal
        isOpen={isMembersModalOpen}
        onClose={() => {
          setIsMembersModalOpen(false);
          setViewingTeam(null);
        }}
        onSubmit={(e) => {
          e.preventDefault();
          setIsMembersModalOpen(false);
          setViewingTeam(null);
        }}
        title={`${viewingTeam?.name} - Team Members`}
        submitText="Close"
        size="md"
      >
        <div className="space-y-2">
          {viewingTeam?.members?.map((member, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {member.name.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium text-secondary-900">{member.name}</p>
                <p className="text-sm text-secondary-600">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </FormModal>
    </MainLayout>
  );
};

export default TeamsPage;
