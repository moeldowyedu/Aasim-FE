import MainLayout from '../../components/layout/MainLayout';
import ApprovalTable from '../../components/hitl/ApprovalTable';

const ApprovalWorkflowsPage = () => {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold font-heading text-gray-900">Pending Approvals</h1>
          <p className="text-gray-600 mt-2">
            Review and approve AI decisions that require human oversight
          </p>
        </div>

        {/* Approval Table */}
        <ApprovalTable />
      </div>
    </MainLayout>
  );
};

export default ApprovalWorkflowsPage;
