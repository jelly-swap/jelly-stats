import BigNumber from 'bignumber.js';

const ethereumExplorer = 'https://etherscan.io/tx/';

export default {
  BTC: 'https://blockstream.info/tx/',
  ETH: ethereumExplorer,
  AE: 'https://explorer.aepps.com/transactions/',
  TRX: '',
  DAI: ethereumExplorer,
  WBTC: ethereumExplorer,
  USDC: ethereumExplorer,
};

export const convertInputAmount = {
  ETH: (inputAmount) => {
    return BigNumber(inputAmount).div(Math.pow(10, 18)).toString();
  },
  BTC: (inputAmount) => {
    return BigNumber(inputAmount).div(Math.pow(10, 8)).toString();
  },
  AE: (inputAmount) => {
    return BigNumber(inputAmount).div(Math.pow(10, 18)).toString();
  },
  TRX: (inputAmount) => {
    return BigNumber(inputAmount).div(Math.pow(10, 8)).toString();
  },
  DAI: (inputAmount) => {
    return BigNumber(inputAmount).div(Math.pow(10, 18)).toString();
  },
  WBTC: (inputAmount) => {
    return BigNumber(inputAmount).div(Math.pow(10, 8)).toString();
  },
  USDC: (inputAmount) => {
    return BigNumber(inputAmount).div(Math.pow(10, 6)).toString();
  },
};
