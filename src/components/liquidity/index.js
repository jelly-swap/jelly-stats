import React, { useContext } from "react";
import ProviderInfoContext from "../../context/providerInfo/context";
import { safeAccess, aggregateBalances } from "../../utils";
import Chart from "../../utils/pieChart";
import Error from "../error";
import "./style.scss";

export default () => {
  const providerInfoContext = useContext(ProviderInfoContext);
  const { providerInfo } = providerInfoContext;

  // Prices from Jelly provider
  const prices = safeAccess(providerInfo[0], ["prices"]);

  // Balances from Jelly provider, for reference on available tokens
  const balances = safeAccess(providerInfo[0], ["balances"]);

  let labels = [];
  let shortBalances = [];

  if (balances) {
    labels = Object.keys(balances);

    Object.entries(balances).forEach(entry => {
      const network = entry[0];

      // Aggregating balances from all other providers
      const balanceShortAggregated = aggregateBalances(providerInfo, network);

      // Converting balances from all providers to USD
      const priceToUSDT = safeAccess(prices, [network, "USDT"]);
      const balanceShortUSDT = parseFloat(balanceShortAggregated * priceToUSDT);

      // Loading balances from all providers into array
      shortBalances.push(balanceShortUSDT.toFixed(3));
    });
  }

  const sumOfBalances = shortBalances.reduce(
    (a, b) => parseFloat(a) + parseFloat(b),
    0
  );

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Liquidity",
        data: shortBalances,
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

  return providerInfo && providerInfo[0] ? (
    <div className="liquidity slide-in-bottom">
      <span className="total">Total: {sumOfBalances.toFixed(3)} $</span>
      <Chart chartData={chartData} titleText="Liquidity value (in USD)" />
    </div>
  ) : (
    <Error msg={"Cannot fetch data."} />
  );
};
