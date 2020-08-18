import React, { useState, useEffect } from 'react';
import Select from 'react-select';

import { useProviders } from '../../context/providers';
import { useLiquidity } from '../../context/liquidity';

import { ASSETS } from '../../config';

import Chart, { getDataset } from '../../utils/pieChart';

import { selectorStyles, safeAccess, truncateAddress } from '../../utils';
import { toFixed } from '../../utils/math';

import './styles.scss';

const labels = ASSETS.map((e) => ({ label: e }));

export default ({ deviceType }) => {
  const providers = useProviders();
  const liquidity = useLiquidity();
  const [chartData, setChartData] = useState({});

  const [selectedToken, setSelectedToken] = useState('BTC');

  const onTokenSelected = (event) => {
    setSelectedToken(event.label);
  };

  const getLiquidity = (asset) => {
    const l = liquidity && liquidity[asset];

    if (l) {
      return toFixed(l);
    }

    return 0;
  };

  useEffect(() => {
    if (providers) {
      const info = getInfoForAsset(providers, selectedToken);

      setChartData({
        labels: info.labels,
        datasets: getDataset('Providers', info.data),
      });
    }
  }, [providers, selectedToken]);

  const tooltips = {
    enabled: true,
    callbacks: {
      label: (tooltipItem, data) => {
        const { index } = tooltipItem;
        const address = data.labels[index];
        const amount = data.datasets[0].data[index];
        return `${address}        ${amount} ${selectedToken}`;
      },
    },
  };
  return (
    <div className='providers slide-in-bottom'>
      <div className='selector-wrapper'>
        <span className='total'>{`Total: ${getLiquidity(selectedToken)} ${selectedToken}`}</span>
        <Select
          options={labels}
          styles={selectorStyles()}
          onChange={onTokenSelected}
          placeholder={selectedToken}
          value={selectedToken}
          isSearchable={false}
        />
      </div>
      <Chart
        chartData={chartData}
        tooltips={tooltips}
        titleText='Liquidity Providers By Asset'
        deviceType={deviceType}
      />
    </div>
  );
};

const getInfoForAsset = (info, asset) => {
  const labels = [];
  const data = [];
  Object.values(info).forEach((provider) => {
    const p = safeAccess(provider, ['balances', asset]);
    if (p) {
      const label = `${truncateAddress(p.address, 8)}`;
      labels.push(label);
      data.push(toFixed(p.balance));
    }
  });

  return { labels, data };
};
