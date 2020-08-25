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
  CAPT: {
    name: 'CAPT',
    decimals: 18,
    explorer: 'https://etherscan.io/tx/',
  },
  WBTC: {
    name: 'WBTC',
    decimals: 8,
    explorer: 'https://etherscan.io/tx/',
  },
  'BTC++': {
    name: 'BTC++',
    decimals: 18,
    explorer: 'https://etherscan.io/tx/',
  },
  USDC: {
    name: 'USDC',
    decimals: 6,
    explorer: 'https://etherscan.io/tx/',
  },
  ONE: {
    name: 'ONE',
    decimals: 18,
    explorer: 'https://explorer.harmony.one/#/tx/',
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

export const STATUS = {
  0: 'INVALID', // Uninitialized  swap -> can go to ACTIVE
  1: 'ACTIVE', // Active swap -> can go to WITHDRAWN or EXPIRED
  2: 'REFUNDED', // Swap is refunded -> final state.
  3: 'COMPLETED', // Swap is withdrawn -> final state.
  4: 'EXPIRED', // Swap is expired -> can go to REFUNDED
};

export const STATUS_TO_NAME = {
  2: 'Refund Tx',
  3: 'Withdraw Tx',
};
