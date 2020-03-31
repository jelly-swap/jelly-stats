export const formatAddress = address =>
  address.substring(0, 4) + '...' + address.substring(address.length - 5, address.length);

export const formatTokenAmount = amount => parseFloat(amount).toFixed(4);

export const formatUSDTAmount = amount => parseFloat(amount).toFixed(2);
