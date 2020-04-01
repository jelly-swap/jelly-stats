import BigNumber from 'bignumber.js';

export const toFixed = (amount, decimals = 2) => parseFloat(amount).toFixed(decimals);

export const div = (a, b) => new BigNumber(a).div(new BigNumber(b)).toString();
