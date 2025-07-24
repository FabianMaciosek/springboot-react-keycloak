import axios from 'axios';
import { config } from '../../Constants';

export const backtestApi = { getBacktest };

function getBacktest(strategyId) {
  return instance.get(`/api/backtests/${strategyId}`);
}

const instance = axios.create({ baseURL: config.url.API_BASE_URL });
