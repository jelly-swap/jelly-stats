import React from 'react';
import { toFixed } from '../../utils/math';

export default ({ network, price }) => {
  return price ? (
    <div className='card'>
      <span className='network'>{network}</span>
      <span className='price'>${toFixed(price, 4)}</span>
    </div>
  ) : null;
};
