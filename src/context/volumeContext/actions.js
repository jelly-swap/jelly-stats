import * as jellyEth from "@jelly-swap/ethereum";
import { LOAD_ETH_EITHDRAWS, LOAD_VOLUME } from "./types";
import { getEthTransactionDate, clearTimeFromDate } from "../../utils";

const provider = new jellyEth.Providers.WalletProvider(
  "e76a85c5d0b785b33ca285b76423833375ca4924381a4e4e7f3e1c93156d2473",
  "https://mainnet.infura.io/v3/8fe4fc9626494d238879981936dbf144"
);

export const loadethWithdraws = async () => {
  const config = jellyEth.Config();
  config.contractAddress = "0xf567ea9138fe836555b9002abeea42a9dbf16ac5";

  const ethContract = new jellyEth.Contract(provider, config);

  await ethContract.subscribe();

  const swaps = await ethContract.getPastEvents("new", w => w);

  const ethWithdraws = swaps.filter(s => {
    return s.status === 3;
  });

  try {
    return {
      type: LOAD_ETH_EITHDRAWS,
      payload: { ethWithdraws: ethWithdraws }
    };
  } catch (error) {
    return {
      type: LOAD_ETH_EITHDRAWS,
      payload: { ethWithdraws: null }
    };
  }
};

export const loadVolume = async ethWithdraws => {
  const amounts = ethWithdraws.map(w => {
    return w.inputAmount;
  });

  const transformethWithdraws = item => {
    return Promise.resolve(getEthTransactionDate(item.transactionHash));
  };

  const funnel = async item => {
    return transformethWithdraws(item);
  };

  const getDates = async () => {
    const dates = await Promise.all(
      ethWithdraws.map(item => {
        const res = funnel(item);
        return res;
      })
    );

    return dates.map((d, i) => {
      return { x: clearTimeFromDate(d), y: amounts[i] / 1000000000000000000 };
    });
  };

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
