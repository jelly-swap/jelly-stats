import React, { useContext, useState, useEffect } from 'react';
import BigNumber from 'bignumber.js';
import { selectorStyles } from '../../utils';
import { formatAddress, formatTokenAmount } from '../../utils/formatAmounts';
import Chart from '../../utils/pieChart';
import Select from 'react-select';

import ProviderInfoContext from '../../context/providerInfo/context';

import './styles.scss';

export default () => {
  const [availableTokens, setAvailableTokens] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [selectedToken, setSelectedToken] = useState('BTC');
  const [tokenUsdtPrice, setTokenUsdtPrice] = useState('');
  const [totalTokensFromSelected, setTotalTokensFromSelected] = useState('');

  const providerInfoContext = useContext(ProviderInfoContext);

  const { tokens, usdtPrices } = providerInfoContext;

  useEffect(() => {
    setAvailableTokens(Object.keys(tokens).map(e => ({ label: e })));
  }, [tokens]);

  useEffect(() => {
    setTokenUsdtPrice(BigNumber(usdtPrices[selectedToken + '-USDT']) * BigNumber(totalTokensFromSelected).toString());
  }, [totalTokensFromSelected, usdtPrices, selectedToken]);

  useEffect(() => {
    if (!tokens) {
      return;
    }

    setTotalTokensFromSelected(getTotalAmountForSelectedToken(tokens[selectedToken]));

    setChartData({
      labels:
        tokens[selectedToken] &&
        tokens[selectedToken].map(
          e => formatAddress(e.address) + ' - ' + formatTokenAmount(e.balance) + ' ' + selectedToken
        ),
      datasets: [
        {
          label: 'Liquidity',
          data: tokens[selectedToken] && tokens[selectedToken].map(e => e.balance),
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
  }, [tokens, selectedToken]);

  const tooltips = {
    enabled: true,
    callbacks: {
      label: (tooltipItem, data) => {
        const { index } = tooltipItem;

        const amount = data.datasets[0].data[index];
        return `${amount} ${selectedToken}`;
      }
    }
  };

  const onTokenSelected = event => {
    setSelectedToken(event.label);
  };

  return (
    availableTokens && (
      <div className='providers slide-in-bottom'>
        <div className='selector-wrapper'>
          <span className='total total-amount'>
            {`Total: ${totalTokensFromSelected} ${selectedToken} - (${tokenUsdtPrice &&
              parseFloat(tokenUsdtPrice).toFixed(2)}$)`}
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

const getTotalAmountForSelectedToken = selectedToken => {
  if (!selectedToken) {
    return;
  }

  const balances = selectedToken.map(e => e.balance);

  if (!balances.length) {
    return 0;
  }

  return parseFloat(
    balances.reduce((acc, next) =>
      BigNumber(acc)
        .plus(BigNumber(next))
        .toString()
    )
  ).toFixed(4);
};
