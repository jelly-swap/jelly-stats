import React from "react";
import { Line } from "react-chartjs-2";

export default props => {
  const chartData = props.chartData;
  const titleText = props.titleText;

  return (
    <div className="chart">
      <Line
        data={chartData}
        options={{
          responsive: true,

          title: {
            display: true,
            text: titleText,
            fontColor: "#fcfcfc",
            fontSize: "18",
            padding: "15"
          },

          legend: {
            display: false
          },

          scales: {
            xAxes: [
              {
                type: "time",
                time: {
                  unit: "day"
                },
                ticks: {
                  fontColor: "#fcfcfc"
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  fontColor: "#fcfcfc"
                }
              }
            ]
          }
        }}
      />
    </div>
  );
};
