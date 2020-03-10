export const safeAccess = (object, path) => {
  return object
    ? path.reduce(
        (accumulator, currentValue) =>
          accumulator && accumulator[currentValue]
            ? accumulator[currentValue]
            : null,
        object
      )
    : null;
};

export const formatDisplayAddr = addr => {
  addr = addr.toString();
  return addr.substring(0, 6) + "..." + addr.substring(addr.length - 6);
};

export const formatDisplayNum = balance => {
  return parseFloat(balance).toFixed(3);
};

export const openLink = url => event => {
  event.preventDefault();
  const win = window.open(url, "_blank");
  win.focus();
};

export const aggregateBalances = (providerInfo, token) => {
  let res = 0;
  providerInfo.forEach(providerInfo => {
    const balances = safeAccess(providerInfo, ["balances"]);
    const chosenTokenRates = safeAccess(balances, [token]);

    res += parseFloat(chosenTokenRates.balanceShort);
  });
  return res;
};

export const aggregateProviders = providerInfo => {
  let resArr = [];

  providerInfo.forEach(providerInfo => {
    const balances = safeAccess(providerInfo, ["balances"]);
    const entries = Object.entries(balances);

    let resObject = {};

    entries.forEach(e => {
      const network = e[0];
      const balancePerNetwork = e[1];
      resObject[network] = balancePerNetwork;
    });

    resArr.push(resObject);
  });

  return resArr;
};

export const getAddressesPerToken = (aggregateProviders, token) => {
  let addressesWithBalance = {};

  aggregateProviders.forEach(provider => {
    const { address, balanceShort } = safeAccess(provider, [token]);
    addressesWithBalance[formatDisplayAddr(address)] = formatDisplayNum(
      balanceShort
    );
  });
  return addressesWithBalance;
};
