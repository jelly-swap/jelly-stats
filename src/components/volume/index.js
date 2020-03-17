import React, { useContext, useEffect, useState } from "react";
import VolumeContext from "../../context/volumeContext/context";
import Chart from "../../utils/lineChart";

import { getEthTransactionDate, clearTimeFromDate } from "../../utils";

import "./style.scss";

export default () => {
  const volumeContext = useContext(VolumeContext);
  const { withdraws } = volumeContext;

  const [datesWithOccurencies, setDatesWithOccurencies] = useState([]);

  useEffect(() => {
    const transformWithdraws = item => {
      return Promise.resolve(getEthTransactionDate(item.transactionHash));
    };

    const funnel = async item => {
      return transformWithdraws(item);
    };

    const getDates = async () => {
      if (withdraws)
        return Promise.all(
          withdraws.map(item => {
            const res = funnel(item);
            return res;
          })
        );
    };

    getDates().then(dates => {
      const rawDates = {};
      const finalChartData = [];

      dates.forEach(date => {
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

      setDatesWithOccurencies(finalChartData);
    });
  }, [withdraws]);

  console.log(datesWithOccurencies);

  const chartData = {
    datasets: [
      {
        label: "Volume",
        data: datesWithOccurencies,
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
