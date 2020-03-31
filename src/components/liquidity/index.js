import React, { useState, useEffect, useCallback } from 'react';

import Chart, { getDataset } from '../../utils/pieChart';

import { useAllPrices } from '../../context/price';
import { useLiquidity } from '../../context/liquidity';

import { ASSETS } from '../../config';

import { toFixed } from '../../utils/math';

import './style.scss';

export default () => {
  const prices = useAllPrices();
  const liquidity = useLiquidity();

  const [liquidityInUsd, setLiquidityInUsd] = useState({});
  const [totalLiquidity, setTotalLiquidity] = useState(0);

  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const _liquidityInUsd = {};
    let _totalLiquidity = 0;
    ASSETS.forEach(n => {
      if (prices && liquidity) {
        const p = prices[n];
        const l = liquidity[n] || 0;

        _liquidityInUsd[n] = l * p;
        _totalLiquidity += _liquidityInUsd[n] || 0;
      }
    });

    setLiquidityInUsd(_liquidityInUsd);
    setTotalLiquidity(_totalLiquidity);
  }, [prices, liquidity]);

  const getLabels = useCallback(() => {
    const result = [];

    ASSETS.forEach(n => {
      const p = prices[n];
      const l = liquidity[n] || 0;

      if (p) {
        const inUsd = liquidityInUsd[n];
        const label = `${n} - ${toFixed(l)} ($${toFixed(inUsd)})`;
        result.push(label);
      }
    });

    return result;
  }, [prices, liquidity, liquidityInUsd]);

  useEffect(() => {
    if (liquidity && prices) {
      setChartData({
        labels: getLabels(),
        datasets: getDataset('Liquidity', Object.values(liquidityInUsd))
      });
    }
  }, [liquidity, prices, getLabels, liquidityInUsd]);

  const tooltips = {
    enabled: true,
    callbacks: {
      label: (tooltipItem, data) => {
        const { index } = tooltipItem;
        const label = data.labels[index];

        return label;
      }
    }
  };

  return prices ? (
    <div className='liquidity slide-in-bottom'>
      <span className='total'>Total Liquidity: ${toFixed(totalLiquidity)}</span>
      <Chart chartData={chartData} titleText='Liquidity value (in USD)' tooltips={tooltips} />
    </div>
  ) : null;
};
