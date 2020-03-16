import React from "react";
import Chart from "../../utils/lineChart";
import ethData from "./ethereum";

import "./style.scss";

ethData();

const chartData = {
  datasets: [
    {
      label: "Volume",
      data: [
        { x: new Date(2020, 2, 5), y: 12 },
        { x: new Date(2020, 2, 10), y: 28 },
        { x: new Date(2020, 2, 12), y: 16 }
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
  return (
    <div className="volume">
      <Chart
        chartData={chartData}
        titleText="Total Volume (completed swaps) - For All Time"
      />
    </div>
  );
};
