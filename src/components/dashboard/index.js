import React, { useContext, useEffect, useState } from 'react';
import ProviderInfoContext from '../../context/providerInfo/context';

import Card from './Card';

import './style.scss';

export default () => {
  const providerInfoContext = useContext(ProviderInfoContext);
  const { usdtPrices } = providerInfoContext;
  const [prices, setPrices] = useState(null);

  useEffect(() => {
    if (Object.values(usdtPrices).some(x => x.length)) {
      setPrices(usdtPrices);
    }
  }, [usdtPrices]);

  return prices ? (
    <div className='dashboard slide-in-bottom'>
      <div className='card-container'>
        {Object.entries(prices).map(([network, amount]) => {
          return <Card key={network} priceToUSD={amount} network={network.split('-')[0]} />;
        })}
      </div>
    </div>
  ) : null;
};
