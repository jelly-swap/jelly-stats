import * as jellyEth from "@jelly-swap/ethereum";
import { LOAD_DATA } from "./types";

const provider = new jellyEth.Providers.WalletProvider(
  "e76a85c5d0b785b33ca285b76423833375ca4924381a4e4e7f3e1c93156d2473",
  "https://mainnet.infura.io/v3/8fe4fc9626494d238879981936dbf144"
);

export const loadData = async () => {
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
      type: LOAD_DATA,
      payload: { withdraws: withdraws }
    };
  } catch (error) {
    return {
      type: LOAD_DATA,
      payload: { withdraws: null }
    };
  }
};
