import React, { useContext, useState } from "react";
import Select from "react-select";
import {
  safeAccess,
  formatDisplayAddr,
  formatDisplayBalance
} from "../../utils";
import Chart from "../../utils/chart";

import ProviderInfoContext from "../../context/providerInfo/context";

import selectorStyles from "./selectorStyles";

import "./styles.scss";

export default () => {
  const providerInfoContext = useContext(ProviderInfoContext);
  const { providerInfo } = providerInfoContext;
  const [chosenToken, setChosenToken] = useState("ETH");

  console.log("PROVIDER INFO ", providerInfo);

  const balances = safeAccess(providerInfo[0], ["balances"]);
  let options = [];
  let addressesPerToken = [];
  let balancesOfAddressesPerToken = [];

  if (balances) {
    const keys = Object.keys(balances);
    keys.forEach(e => {
      options.push({
        value: e.toLocaleLowerCase(),
        label: e
      });
    });

    addressesPerToken = formatDisplayAddr([balances[chosenToken].address]);
    balancesOfAddressesPerToken = formatDisplayBalance([
      balances[chosenToken].balanceShort
    ]);
  }

  const chartData = {
    labels: [addressesPerToken],
    datasets: [
      {
        label: "Liquidity",
        data: [balancesOfAddressesPerToken],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)"
        ]
      }
    ]
  };

  return (
    <div className="providers">
      <div className="selector-wrapper">
        <Select
          options={options}
          styles={selectorStyles()}
          onChange={e => setChosenToken(e.label)}
          placeholder={chosenToken}
          value={chosenToken}
        />

        <Chart
          chartData={chartData}
          titleText="Liquidity providers by token (in token quantity)"
        />
      </div>
    </div>
  );
};
