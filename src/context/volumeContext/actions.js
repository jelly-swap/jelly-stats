import * as jellyEth from "@jelly-swap/ethereum";
import * as jellyAeternity from "@jelly-swap/aeternity";

import { LOAD_ETH_WITHDRAWS, LOAD_AE_WITHDRAWS, LOAD_VOLUME } from "./types";
import { getEthTransactionDate, clearTimeFromDate } from "../../utils";

export const loadEthWithdraws = async () => {
  const provider = new jellyEth.Providers.WalletProvider(
    "e76a85c5d0b785b33ca285b76423833375ca4924381a4e4e7f3e1c93156d2473",
    "https://mainnet.infura.io/v3/8fe4fc9626494d238879981936dbf144"
  );

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
      type: LOAD_ETH_WITHDRAWS,
      payload: { ethWithdraws: ethWithdraws }
    };
  } catch (error) {
    return {
      type: LOAD_ETH_WITHDRAWS,
      payload: { ethWithdraws: null }
    };
  }
};

export const loadAeWithdraws = async () => {
  const config = jellyAeternity.Config();
  config.explorer = "https://explorer.aeternity.io/transactions/";
  config.apiUrl = "https://mainnet.aeternal.io/";
  config.wsUrl = "wss://mainnet.aeternal.io/websocket";
  config.providerUrl = "https://sdk-mainnet.aepps.com/";
  config.internalUrl = "https://sdk-mainnet.aepps.com/";

  const httpProvider = new jellyAeternity.Providers.HTTP(config, {
    publicKey: "ak_SMwGaaRfryc8s7wPhpa1jzxAAtJfkWz2rZG5zrBny968Eqiqr",
    secretKey:
      "e6f7f740df605b297e1aec7326688ef8d31bed76d8e00f8f2ca76ff712938e373995cd2684368479b0d1069ea1471fc9926c0ca6489bc728f0b94c14c2c42fa0"
  });

  const aeternityContract = new jellyAeternity.Contract(httpProvider);
  await aeternityContract.subscribe();

  // Get past blockchain events
  const swaps = await aeternityContract.getPastEvents("new", w => w);

  const aeWithdraws = swaps.filter(s => {
    return s.status === 3;
  });
  console.log("ae withdraws ", aeWithdraws);

  try {
    return {
      type: LOAD_AE_WITHDRAWS,
      payload: { aeWithdraws: { 1: "Test" } }
    };
  } catch (error) {
    return {
      type: LOAD_AE_WITHDRAWS,
      payload: { aeWithdraws: null }
    };
  }
};

export const loadVolume = async withdraws => {
  const amounts = withdraws.map(w => {
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
      withdraws.map(item => {
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
