import BigNumber from 'bignumber.js';
import { formatUSDTAmount } from './formatAmounts';

export const calculateTotalAmountUSDTForAllTokens = (prices, totalAmountForEachToken) => {
  const totalUSDTForEachToken = {
    AE: 0,
    BTC: 0,
    ETH: 0,
    DAI: 0,
    WBTC: 0
  };

  for (const key in totalUSDTForEachToken) {
    const result = BigNumber(totalAmountForEachToken[key]).multipliedBy(BigNumber(prices[key + '-USDT']));
    totalUSDTForEachToken[key] = result.toString();
  }

  const totalAmount = Object.values(totalUSDTForEachToken).reduce((acc, next) => {
    return BigNumber(acc)
      .plus(BigNumber(next))
      .toString();
  });

  return { totalAmount: formatUSDTAmount(totalAmount), totalUSDTForEachToken };
};
