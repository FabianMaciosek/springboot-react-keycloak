import axios from 'axios';
import { config } from '../../Constants';

export const strategiesApi = {
  getStrategies,
  getStrategy,
  saveStrategy,
  deleteStrategy
};

function getStrategies() {
  return instance.get('/api/strategies');
}

function getStrategy(strategyId) {
  return instance.get(`/api/strategies/${strategyId}`);
}

function saveStrategy(strategy, token) {
  return instance.post('/api/strategies', strategy, {
    headers: { Authorization: bearerAuth(token) }
  });
}

function deleteStrategy(strategyId, token) {
  return instance.delete(`/api/strategies/${strategyId}`, {
    headers: { Authorization: bearerAuth(token) }
  });
}

/* ---------------------------------------------------- */

const instance = axios.create({
  baseURL: config.url.API_BASE_URL
});

instance.interceptors.response.use(
  (resp) => resp,
  (error) => {
    if (error.response.status === 404) {
      return { status: 404 };
    }
    return Promise.reject(error.response);
  }
);

function bearerAuth(token) {
  return `Bearer ${token}`;
}
