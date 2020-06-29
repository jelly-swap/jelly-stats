import axios from 'axios';

export const getRewards = async () => {
  try {
    const res = await axios.get('https://spacejelly.network/candy/api/v1/lp/get');
    return res.data || [];
  } catch (error) {
    console.log('REWARDS: ', error);
    return [];
  }
};
