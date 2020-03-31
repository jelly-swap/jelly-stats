import BigNumber from 'bignumber.js';

export const getDataForEachNetwork = providers => {
  const data = {
    BTC: [],
    ETH: [],
    DAI: [],
    AE: [],
    WBTC: []
  };

  const totalAmountForEachToken = {
    BTC: 0,
    AE: 0,
    DAI: 0,
    WBTC: 0,
    ETH: 0
  };

  const balances = getBalances(providers);

  balances.forEach(lpInfo => {
    Object.keys(lpInfo).forEach(network => {
      data[network].push(lpInfo[network]);
      totalAmountForEachToken[network] = BigNumber(totalAmountForEachToken[network]).plus(
        BigNumber(lpInfo[network].balance)
      );
    });
  });

  return { data, totalAmountForEachToken };
};

export const getUSDTPriceForEachNetowrk = providers => {
  const pricesForEachToken = {
    'USDT-USDT': [],
    'BTC-USDT': [],
    'ETH-USDT': [],
    'DAI-USDT': [],
    'AE-USDT': [],
    'WBTC-USDT': []
  };

  const prices = getPrices(providers);

  prices.forEach(price => {
    Object.keys(price).forEach(network => {
      pricesForEachToken.hasOwnProperty(network) &&
        pricesForEachToken[network].push(BigNumber(price[network]).toString());
    });
  });

  const highestUSDTPricesAsArray = getHighestUSDTForEachNetwork(pricesForEachToken);

  const highestUSDTPricesAsObj = populateObjectFromArray(highestUSDTPricesAsArray);

  return highestUSDTPricesAsObj;
};

const getBalances = providers => Object.keys(providers).map(provider => providers[provider].balances);

const getPrices = providers => Object.keys(providers).map(provider => providers[provider].prices);

const getHighestUSDTForEachNetwork = pricesForEachNetwork =>
  Object.keys(pricesForEachNetwork).map(network => ({
    [network]: pricesForEachNetwork[network].sort((a, b) => BigNumber(b) - BigNumber(a))[0]
  }));

const populateObjectFromArray = array => {
  const result = {};

  array.forEach(entity => Object.entries(entity).forEach(([key, value]) => (result[key] = value)));

  return result;
};
