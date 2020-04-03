import axios from 'axios';
import { BASE_URL } from '../../config';

export const getHistory = async () => {
  try {
    const res = await axios.get(`
    https://spacejelly.network/candy/api/v1/swaps/get`);
    // ${BASE_URL}/swaps/get`);
    return res.data;
  } catch (error) {
    console.log('LIQUIDITY_ERR: ', error);
    return {};
  }
};
