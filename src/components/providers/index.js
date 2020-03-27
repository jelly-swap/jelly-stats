import React, { useContext, useState, useEffect } from 'react';
import Select from 'react-select';
import { selectorStyles } from '../../utils';
import Chart from '../../utils/pieChart';

import ProviderInfoContext from '../../context/providerInfo/context';

import './styles.scss';

export default () => {
  const [availableTokens, setAvailableTokens] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [tokenAmount, setTokenAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState('BTC');

  const providerInfoContext = useContext(ProviderInfoContext);

  const { tokens } = providerInfoContext;

  useEffect(() => {
    setAvailableTokens(Object.keys(tokens).map(e => ({ label: e })));
  }, [tokens]);

  useEffect(() => {
    if (!tokens) {
      return;
    }

    const dotIndex = tokens[selectedToken].toString().indexOf('.');

    setTokenAmount(tokens[selectedToken].toString().substring(0, dotIndex + 6));
  }, [selectedToken, tokens]);

  const onTokenSelected = event => {
    setSelectedToken(event.label);
  };

  useEffect(() => {
    setChartData({
      labels: [tokenAmount],
      datasets: [
        {
          label: 'Liquidity',
          data: [tokenAmount],
          backgroundColor: ['rgba(255, 99, 132, 0.6)']
        }
      ]
    });
  }, [tokens, tokenAmount]);

  const tooltips = {
    enabled: true,
    callbacks: {
      label: (tooltipItem, data) => {
        const { index } = tooltipItem;
        const address = data.labels[index];

        const amount = data.datasets[0].data[index];
        return ` ${address} : ${amount} ${selectedToken}`;
      }
    }
  };

  return (
    availableTokens && (
      <div className='providers slide-in-bottom'>
        <div className='selector-wrapper'>
          <span className='total total-amount'>
            Total: {tokenAmount} {selectedToken}
          </span>
          <Select
            options={availableTokens}
            styles={selectorStyles()}
            onChange={onTokenSelected}
            placeholder={selectedToken}
            value={selectedToken}
          />
        </div>
        <Chart chartData={chartData} tooltips={tooltips} titleText='Liquidity providers by token (in token quantity)' />
      </div>
    )
  );
};
