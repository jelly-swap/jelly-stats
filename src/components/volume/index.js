import React, { useState } from 'react';
import Select from 'react-select';

import { selectorStyles } from '../../utils';
import Chart from '../../utils/lineChart';

import { useVolume } from '../../context/volume/';
import { useAllPrices } from '../../context/price/';

import './style.scss';

export default () => {
  const [selectedToken, setSelectedToken] = useState('BTC');
  const volume = useVolume();

  const prices = useAllPrices();
  let data,
    selectorLabels,
    chartLabels = [];

  if (volume && prices) {
    data = Object.values(volume[selectedToken]);
    data = data.map((el) => el * prices[selectedToken]);
    chartLabels = Object.keys(volume[selectedToken]);
    selectorLabels = Object.keys(volume).map((e) => ({ label: e }));
  }

  const onTokenSelected = (event) => {
    setSelectedToken(event.label);
  };

  return (
    <div className='volume-wrapper slide-in-bottom'>
      <div className='volume-top'>
        <div className='volume-selector'>
          <Select
            options={selectorLabels}
            styles={selectorStyles()}
            onChange={onTokenSelected}
            placeholder={selectedToken}
            value={selectedToken}
          />
        </div>
      </div>
      <Chart chartLabels={chartLabels} charData={data} titleText='Volume' />
    </div>
  );
};
