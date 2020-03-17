import React, { useContext, useEffect, useState } from "react";
import VolumeContext from "../../context/volumeContext/context";
import Chart from "../../utils/lineChart";

import { clearTimeFromDate } from "../../utils";

import "./style.scss";

export default () => {
  const volumeContext = useContext(VolumeContext);
  const { volume } = volumeContext;
  const [chartDates, setChartDates] = useState([]);

  useEffect(() => {
    Object.values(volume).forEach(e => {
      const rawDates = {};
      const finalChartData = [];

      Object.values(volume).forEach(date => {
        if (!rawDates[clearTimeFromDate(date)]) {
          rawDates[clearTimeFromDate(date)] = 1;
        } else {
          rawDates[clearTimeFromDate(date)]++;
        }
      });

      Object.entries(rawDates).forEach(entry => {
        const date = entry[0];
        const count = entry[1];

        finalChartData.push({ x: date, y: count });
      });

      setChartDates(finalChartData);
    });
  }, [volume]);

  const chartData = {
    datasets: [
      {
        label: "Volume",
        data: chartDates,
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

  return (
    <div className="volume">
      <Chart
        chartData={chartData}
        titleText="Total Volume (completed swaps) - For All Time"
      />
    </div>
  );
};
