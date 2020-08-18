import { useState, useEffect } from 'react';
import { DEVICE_TYPES } from '../constants';

export const useWindowSize = () => {
  const isClient = typeof window === 'object';

  const getSize = () => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  };

  const [windowSize, setWindowSize] = useState(getSize);
  const [deviceType, setDeviceType] = useState(window.screen.width > 550 ? DEVICE_TYPES.DESKTOP : DEVICE_TYPES.MOBILE);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    const handleResize = () => {
      const sizes = getSize();

      sizes.width > 550 ? setDeviceType(DEVICE_TYPES.DESKTOP) : setDeviceType(DEVICE_TYPES.MOBILE);

      setWindowSize(sizes);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    windowSize,
    deviceType,
  };
};
