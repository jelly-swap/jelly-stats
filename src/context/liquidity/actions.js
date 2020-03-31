import axios from 'axios';
import { BASE_URL } from '../../config';

export const getLiquidity = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/liquidity/get`);
    return res.data;
  } catch (error) {
    console.log('LIQUIDITY_ERR: ', error);
    return {};
  }
};
