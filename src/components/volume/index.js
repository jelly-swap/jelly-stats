import React from "react";
import * as jellyEth from "@jelly-swap/ethereum";
import Chart from "../../utils/lineChart";

import "./style.scss";

const provider = new jellyEth.Providers.WalletProvider(
  "e76a85c5d0b785b33ca285b76423833375ca4924381a4e4e7f3e1c93156d2473",
  "https://mainnet.infura.io/v3/8fe4fc9626494d238879981936dbf144"
);

const config = jellyEth.Config();
config.contractAddress = "0xf567ea9138fe836555b9002abeea42a9dbf16ac5";

const ethContract = new jellyEth.Contract(provider, config);

async function test() {
  // Subscribe for contract events and pass handle function
  await ethContract.subscribe(e => {
    console.log(e);
  });

  const withdraws = await ethContract.getPastEvents("withdraw", w => w);
  console.log(withdraws);
}

const chartData = {
  labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
  datasets: [
    {
      label: "Liquidity",
      data: [1232, 213, 3323, 1321, 2000],
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
  test();
  return (
    <div className="volume">
      <Chart
        chartData={chartData}
        titleText="Total Volume (completed swaps) - For All Time"
      />
    </div>
  );
};
