import BigNumber from 'bignumber.js';

export const getTotalAmountForToken = providers => {
  const balances = getBalances(providers);

  const totalLiquidityForEachToken = {
    BTC: 0,
    ETH: 0,
    DAI: 0,
    AE: 0,
    WBTC: 0
  };

  balances.forEach(lpInfo => {
    Object.keys(lpInfo).forEach(network => {
      totalLiquidityForEachToken[network] = BigNumber(totalLiquidityForEachToken[network])
        .plus(BigNumber(lpInfo[network].balance))
        .toString();
    });
  });

  return totalLiquidityForEachToken;
};

const getBalances = providers => {
  return Object.keys(providers).map(provider => providers[provider].balances);
};
