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
