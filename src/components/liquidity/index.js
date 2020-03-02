import React, { useContext } from "react";
import ProviderInfoContext from "../../context/providerInfo/context";
import { safeAccess } from "../../utils";
import "./style.scss";

export default () => {
  const providerInfoContext = useContext(ProviderInfoContext);
  const { providerInfo } = providerInfoContext;

  // TODO: Extract this to a seperate component
  const prices = safeAccess(providerInfo[0], ["prices"]);
  const balances = safeAccess(providerInfo[0], ["balances"]);
  let totalBalance = 0;

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
      totalBalance = balancesUSDT.reduce((a, b) => a + b, 0);
    });
  }

  return (
    <div className="liquidity">
      <span>{totalBalance}</span>
    </div>
  );
};
