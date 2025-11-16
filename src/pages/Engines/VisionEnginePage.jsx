import MainLayout from '../../components/layout/MainLayout';
import EngineHeader from '../../components/engines/EngineHeader';
import RubricConfiguration from '../../components/engines/RubricConfiguration';
import EngineStats from '../../components/engines/EngineStats';
import RecentRuns from '../../components/engines/RecentRuns';
import QuickTestPanel from '../../components/engines/QuickTestPanel';

const VisionEnginePage = () => {
  const mockStats = {
    processedData: [
      { date: '11/10', count: 1200 },
      { date: '11/11', count: 1450 },
      { date: '11/12', count: 1320 },
      { date: '11/13', count: 1780 },
      { date: '11/14', count: 1590 },
      { date: '11/15', count: 1820 },
      { date: '11/16', count: 1940 },
    ],
    accuracyData: [
      { date: '11/10', accuracy: 97.2 },
      { date: '11/11', accuracy: 97.8 },
      { date: '11/12', accuracy: 98.1 },
      { date: '11/13', accuracy: 98.5 },
      { date: '11/14', accuracy: 98.3 },
      { date: '11/15', accuracy: 98.7 },
      { date: '11/16', accuracy: 98.9 },
    ],
    performanceMetrics: [
      { label: 'Avg Processing Time', value: '1.2s' },
      { label: 'Success Rate', value: '99.1%' },
      { label: 'Queue Length', value: '23' },
      { label: 'Active Rubrics', value: '7' },
    ]
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-8">
        <EngineHeader
          name="Precision Vision Engine"
          icon="👁️"
          status="active"
          description="Advanced image and video analysis with custom rubric-based evaluation"
        />

        <RubricConfiguration engineId="vision" />

        <EngineStats stats={mockStats} />

        <RecentRuns engineId="vision" />

        <QuickTestPanel engineId="vision" inputType="image-upload" />
      </div>
    </MainLayout>
  );
};

export default VisionEnginePage;
