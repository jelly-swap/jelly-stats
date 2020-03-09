import React, { useContext, useState } from "react";
import Select from "react-select";
import { safeAccess } from "../../utils";
import Chart from "../../utils/chart";

import ProviderInfoContext from "../../context/providerInfo/context";

import selectorStyles from "./selectorStyles";

import "./styles.scss";

export default () => {
  const providerInfoContext = useContext(ProviderInfoContext);
  const { providerInfo } = providerInfoContext;
  const [chosenToken, setChosenToken] = useState("");

  const chartData = {
    labels: ["one", "two", "three"],
    datasets: [
      {
        label: "Liquidity",
        data: [1, 2, 3],
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

  console.log("PROVIDER INFO ", providerInfo);

  const balances = safeAccess(providerInfo[0], ["balances"]);
  let options = [];

  if (balances) {
    let keys = Object.keys(balances);
    keys.forEach(e => {
      options.push({
        value: e.toLocaleLowerCase(),
        label: e
      });
    });
  }

  return (
    <div className="providers">
      <div className="selector-wrapper">
        <Select
          options={options}
          styles={selectorStyles()}
          onChange={e => setChosenToken(e.value)}
        />

        <Chart chartData={chartData} />
      </div>
    </div>
  );
};
