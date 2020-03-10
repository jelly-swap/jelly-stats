import React, { useContext, useState } from "react";
import Select from "react-select";
import {
  safeAccess,
  aggregateProviders,
  getAddressesPerToken
} from "../../utils";
import Chart from "../../utils/chart";

import ProviderInfoContext from "../../context/providerInfo/context";

import selectorStyles from "./selectorStyles";

import "./styles.scss";

export default () => {
  const providerInfoContext = useContext(ProviderInfoContext);
  const { providerInfo } = providerInfoContext;
  const [chosenToken, setChosenToken] = useState("ETH");

  // Balances from Jelly provider for reference on available tokens
  const balances = safeAccess(providerInfo[0], ["balances"]);

  let options = [];
  let addressesWithBalance = [];
  let balancesOfAddressesPerToken = [];

  if (balances) {
    const keys = Object.keys(balances);
    keys.forEach(e => {
      options.push({
        value: e.toLocaleLowerCase(),
        label: e
      });
    });

    const aggregatedProviders = aggregateProviders(providerInfo);

    addressesWithBalance = getAddressesPerToken(
      aggregatedProviders,
      chosenToken
    );
  }

  const chartData = {
    labels: Object.keys(addressesWithBalance),
    datasets: [
      {
        label: "Liquidity",
        data: Object.values(addressesWithBalance),
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
    <div className="providers slide-in-bottom">
      <div className="selector-wrapper">
        <span className="total">
          Total: {balancesOfAddressesPerToken} {chosenToken}
        </span>
        <Select
          options={options}
          styles={selectorStyles()}
          onChange={e => setChosenToken(e.label)}
          placeholder={chosenToken}
          value={chosenToken}
        />
      </div>
      <Chart
        chartData={chartData}
        titleText="Liquidity providers by token (in token quantity)"
      />
    </div>
  );
};
