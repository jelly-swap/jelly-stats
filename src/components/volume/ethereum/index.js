import * as jellyEth from "@jelly-swap/ethereum";
import { getEthTransactionDate } from "../../../utils";

const provider = new jellyEth.Providers.WalletProvider(
  "e76a85c5d0b785b33ca285b76423833375ca4924381a4e4e7f3e1c93156d2473",
  "https://mainnet.infura.io/v3/8fe4fc9626494d238879981936dbf144"
);

const config = jellyEth.Config();
config.contractAddress = "0xf567ea9138fe836555b9002abeea42a9dbf16ac5";

const ethContract = new jellyEth.Contract(provider, config);

export default async () => {
  await ethContract.subscribe();

  const withdraws = await ethContract.getPastEvents("withdraw", w => w);

  withdraws.forEach(async withdrawTx => {
    console.log(await getEthTransactionDate(withdrawTx.transactionHash));
  });
};
