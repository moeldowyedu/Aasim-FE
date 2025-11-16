import MainLayout from '../../components/layout/MainLayout';
import EngineHeader from '../../components/engines/EngineHeader';
import RubricConfiguration from '../../components/engines/RubricConfiguration';
import EngineStats from '../../components/engines/EngineStats';
import RecentRuns from '../../components/engines/RecentRuns';
import QuickTestPanel from '../../components/engines/QuickTestPanel';

const CodeEnginePage = () => {
  const mockStats = {
    processedData: [
      { date: '11/10', count: 560 },
      { date: '11/11', count: 620 },
      { date: '11/12', count: 580 },
      { date: '11/13', count: 720 },
      { date: '11/14', count: 690 },
      { date: '11/15', count: 750 },
      { date: '11/16', count: 810 },
    ],
    accuracyData: [
      { date: '11/10', accuracy: 95.8 },
      { date: '11/11', accuracy: 96.2 },
      { date: '11/12', accuracy: 96.5 },
      { date: '11/13', accuracy: 96.8 },
      { date: '11/14', accuracy: 96.7 },
      { date: '11/15', accuracy: 97.0 },
      { date: '11/16', accuracy: 97.2 },
    ],
    performanceMetrics: [
      { label: 'Avg Processing Time', value: '3.2s' },
      { label: 'Success Rate', value: '97.8%' },
      { label: 'Queue Length', value: '18' },
      { label: 'Active Rubrics', value: '8' },
    ]
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-8">
        <EngineHeader
          name="Precision Code Engine"
          icon="💻"
          status="active"
          description="Automated code review with quality metrics, security scanning, and best practices evaluation"
        />

        <RubricConfiguration engineId="code" />

        <EngineStats stats={mockStats} />

        <RecentRuns engineId="code" />

        <QuickTestPanel engineId="code" inputType="text" />
      </div>
    </MainLayout>
  );
};

export default CodeEnginePage;
