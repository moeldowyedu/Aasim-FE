import MainLayout from '../../components/layout/MainLayout';
import EngineHeader from '../../components/engines/EngineHeader';
import RubricConfiguration from '../../components/engines/RubricConfiguration';
import EngineStats from '../../components/engines/EngineStats';
import RecentRuns from '../../components/engines/RecentRuns';
import QuickTestPanel from '../../components/engines/QuickTestPanel';

const AudioEnginePage = () => {
  const mockStats = {
    processedData: [
      { date: '11/10', count: 820 },
      { date: '11/11', count: 950 },
      { date: '11/12', count: 880 },
      { date: '11/13', count: 1120 },
      { date: '11/14', count: 990 },
      { date: '11/15', count: 1050 },
      { date: '11/16', count: 1180 },
    ],
    accuracyData: [
      { date: '11/10', accuracy: 96.5 },
      { date: '11/11', accuracy: 96.8 },
      { date: '11/12', accuracy: 97.1 },
      { date: '11/13', accuracy: 97.4 },
      { date: '11/14', accuracy: 97.2 },
      { date: '11/15', accuracy: 97.6 },
      { date: '11/16', accuracy: 97.8 },
    ],
    performanceMetrics: [
      { label: 'Avg Processing Time', value: '2.8s' },
      { label: 'Success Rate', value: '98.2%' },
      { label: 'Queue Length', value: '15' },
      { label: 'Active Rubrics', value: '5' },
    ]
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-8">
        <EngineHeader
          name="Precision Audio Engine"
          icon="🎵"
          status="active"
          description="Audio quality evaluation, transcription accuracy, and compliance checking"
        />

        <RubricConfiguration engineId="audio" />

        <EngineStats stats={mockStats} />

        <RecentRuns engineId="audio" />

        <QuickTestPanel engineId="audio" inputType="audio-upload" />
      </div>
    </MainLayout>
  );
};

export default AudioEnginePage;
