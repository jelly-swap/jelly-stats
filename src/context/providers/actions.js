import axios from 'axios';
import { BASE_URL } from '../../config';

export const getProviders = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/info/get`);
    return res.data;
  } catch (error) {
    console.log('PROVIDERS_ERR: ', error);
    return {};
  }
};
