import axios from 'axios';
import { BASE_URL } from '../../config';

export const getPrices = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/price/average`);
    return res.data;
  } catch (error) {
    console.log('PRICE_ERR: ', error);
    return {};
  }
};
