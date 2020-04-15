import axios from 'axios';

export const getHistory = async () => {
  try {
    const res = await axios.get(`
    https://spacejelly.network/candy/api/v1/swaps/get`);
    return res.data;
  } catch (error) {
    console.log('HISTORY_ERR: ', error);
    return {};
  }
};
