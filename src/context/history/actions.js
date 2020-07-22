import axios from 'axios';

export const getHistory = async () => {
  try {
    const res = await axios.get(`
    https://jelly-tracker.herokuapp.com/api/v1/swaps/all`);
    return res.data;
  } catch (error) {
    console.log('LIQUIDITY_ERR: ', error);
    return {};
  }
};
