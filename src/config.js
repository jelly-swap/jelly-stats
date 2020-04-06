import BigNumber from 'bignumber.js';

const assets = {
  BTC: {
    name: 'BTC',
    decimals: 8,
    explorer: 'https://blockstream.info/tx/',
  },

  ETH: {
    name: 'ETH',
    decimals: 18,
    explorer: 'https://etherscan.io/tx/',
  },
  DAI: {
    name: 'DAI',
    decimals: 18,
    explorer: 'https://etherscan.io/tx/',
  },
  AE: {
    name: 'AE',
    decimals: 18,
    explorer: 'https://explorer.aepps.com/transactions/',
    timestampMs: true, // if timestamp is in milliseconds
  },
  WBTC: {
    name: 'WBTC',
    decimals: 8,
    explorer: 'https://etherscan.io/tx/',
  },
  USDC: {
    name: 'USDC',
    decimals: 6,
    explorer: 'https://etherscan.io/tx/',
  },
};

const assetsArray = Object.values(assets);

export const ASSETS = assetsArray.reduce((arr, item) => {
  arr.push(item.name);
  return arr;
}, []);

export const PARSE_AMOUNT = assetsArray.reduce((obj, item) => {
  return {
    ...obj,
    [item.name]: (inputAmount) => {
      return BigNumber(inputAmount).div(Math.pow(10, item.decimals)).toFixed(6);
    },
  };
}, {});

export const EXPLORERS = assetsArray.reduce((obj, item) => {
  return {
    ...obj,
    [item.name]: item.explorer,
  };
}, {});

export const TIMESTAMP_FORMAT = assetsArray.reduce((obj, item) => {
  return {
    ...obj,
    [item.name]: item.timestampMs,
  };
}, {});

export const BASE_URL = 'https://network.jelly.market/api/v1';
