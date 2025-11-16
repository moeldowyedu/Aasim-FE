import { useState, useEffect } from 'react';
import EngineCard from '../../components/engines/EngineCard';
import Card from '../../components/common/Card/Card';

const EnginesOverviewPage = () => {
  const [engines, setEngines] = useState([
    {
      id: 'vision',
      name: 'Vision Engine',
      icon: '👁️',
      description: 'Precision image & video analysis with custom rubrics',
      status: 'active',
      category: 'Vision',
      processedToday: 15420,
      accuracy: '98.5%',
      color: 'bg-blue-100'
    },
    {
      id: 'audio',
      name: 'Audio Engine',
      icon: '🎵',
      description: 'Evaluate audio quality, transcription, and compliance',
      status: 'active',
      category: 'Audio',
      processedToday: 8234,
      accuracy: '97.2%',
      color: 'bg-purple-100'
    },
    {
      id: 'text',
      name: 'Text Engine',
      icon: '📝',
      description: 'NLP-powered text analysis with custom criteria',
      status: 'active',
      category: 'Text',
      processedToday: 32190,
      accuracy: '99.1%',
      color: 'bg-green-100'
    },
    {
      id: 'code',
      name: 'Code Engine',
      icon: '💻',
      description: 'Automated code review and quality assessment',
      status: 'active',
      category: 'Code',
      processedToday: 5678,
      accuracy: '96.8%',
      color: 'bg-yellow-100'
    },
    {
      id: 'document',
      name: 'Document Engine',
      icon: '📄',
      description: 'PDF, DOCX analysis and compliance checking',
      status: 'active',
      category: 'Document',
      processedToday: 12340,
      accuracy: '98.9%',
      color: 'bg-red-100'
    },
    {
      id: 'data',
      name: 'Data Engine',
      icon: '📊',
      description: 'Structured data validation and quality checks',
      status: 'active',
      category: 'Data',
      processedToday: 45678,
      accuracy: '99.5%',
      color: 'bg-indigo-100'
    },
    {
      id: 'web',
      name: 'Web Engine',
      icon: '🌐',
      description: 'Web scraping validation and content evaluation',
      status: 'active',
      category: 'Web',
      processedToday: 9876,
      accuracy: '97.8%',
      color: 'bg-pink-100'
    }
  ]);

  const totalProcessed = engines.reduce((sum, engine) => sum + (engine.processedToday || 0), 0);
  const avgAccuracy = (engines.reduce((sum, engine) => sum + parseFloat(engine.accuracy || 0), 0) / engines.length).toFixed(1);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Precision AI Engines</h1>
        <p className="text-gray-600 mt-2">
          Enterprise-grade AI evaluation engines with custom rubric support
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <p className="text-sm text-gray-600 mb-1">Total Engines</p>
          <p className="text-3xl font-bold text-gray-900">{engines.length}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">Active Engines</p>
          <p className="text-3xl font-bold text-green-600">
            {engines.filter(e => e.status === 'active').length}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">Processed Today</p>
          <p className="text-3xl font-bold text-gray-900">{totalProcessed.toLocaleString()}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 mb-1">Avg. Accuracy</p>
          <p className="text-3xl font-bold text-blue-600">{avgAccuracy}%</p>
        </Card>
      </div>

      {/* Engines Grid */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Engines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {engines.map((engine) => (
            <EngineCard key={engine.id} engine={engine} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnginesOverviewPage;
