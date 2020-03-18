import React from "react";
import { Pie } from "react-chartjs-2";

export default ({ chartData, titleText, tooltips }) => {
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
          },
          title: {
            display: true,
            text: titleText,
            fontColor: "#fcfcfc",
            fontSize: "18",
            padding: "15"
          },
          tooltips: {
            ...tooltips
          }
        }}
      />
    </div>
  );
};
