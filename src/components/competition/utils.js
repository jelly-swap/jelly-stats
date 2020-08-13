import Big from 'big.js';

import { DECIMALS } from '../../config';

export function calCompetitionResults(allSwaps, prices) {
  const swaps = [];
  const result = [];

  allSwaps.forEach((s) => {
    if (s.expiration > 1596625200 && s.network !== 'AE') {
      swaps.push(s);
    }
  });

  let counter = 0;
  const volume = {};
  swaps.forEach((s) => {
    if (s.network === 'BTC') {
      if (s.outputAddress.toLowerCase() === '0x3e13eb969c69270c0d048c8ab8889b56f73808d4') {
        counter++;
      }
      if (volume[s.outputAddress.toLowerCase()]) {
        if (volume[s.outputAddress.toLowerCase()]) {
          volume[s.outputAddress.toLowerCase()] = new Big(s.outputAmount)
            .div(Math.pow(10, DECIMALS[s.outputNetwork]))
            .mul(prices[s.outputNetwork])
            .add(volume[s.outputAddress.toLowerCase()]);
        }
      } else {
        volume[s.outputAddress.toLowerCase()] = 0.1;
        volume[s.outputAddress.toLowerCase()] = new Big(s.outputAmount)
          .div(Math.pow(10, DECIMALS[s.outputNetwork]))
          .mul(prices[s.outputNetwork]);
      }
    }
    if (s.network !== 'BTC') {
      if (s.sender.toLowerCase() === '0x3e13eb969c69270c0d048c8ab8889b56f73808d4') {
        counter++;
      }
      if (volume[s.sender.toLowerCase()]) {
        if (volume[s.sender.toLowerCase()]) {
          volume[s.sender.toLowerCase()] = new Big(s.inputAmount)
            .div(Math.pow(10, DECIMALS[s.network]))
            .mul([prices[s.network]])
            .add(volume[s.sender.toLowerCase()]);
        }
      } else {
        volume[s.sender.toLowerCase()] = 0.1;
        volume[s.sender.toLowerCase()] = new Big(s.inputAmount)
          .div(Math.pow(10, DECIMALS[s.network]))
          .mul(prices[s.network]);
      }
    }
  });

  Object.keys(volume).forEach((v) => {
    const address = v.toString();
    const addressVolume = Number(volume[v]);
    result.push({ address, addressVolume });
  });

  return result;
}
