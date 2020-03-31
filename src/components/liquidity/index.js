import React, { useContext, useState, useEffect } from 'react';
import ProviderInfoContext from '../../context/providerInfo/context';
import Chart from '../../utils/pieChart';
import './style.scss';
import { calculateTotalAmountUSDTForAllTokens } from '../../utils/helpers';
import { formatUSDTAmount } from '../../utils/formatAmounts';

export default () => {
  const providerInfoContext = useContext(ProviderInfoContext);
  const { usdtPrices, totalAmountForEachToken } = providerInfoContext;

  const [totalPriceUSDT, setTotalPriceUSDT] = useState(0);
  const [priceForEachUSDT, setPriceForEachUSDT] = useState(Object.values(usdtPrices));
  const [chartData, setChartData] = useState();

  useEffect(() => {
    if ((usdtPrices, totalAmountForEachToken)) {
      const { totalAmount, totalUSDTForEachToken } = calculateTotalAmountUSDTForAllTokens(
        usdtPrices,
        totalAmountForEachToken
      );

      setTotalPriceUSDT(totalAmount);
      setPriceForEachUSDT(totalUSDTForEachToken);
    }
  }, [usdtPrices, totalAmountForEachToken]);

  useEffect(() => {
    setChartData({
      labels: Object.entries(priceForEachUSDT).map(([k, v]) => k.split('-')[0] + ' - ' + formatUSDTAmount(v) + ' $'),
      datasets: [
        {
          label: 'Liquidity',
          data: Object.values(priceForEachUSDT),
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
  }, [priceForEachUSDT]);

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

  return totalAmountForEachToken ? (
    <div className='liquidity slide-in-bottom'>
      <span className='total'>Total: {totalPriceUSDT} $</span>
      <Chart chartData={chartData} titleText='Liquidity value (in USD)' tooltips={tooltips} />
    </div>
  ) : null;
};
