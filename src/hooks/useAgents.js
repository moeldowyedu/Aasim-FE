import { useState, useEffect } from 'react';
import agentService from '../services/agentService';

export const useMarketplaceAgents = (filters = {}) => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAgents();
  }, [JSON.stringify(filters)]);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const data = await agentService.getMarketplaceAgents(filters);
      setAgents(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    agents,
    loading,
    error,
    refetch: fetchAgents
  };
};

export const useMyAgents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const data = await agentService.getMyAgents();
      setAgents(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deployAgent = async (agentId, config) => {
    try {
      const result = await agentService.deployAgent(agentId, config);
      await fetchAgents(); // Refresh list
      return result;
    } catch (err) {
      throw err;
    }
  };

  const undeployAgent = async (deploymentId) => {
    try {
      await agentService.undeployAgent(deploymentId);
      await fetchAgents(); // Refresh list
    } catch (err) {
      throw err;
    }
  };

  return {
    agents,
    loading,
    error,
    refetch: fetchAgents,
    deployAgent,
    undeployAgent
  };
};

export const usePrivateAgents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const data = await agentService.getPrivateAgents();
      setAgents(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createAgent = async (agentData) => {
    try {
      const result = await agentService.createPrivateAgent(agentData);
      await fetchAgents(); // Refresh list
      return result;
    } catch (err) {
      throw err;
    }
  };

  const updateAgent = async (agentId, agentData) => {
    try {
      const result = await agentService.updatePrivateAgent(agentId, agentData);
      await fetchAgents(); // Refresh list
      return result;
    } catch (err) {
      throw err;
    }
  };

  const deleteAgent = async (agentId) => {
    try {
      await agentService.deletePrivateAgent(agentId);
      await fetchAgents(); // Refresh list
    } catch (err) {
      throw err;
    }
  };

  return {
    agents,
    loading,
    error,
    refetch: fetchAgents,
    createAgent,
    updateAgent,
    deleteAgent
  };
};
