import React, { useState, useEffect } from "react";
import Chart from "../../utils/lineChart";
import getEthData from "./ethereum";
import { getEthTransactionDate } from "../../utils";

import "./style.scss";

const chartData = {
  datasets: [
    {
      label: "Volume",
      data: [
        { x: new Date(1584262772 * 1000), y: 12 },
        { x: new Date(1584262714 * 1000), y: 28 }
      ],
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

export default () => {
  const [args, setArgs] = useState([]);

  useEffect(() => {
    const objArr = {};

    getEthData().then(data => {
      const values = Object.values(data);

      values.forEach(arg => {
        const hash = arg.transactionHash;
        const date = getEthTransactionDate(hash);
        objArr[hash] = 1;
      });

      setArgs(objArr);
    });
  }, []);

  console.log("FINAL ", args);

  return (
    <div className="volume">
      <Chart
        chartData={chartData}
        titleText="Total Volume (completed swaps) - For All Time"
      />
    </div>
  );
};
