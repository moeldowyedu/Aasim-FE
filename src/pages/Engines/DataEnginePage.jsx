import MainLayout from '../../components/layout/MainLayout';
import EngineHeader from '../../components/engines/EngineHeader';
import RubricConfiguration from '../../components/engines/RubricConfiguration';
import EngineStats from '../../components/engines/EngineStats';
import RecentRuns from '../../components/engines/RecentRuns';
import QuickTestPanel from '../../components/engines/QuickTestPanel';

const DataEnginePage = () => {
  const mockStats = {
    processedData: [
      { date: '11/10', count: 4200 },
      { date: '11/11', count: 4680 },
      { date: '11/12', count: 4320 },
      { date: '11/13', count: 5100 },
      { date: '11/14', count: 4890 },
      { date: '11/15', count: 5300 },
      { date: '11/16', count: 5650 },
    ],
    accuracyData: [
      { date: '11/10', accuracy: 99.0 },
      { date: '11/11', accuracy: 99.2 },
      { date: '11/12', accuracy: 99.3 },
      { date: '11/13', accuracy: 99.5 },
      { date: '11/14', accuracy: 99.4 },
      { date: '11/15', accuracy: 99.6 },
      { date: '11/16', accuracy: 99.7 },
    ],
    performanceMetrics: [
      { label: 'Avg Processing Time', value: '0.6s' },
      { label: 'Success Rate', value: '99.8%' },
      { label: 'Queue Length', value: '56' },
      { label: 'Active Rubrics', value: '14' },
    ]
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-8">
        <EngineHeader
          name="Precision Data Engine"
          icon="📊"
          status="active"
          description="Structured data validation with schema checking, quality metrics, and anomaly detection"
        />

        <RubricConfiguration engineId="data" />

        <EngineStats stats={mockStats} />

        <RecentRuns engineId="data" />

        <QuickTestPanel engineId="data" inputType="file-upload" />
      </div>
    </MainLayout>
  );
};

export default DataEnginePage;
