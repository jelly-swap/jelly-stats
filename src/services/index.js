import BigNumber from 'bignumber.js';

export const getTotalAmountForToken = providers => {
  const balances = getBalances(providers);

  const totalLiquidityForEachToken = {
    BTC: [],
    ETH: [],
    DAI: [],
    AE: [],
    WBTC: []
  };

  balances.forEach(lpInfo => {
    Object.keys(lpInfo).forEach(network => {
      totalLiquidityForEachToken[network].push(lpInfo[network]);
    });
  });

  return totalLiquidityForEachToken;
};

export const getUSDTPriceForEachNetowrk = providers => {
  const prices = getPrices(providers);

  const pricesForEachToken = {
    'USDT-USDT': [],
    'BTC-USDT': [],
    'ETH-USDT': [],
    'DAI-USDT': [],
    'AE-USDT': [],
    'WBTC-USDT': []
  };

  prices.forEach(price => {
    Object.keys(price).forEach(network => {
      pricesForEachToken.hasOwnProperty(network) &&
        pricesForEachToken[network].push(BigNumber(price[network]).toString());
    });
  });

  const highestUSDTPricesAsArray = getHighestUSDTForEachNetwork(pricesForEachToken);

  const highestUSDTPricesAsObj = populateObject(highestUSDTPricesAsArray);

  return highestUSDTPricesAsObj;
};

const getBalances = providers => Object.keys(providers).map(provider => providers[provider].balances);

const getPrices = providers => Object.keys(providers).map(provider => providers[provider].prices);

const getHighestUSDTForEachNetwork = pricesForEachNetwork =>
  Object.keys(pricesForEachNetwork).map(network => ({
    [network]: pricesForEachNetwork[network].sort((a, b) => BigNumber(b) - BigNumber(a))[0]
  }));

const populateObject = array => {
  const result = {};

  array.forEach(entity => Object.entries(entity).forEach(([key, value]) => (result[key] = value)));

  return result;
};
