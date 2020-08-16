import moment from 'moment-timezone';

export const safeAccess = (object, path) => {
  return object
    ? path.reduce(
        (accumulator, currentValue) => (accumulator && accumulator[currentValue] ? accumulator[currentValue] : null),
        object
      )
    : null;
};

export const truncateAddress = (addr, num = 6) => {
  return addr.substring(0, num) + '...' + addr.substring(addr.length - num);
};

export const openLink = (url) => (event) => {
  event.preventDefault();
  const win = window.open(url, '_blank');
  win.focus();
};

export const selectorStyles = () => {
  return {
    container: (provided) => ({
      ...provided,
      width: '30%',
      marginRight: '9%',
    }),
  };
};
export function formatDate(time, format = 'Do MMM YYYY h:mm') {
  const timeZone = moment.tz.guess();
  return moment(time * 1000)
    .tz(timeZone)
    .format(format);
}

export const cutTxHash = (txHash) => {
  return txHash.substr(0, 12) + '...';
};
