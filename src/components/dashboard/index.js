import React from 'react';

import Card from './Card';

import './style.scss';
import { useAllPrices } from '../../context/price';

export default () => {
  const allPrices = useAllPrices();

  return allPrices ? (
    <div className='dashboard slide-in-bottom'>
      <div className='card-container'>
        {Object.keys(allPrices).map(n => {
          return <Card key={n} price={allPrices[n] || 0} network={n} />;
        })}
      </div>
    </div>
  ) : null;
};
