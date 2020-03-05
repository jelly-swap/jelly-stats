import React from "react";
import { Pie } from "react-chartjs-2";

export default props => {
  const chartData = props.chartData;

  return (
    <div className="chart">
      <Pie
        data={chartData}
        options={{
          title: {
            display: "Liquidity value in USD",
            text: "Liquidity value in USD",
            fontSize: 16
          }
          // legend: {
          //   display: true,
          //   position: "right"
          // }
        }}
      />
    </div>
  );
};
