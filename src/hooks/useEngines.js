import { useState, useEffect } from 'react';
import engineService from '../services/engineService';

export const useEngines = () => {
  const [engines, setEngines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEngines();
  }, []);

  const fetchEngines = async () => {
    try {
      setLoading(true);
      const data = await engineService.getEngines();
      setEngines(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getEngine = async (id) => {
    try {
      const data = await engineService.getEngine(id);
      return data;
    } catch (err) {
      throw err;
    }
  };

  const processWithEngine = async (engineId, data) => {
    try {
      const result = await engineService.process(engineId, data);
      return result;
    } catch (err) {
      throw err;
    }
  };

  return {
    engines,
    loading,
    error,
    refetch: fetchEngines,
    getEngine,
    processWithEngine
  };
};

export const useEngine = (engineId) => {
  const [engine, setEngine] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (engineId) {
      fetchEngine();
      fetchStats();
    }
  }, [engineId]);

  const fetchEngine = async () => {
    try {
      setLoading(true);
      const data = await engineService.getEngine(engineId);
      setEngine(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const data = await engineService.getEngineStats(engineId);
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  return {
    engine,
    stats,
    loading,
    error,
    refetch: fetchEngine
  };
};
