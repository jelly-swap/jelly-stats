import Web3 from "web3";
import { useEffect, useRef } from "react";

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://mainnet.infura.io/v3/8fe4fc9626494d238879981936dbf144"
  )
);

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

export const clearTimeFromDate = date => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const newDate = new Date();
  newDate.setTime(0);
  newDate.setFullYear(year);
  newDate.setMonth(month);
  newDate.setDate(day);

  return newDate;
};

export const getEthTransactionDate = async hash => {
  const { blockNumber } = await web3.eth.getTransaction(hash);
  const { timestamp } = await web3.eth.getBlock(blockNumber);

  return new Date(timestamp * 1000);
};

export const useInterval = (callback, delay, params) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current(params);
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay, params]);
};
