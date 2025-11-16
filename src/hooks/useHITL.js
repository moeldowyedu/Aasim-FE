import { useState, useEffect } from 'react';
import hitlService from '../services/hitlService';

export const useOversightMode = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      setLoading(true);
      const data = await hitlService.getOversightConfig();
      setConfig(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const setMode = async (modeId, modeConfig) => {
    try {
      const result = await hitlService.setOversightMode(modeId, modeConfig);
      await fetchConfig(); // Refresh config
      return result;
    } catch (err) {
      throw err;
    }
  };

  return {
    config,
    loading,
    error,
    setMode,
    refetch: fetchConfig
  };
};

export const useApprovalQueue = (filters = {}) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQueue();
  }, [JSON.stringify(filters)]);

  const fetchQueue = async () => {
    try {
      setLoading(true);
      const data = await hitlService.getApprovalQueue(filters);
      setItems(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const approve = async (itemId, feedback = {}) => {
    try {
      await hitlService.approveItem(itemId, feedback);
      await fetchQueue(); // Refresh queue
    } catch (err) {
      throw err;
    }
  };

  const reject = async (itemId, reason) => {
    try {
      await hitlService.rejectItem(itemId, reason);
      await fetchQueue(); // Refresh queue
    } catch (err) {
      throw err;
    }
  };

  const bulkApprove = async (itemIds) => {
    try {
      await hitlService.bulkApprove(itemIds);
      await fetchQueue(); // Refresh queue
    } catch (err) {
      throw err;
    }
  };

  const bulkReject = async (itemIds, reason) => {
    try {
      await hitlService.bulkReject(itemIds, reason);
      await fetchQueue(); // Refresh queue
    } catch (err) {
      throw err;
    }
  };

  return {
    items,
    loading,
    error,
    refetch: fetchQueue,
    approve,
    reject,
    bulkApprove,
    bulkReject
  };
};

export const useHITLStats = (params = {}) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, [JSON.stringify(params)]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await hitlService.getHITLStats(params);
      setStats(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    stats,
    loading,
    error,
    refetch: fetchStats
  };
};
