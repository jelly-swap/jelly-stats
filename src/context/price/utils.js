import { div } from '../../utils/math';

export const FIX_PRICE = {
  AE: {
    first: 'BTC-USDT',
    second: 'BTC-AE'
  }
};

export const calculatePriceBasedOn = (prices, first, second) => {
  const fp = prices[first];
  const sp = prices[second];

  if (fp && sp) {
    return div(prices[first], prices[second]);
  }

  return 0;
};
