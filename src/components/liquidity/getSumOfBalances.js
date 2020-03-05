import { safeAccess } from "../../utils";

export default (balances, prices) => {
  if (balances) {
    let network = "";
    let balance = 0;
    let price = 0;

    const balancesUSDT = [];

    Object.entries(balances).forEach(balanceInfo => {
      network = balanceInfo[0];
      balance = balanceInfo[1].balanceShort;
      price = safeAccess(prices, [network, "USDT"]);

      balancesUSDT.push(price * balance);
      return balancesUSDT.reduce((a, b) => a + b, 0);
    });
  }
};
