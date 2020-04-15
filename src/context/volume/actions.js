// import axios from 'axios';

const mock = {
  ETH: { '01.02.2020': 15.5, '02.02.2020': 13.3, '03.02.2020': 18.8, '04.02.2020': 20.5, '05.02.2020': 17 },
  BTC: { '01.02.2020': 7.5, '02.02.2020': 9.3, '03.02.2020': 8.8, '04.02.2020': 5.5, '05.02.2020': 7 },
  AE: { '01.02.2020': 5.5, '02.02.2020': 1.3, '03.02.2020': 4.8, '04.02.2020': 2.5, '05.02.2020': 6 },
};

export const getVolume = async () => {
  return mock;
  //   try {
  //     const res = await axios.get(`
  //     https://spacejelly.network/candy/api/v1/swaps/get`);
  //     return res.data;
  //   } catch (error) {
  //     console.log('VOLUME_ERR: ', error);
  //     return {};
  //   }
};
