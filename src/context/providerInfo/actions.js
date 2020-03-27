import axios from 'axios';
import { FETCH_PROVIDERS_INFO, AGGREGATE_TOKENS } from './types';
import { getTotalAmountForToken } from '../../services';

export const fetchProvidersInfo = async () => {
  try {
    const res = await axios.get('https://jelly-jam.herokuapp.com/api/v1/info/get');
    return {
      type: FETCH_PROVIDERS_INFO,
      payload: res.data
    };
  } catch (error) {
    return {
      type: FETCH_PROVIDERS_INFO,
      payload: null
    };
  }
};

export const aggregateTokens = providers => {
  const totalLiquidityForEachToken = getTotalAmountForToken(providers);

  return {
    type: AGGREGATE_TOKENS,
    payload: totalLiquidityForEachToken
  };
};
