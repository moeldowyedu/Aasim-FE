import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import ModeSelector from '../../components/hitl/ModeSelector';
import ModeDescriptionPanel from '../../components/hitl/ModeDescriptionPanel';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import { HITL_MODES } from '../../utils/constants';
import { formatNumber } from '../../utils/formatters';

const OversightModesPage = () => {
  const [selectedMode, setSelectedMode] = useState('hitl');

  const handleSaveConfiguration = async () => {
    console.log('Saving configuration:', { mode: selectedMode });
    // TODO: Implement actual save logic with API
    alert('HITL mode configuration saved successfully!');
  };

  return (
    <MainLayout>
      <div className="p-6 max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold font-heading text-gray-900">HITL Oversight Modes</h1>
          <p className="text-gray-600 mt-2">
            Configure the level of human oversight for your AI agents
          </p>
        </div>

        {/* Mode Selector */}
        <ModeSelector
          modes={HITL_MODES}
          selected={selectedMode}
          onChange={setSelectedMode}
        />

        {/* Mode Description Panel */}
        <ModeDescriptionPanel mode={selectedMode} />

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSaveConfiguration} size="lg">
            Save Configuration
          </Button>
        </div>

        {/* Statistics */}
        <div>
          <h2 className="text-xl font-semibold font-heading text-gray-900 mb-4">Current Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <p className="text-sm text-gray-600 mb-1">Total Decisions Today</p>
              <p className="text-3xl font-bold text-gray-900">{formatNumber(12450)}</p>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <p className="text-sm text-gray-600 mb-1">Auto-Approved</p>
              <p className="text-3xl font-bold text-secondary-500">{formatNumber(10234)}</p>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <p className="text-sm text-gray-600 mb-1">Pending Review</p>
              <p className="text-3xl font-bold text-yellow-600">{formatNumber(1890)}</p>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <p className="text-sm text-gray-600 mb-1">Human Interventions</p>
              <p className="text-3xl font-bold text-primary-500">{formatNumber(326)}</p>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OversightModesPage;
