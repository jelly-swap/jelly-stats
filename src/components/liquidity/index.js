import React, { useContext } from "react";
import ProviderInfoContext from "../../context/providerInfo/context";
import { safeAccess } from "../../utils";
import calcTotalBalance from "./calcTotalBalance";
import Chart from "../../utils/chart";
import "./style.scss";

export default () => {
  const providerInfoContext = useContext(ProviderInfoContext);
  const { providerInfo } = providerInfoContext;

  const prices = safeAccess(providerInfo[0], ["prices"]);
  const balances = safeAccess(providerInfo[0], ["balances"]);

  const totalBalance = calcTotalBalance(balances, prices);

  return (
    <div className="liquidity">
      <span>{totalBalance}</span>
      <Chart />
    </div>
  );
};
