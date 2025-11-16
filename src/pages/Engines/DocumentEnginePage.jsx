import MainLayout from '../../components/layout/MainLayout';
import EngineHeader from '../../components/engines/EngineHeader';
import RubricConfiguration from '../../components/engines/RubricConfiguration';
import EngineStats from '../../components/engines/EngineStats';
import RecentRuns from '../../components/engines/RecentRuns';
import QuickTestPanel from '../../components/engines/QuickTestPanel';

const DocumentEnginePage = () => {
  const mockStats = {
    processedData: [
      { date: '11/10', count: 1120 },
      { date: '11/11', count: 1280 },
      { date: '11/12', count: 1190 },
      { date: '11/13', count: 1450 },
      { date: '11/14', count: 1380 },
      { date: '11/15', count: 1520 },
      { date: '11/16', count: 1640 },
    ],
    accuracyData: [
      { date: '11/10', accuracy: 97.8 },
      { date: '11/11', accuracy: 98.1 },
      { date: '11/12', accuracy: 98.3 },
      { date: '11/13', accuracy: 98.6 },
      { date: '11/14', accuracy: 98.5 },
      { date: '11/15', accuracy: 98.8 },
      { date: '11/16', accuracy: 99.0 },
    ],
    performanceMetrics: [
      { label: 'Avg Processing Time', value: '2.5s' },
      { label: 'Success Rate', value: '98.9%' },
      { label: 'Queue Length', value: '31' },
      { label: 'Active Rubrics', value: '9' },
    ]
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-8">
        <EngineHeader
          name="Precision Document Engine"
          icon="📄"
          status="active"
          description="PDF, DOCX, and document analysis with compliance checking and content extraction"
        />

        <RubricConfiguration engineId="document" />

        <EngineStats stats={mockStats} />

        <RecentRuns engineId="document" />

        <QuickTestPanel engineId="document" inputType="file-upload" />
      </div>
    </MainLayout>
  );
};

export default DocumentEnginePage;
