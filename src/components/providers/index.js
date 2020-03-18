import React, { useContext, useState } from "react";
import Select from "react-select";
import {
  safeAccess,
  aggregateProviders,
  getAddressesPerToken,
  selectorStyles
} from "../../utils";
import Chart from "../../utils/pieChart";
import Error from "../../components/error";

import ProviderInfoContext from "../../context/providerInfo/context";

import "./styles.scss";

export default () => {
  const providerInfoContext = useContext(ProviderInfoContext);
  const { providerInfo } = providerInfoContext;
  const [chosenToken, setChosenToken] = useState("ETH");

  // Balances from Jelly provider for reference on available tokens
  const balances = safeAccess(providerInfo[0], ["balances"]);

  let options = [];
  let addressesWithBalance = [];

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

  const tooltips = {
    enabled: true,
    callbacks: {
      label: (tooltipItem, data) => {
        const { index } = tooltipItem;
        const address = data.labels[index];

        const amount = data.datasets[0].data[index];
        return ` ${address} : ${amount} ${chosenToken}`;
      }
    }
  };

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

  const sumOfBalancesPerToken = () => {
    return Object.values(addressesWithBalance).reduce((a, b) => {
      return parseFloat(a) + parseFloat(b);
    }, 0);
  };

  return providerInfo && providerInfo[0] ? (
    <div className="providers slide-in-bottom">
      <div className="selector-wrapper">
        <span className="total">
          Total: {sumOfBalancesPerToken()} {chosenToken}
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
        tooltips={tooltips}
      />
    </div>
  ) : (
    <Error msg={"Cannot fetch data."} />
  );
};
