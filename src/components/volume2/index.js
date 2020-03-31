import React, { useContext, useState, useEffect } from 'react';
import Chart from '../../utils/lineChart';
import VolumeContext from '../../context/volumeContext/context';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './style.scss';

const sortByDate = (...args) => {
  console.log('ARgs', args);
  let allSwaps = [];

  args.forEach(array => {
    allSwaps = [...allSwaps, ...array];
  });

  allSwaps.sort((a, b) => a.expiration - b.expiration);

  allSwaps = allSwaps.map(e => {
    let date = new Date(e.expiration * 1000);
    date.setDate(date.getDate() - 1);

    return { ...e, expiration: date };
  });

  return allSwaps;
};

export default () => {
  const [dates, setDates] = useState(null);
  const [chartData, setChartData] = useState(null);

  const volumeContext = useContext(VolumeContext);
  const { ethWithdraws, aeWithdraws } = volumeContext;

  useEffect(() => {
    // setDates(sortByDate(ethWithdraws, aeWithdraws).map(e => e.expiration));
  }, [ethWithdraws, aeWithdraws]);

  useEffect(() => {
    setChartData({
      datasets: [
        {
          label: 'Volume',
          data: dates,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)'
          ]
        }
      ]
    });
  }, [dates]);

  return (
    <>
      <Chart
        chartData={chartData}
        // titleText={`${chosenToken} Total Volume (in USD) - For All Time`}
        // tooltips={tooltips}
      />
    </>
  );
};
