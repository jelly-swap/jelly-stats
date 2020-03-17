import * as jellyEth from "@jelly-swap/ethereum";
import { LOAD_WITHDRAWS, LOAD_VOLUME } from "./types";
import { getEthTransactionDate, clearTimeFromDate } from "../../utils";

const provider = new jellyEth.Providers.WalletProvider(
  "e76a85c5d0b785b33ca285b76423833375ca4924381a4e4e7f3e1c93156d2473",
  "https://mainnet.infura.io/v3/8fe4fc9626494d238879981936dbf144"
);

export const loadWithdraws = async () => {
  const config = jellyEth.Config();
  config.contractAddress = "0xf567ea9138fe836555b9002abeea42a9dbf16ac5";

  const ethContract = new jellyEth.Contract(provider, config);

  await ethContract.subscribe();

  const swaps = await ethContract.getPastEvents("new", w => w);

  const withdraws = swaps.filter(s => {
    return s.status === 3;
  });

  try {
    return {
      type: LOAD_WITHDRAWS,
      payload: { withdraws: withdraws }
    };
  } catch (error) {
    return {
      type: LOAD_WITHDRAWS,
      payload: { withdraws: null }
    };
  }
};

export const loadVolume = async withdraws => {
  let res = [];

  const transformWithdraws = item => {
    return Promise.resolve(getEthTransactionDate(item.transactionHash));
  };

  const funnel = async item => {
    return transformWithdraws(item);
  };

  const getDates = async () => {
    return Promise.all(
      withdraws.map(item => {
        const res = funnel(item);
        return res;
      })
    );
  };

  // getDates().then(dates => {
  //   const rawDates = {};
  //   const finalChartData = [];

  //   dates.forEach(date => {
  //     if (!rawDates[clearTimeFromDate(date)]) {
  //       rawDates[clearTimeFromDate(date)] = 1;
  //     } else {
  //       rawDates[clearTimeFromDate(date)]++;
  //     }
  //   });

  //   Object.entries(rawDates).forEach(entry => {
  //     const date = entry[0];
  //     const count = entry[1];

  //     finalChartData.push({ x: date, y: count });
  //   });

  //   res = finalChartData;
  // });

  try {
    return {
      type: LOAD_VOLUME,
      payload: { volume: await getDates() }
    };
  } catch (error) {
    return {
      type: LOAD_VOLUME,
      payload: { volume: null }
    };
  }
};
