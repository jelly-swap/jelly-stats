import React, { useContext, useEffect } from "react";
import VolumeContext from "../../context/volumeContext/context";
import Chart from "../../utils/lineChart";

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
  const volumeContext = useContext(VolumeContext);
  const { dates } = volumeContext;

  useEffect(() => {
    const functionWithPromise = item => {
      //a function that returns a promise
      return Promise.resolve(getEthTransactionDate(item.transactionHash));
    };

    const anAsyncFunction = async item => {
      return functionWithPromise(item);
    };

    const getData = async () => {
      return Promise.all(dates.map(item => anAsyncFunction(item)));
    };

    getData().then(data => {
      console.log("DATA ", data);
    });
  }, [dates]);

  return (
    <div className="volume">
      <Chart
        chartData={chartData}
        titleText="Total Volume (completed swaps) - For All Time"
      />
    </div>
  );
};
