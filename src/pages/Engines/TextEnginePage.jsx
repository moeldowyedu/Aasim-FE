import MainLayout from '../../components/layout/MainLayout';
import EngineHeader from '../../components/engines/EngineHeader';
import RubricConfiguration from '../../components/engines/RubricConfiguration';
import EngineStats from '../../components/engines/EngineStats';
import RecentRuns from '../../components/engines/RecentRuns';
import QuickTestPanel from '../../components/engines/QuickTestPanel';

const TextEnginePage = () => {
  const mockStats = {
    processedData: [
      { date: '11/10', count: 3200 },
      { date: '11/11', count: 3580 },
      { date: '11/12', count: 3320 },
      { date: '11/13', count: 4100 },
      { date: '11/14', count: 3890 },
      { date: '11/15', count: 4200 },
      { date: '11/16', count: 4450 },
    ],
    accuracyData: [
      { date: '11/10', accuracy: 98.5 },
      { date: '11/11', accuracy: 98.7 },
      { date: '11/12', accuracy: 98.9 },
      { date: '11/13', accuracy: 99.1 },
      { date: '11/14', accuracy: 99.0 },
      { date: '11/15', accuracy: 99.2 },
      { date: '11/16', accuracy: 99.4 },
    ],
    performanceMetrics: [
      { label: 'Avg Processing Time', value: '0.8s' },
      { label: 'Success Rate', value: '99.5%' },
      { label: 'Queue Length', value: '42' },
      { label: 'Active Rubrics', value: '12' },
    ]
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-8">
        <EngineHeader
          name="Precision Text Engine"
          icon="📝"
          status="active"
          description="NLP-powered text analysis with sentiment, readability, and custom criteria evaluation"
        />

        <RubricConfiguration engineId="text" />

        <EngineStats stats={mockStats} />

        <RecentRuns engineId="text" />

        <QuickTestPanel engineId="text" inputType="text" />
      </div>
    </MainLayout>
  );
};

export default TextEnginePage;
