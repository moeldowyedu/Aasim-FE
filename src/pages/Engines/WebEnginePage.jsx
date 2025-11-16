import MainLayout from '../../components/layout/MainLayout';
import EngineHeader from '../../components/engines/EngineHeader';
import RubricConfiguration from '../../components/engines/RubricConfiguration';
import EngineStats from '../../components/engines/EngineStats';
import RecentRuns from '../../components/engines/RecentRuns';
import QuickTestPanel from '../../components/engines/QuickTestPanel';

const WebEnginePage = () => {
  const mockStats = {
    processedData: [
      { date: '11/10', count: 980 },
      { date: '11/11', count: 1120 },
      { date: '11/12', count: 1050 },
      { date: '11/13', count: 1280 },
      { date: '11/14', count: 1190 },
      { date: '11/15', count: 1350 },
      { date: '11/16', count: 1420 },
    ],
    accuracyData: [
      { date: '11/10', accuracy: 96.8 },
      { date: '11/11', accuracy: 97.1 },
      { date: '11/12', accuracy: 97.4 },
      { date: '11/13', accuracy: 97.7 },
      { date: '11/14', accuracy: 97.6 },
      { date: '11/15', accuracy: 97.9 },
      { date: '11/16', accuracy: 98.1 },
    ],
    performanceMetrics: [
      { label: 'Avg Processing Time', value: '1.9s' },
      { label: 'Success Rate', value: '98.4%' },
      { label: 'Queue Length', value: '27' },
      { label: 'Active Rubrics', value: '6' },
    ]
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-8">
        <EngineHeader
          name="Precision Web Engine"
          icon="🌐"
          status="active"
          description="Web scraping validation, content evaluation, and SEO analysis"
        />

        <RubricConfiguration engineId="web" />

        <EngineStats stats={mockStats} />

        <RecentRuns engineId="web" />

        <QuickTestPanel engineId="web" inputType="url" />
      </div>
    </MainLayout>
  );
};

export default WebEnginePage;
