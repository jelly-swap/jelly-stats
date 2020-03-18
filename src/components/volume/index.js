import React, { useContext, useState, useEffect } from "react";
import Select from "react-select";

import ProviderInfoContext from "../../context/providerInfo/context";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {
  aggregateVolumeDates,
  safeAccess,
  getDayOnly,
  selectorStyles
} from "../../utils";

import VolumeContext from "../../context/volumeContext/context";
import Chart from "../../utils/lineChart";

import "./style.scss";
const VOLUME_AVAILABLE_TOKENS = ["eth", "ae"];

export default () => {
  const providerInfoContext = useContext(ProviderInfoContext);
  const { providerInfo } = providerInfoContext;

  // Prices from Jelly provider
  const prices = safeAccess(providerInfo[0], ["prices"]);
  console.log("PRICES ", prices);
  const volumeContext = useContext(VolumeContext);
  const { volume } = volumeContext;

  const [datesForChart, setDatesForChart] = useState([]);
  const [chosenToken, setChosenToken] = useState("ETH");
  const [selectorOptions, setSelectorOptions] = useState([]);

  const calcTokenAmount = (network, priceInUSDT) => {
    const pricePerOne = safeAccess(prices, ["USDT", network]);
    const amount = priceInUSDT * pricePerOne;
    return amount.toFixed(3);
  };

  useEffect(() => {
    if (volume.length > 0) {
      setDatesForChart(
        aggregateVolumeDates(volume, safeAccess(prices, ["USDT"]))
      );
    }
  }, [volume, prices]);

  useEffect(() => {
    let options = [];
    if (prices) {
      const keys = Object.keys(prices);
      keys.forEach(e => {
        options.push({
          value: e.toLocaleLowerCase(),
          label: e
        });
      });
    }

    setSelectorOptions(
      options.filter(option => {
        return VOLUME_AVAILABLE_TOKENS.includes(option.value);
      })
    );
  }, [prices]);

  const chartData = {
    datasets: [
      {
        label: "Volume",
        data: datesForChart,
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

  const tooltips = {
    enabled: true,
    callbacks: {
      label: (tooltipItem, data) => {
        const { index } = tooltipItem;
        const network = "ETH";
        const amountInUsd = data.datasets[0].data[index].y;

        return `Volume: ${calcTokenAmount(
          network,
          amountInUsd
        )} ${network} (${amountInUsd} $)`;
      },
      title: tooltipItem => {
        const date = tooltipItem[0].xLabel;
        return getDayOnly(date);
      }
    }
  };

  return (
    <div className="volume">
      <Select
        options={selectorOptions}
        styles={selectorStyles()}
        onChange={e => setChosenToken(e.label)}
        placeholder={chosenToken}
        value={chosenToken}
      />
      {datesForChart.length > 0 ? (
        <Chart
          chartData={chartData}
          titleText="Total Volume (in USD) - For All Time"
          tooltips={tooltips}
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
