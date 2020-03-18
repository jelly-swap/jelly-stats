import React, { useContext } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import VolumeContext from "../../context/volumeContext/context";
import Chart from "../../utils/lineChart";

import "./style.scss";

export default () => {
  const volumeContext = useContext(VolumeContext);
  const { volume } = volumeContext;

  const chartData = {
    datasets: [
      {
        label: "Volume",
        data: volume,
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
      {volume.length > 0 ? (
        <Chart
          chartData={chartData}
          titleText="Total Volume (completed swaps) - For All Time"
        />
      ) : (
        <Loader
          className={"loader"}
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
        />
      )}
    </div>
  );
};
