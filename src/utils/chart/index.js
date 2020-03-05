import React from "react";
import { Pie } from "react-chartjs-2";

export default props => {
  const chartData = props.chartData;

  return (
    <div className="chart">
      <Pie
        data={chartData}
        options={{
          responsive: true,
          title: {
            display: "Liquidity value in USD",
            text: "Liquidity value in USD",
            fontSize: 24,
            fontColor: "#fcfcfc"
          },
          legend: {
            position: "left",
            labels: {
              padding: 15,
              fontColor: "#fcfcfc"
            }
          }
        }}
      />
    </div>
  );
};
