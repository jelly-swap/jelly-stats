import React, { useContext } from 'react';
import ProviderInfoContext from '../../context/providerInfo/context';
import { safeAccess } from '../../utils';

import Error from '../error';
import Card from './Card';

import './style.scss';

export default () => {
  const providerInfoContext = useContext(ProviderInfoContext);
  const { providerInfo } = providerInfoContext;
  const prices = safeAccess(providerInfo, ['prices']);
  let pricesEntries = [];

  if (prices) {
    pricesEntries = Object.entries(prices);
  }

  return providerInfo && providerInfo[0] ? (
    <div className='dashboard slide-in-bottom'>
      <div className='card-container'>
        {pricesEntries.map((e, i) => {
          const network = e[0];
          const pricesPerNetwork = e[1];
          const priceToUSD = safeAccess(pricesPerNetwork, ['USDT']);
          return <Card key={i} priceToUSD={priceToUSD} network={network} />;
        })}
      </div>
    </div>
  ) : (
    <Error msg={'Cannot fetch data.'} />
  );
};
