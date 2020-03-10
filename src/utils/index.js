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
