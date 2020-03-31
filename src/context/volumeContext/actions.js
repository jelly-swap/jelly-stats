import * as jellyEth from '@jelly-swap/ethereum';
import * as jellyAeternity from '@jelly-swap/aeternity';

import { LOAD_ETH_WITHDRAWS, LOAD_AE_WITHDRAWS, LOAD_ETH_VOLUME, LOAD_AE_VOLUME } from './types';
import { getEthTransactionDate, getAeTransactionDate, clearTimeFromDate } from '../../utils';

export const loadEthWithdraws = async () => {
  const provider = new jellyEth.Providers.JsonRpcProvider(
    'https://mainnet.infura.io/v3/8fe4fc9626494d238879981936dbf144'
  );

  const config = jellyEth.Config();
  config.contractAddress = '0xf567ea9138fe836555b9002abeea42a9dbf16ac5';

  const ethContract = new jellyEth.Contract(provider, config);

  const swaps = await ethContract.getPastEvents('new', {
    new: { receiver: '0xb2cB83E2E367682B2C0d3AAF04131Dd94C41A1A9' }
  });

  console.log('eth swaps', swaps);

  const ethWithdraws = swaps.filter(s => {
    return s.status === 5;
  });

  try {
    return {
      type: LOAD_ETH_WITHDRAWS,
      payload: { ethWithdraws: ethWithdraws }
    };
  } catch (error) {
    return {
      type: LOAD_ETH_WITHDRAWS,
      payload: { ethWithdraws: null }
    };
  }
};

export const loadAeWithdraws = async () => {
  const config = jellyAeternity.Config();
  config.explorer = 'https://explorer.aeternity.io/transactions/';
  config.apiUrl = 'https://mainnet.aeternal.io/';
  config.wsUrl = 'wss://mainnet.aeternal.io/websocket';
  config.providerUrl = 'https://sdk-mainnet.aepps.com/';
  config.internalUrl = 'https://sdk-mainnet.aepps.com/';
  config.contractAddress = 'ct_2uzC4JohWtXs9Q8mnMCHET24VMiyEK6ZQBxeuNrjtq42Mbh9qH';

  const httpProvider = new jellyAeternity.Providers.HTTP(config);

  const aeternityContract = new jellyAeternity.Contract(httpProvider);

  // Get past blockchain events
  const aeWithdraws = await aeternityContract.getPastEvents('new', {
    new: { receiver: 'ak_2Mgic2LxpXo7U4P9KTYqvF51ShNBCgRqWrVQ6pxwNnhZ78Ub1W' }
  });

  console.log('ae swaps', aeWithdraws);

  try {
    return {
      type: LOAD_AE_WITHDRAWS,
      payload: { aeWithdraws: aeWithdraws.swaps.filter(s => s.status === 5) }
    };
  } catch (error) {
    return {
      type: LOAD_AE_WITHDRAWS,
      payload: { aeWithdraws: null }
    };
  }
};

export const loadEthVolume = async withdraws => {
  const amounts = withdraws.map(w => {
    return w.inputAmount;
  });

  const transformethWithdraws = item => {
    return Promise.resolve(getEthTransactionDate(item.transactionHash));
  };

  const funnel = async item => {
    return transformethWithdraws(item);
  };

  const getDates = async () => {
    const dates = await Promise.all(
      withdraws.map(item => {
        const res = funnel(item);
        return res;
      })
    );

    return dates.map((d, i) => {
      return { x: clearTimeFromDate(d), y: amounts[i] / 1000000000000000000 };
    });
  };

  try {
    return {
      type: LOAD_ETH_VOLUME,
      payload: { ethVolume: await getDates() }
    };
  } catch (error) {
    return {
      type: LOAD_ETH_VOLUME,
      payload: { ethVolume: null }
    };
  }
};

export const loadAeVolume = async withdraws => {
  const transformethWithdraws = item => {
    return Promise.resolve(getAeTransactionDate(item.transactionHash));
  };

  const funnel = async item => {
    return transformethWithdraws(item);
  };

  const getDates = async () => {
    const dates = await Promise.all(
      withdraws.map(item => {
        const res = funnel(item);
        return res;
      })
    );

    return dates.map((d, i) => {
      return { x: clearTimeFromDate(d), y: 1 };
    });
  };

  try {
    return {
      type: LOAD_AE_VOLUME,
      payload: { aeVolume: await getDates() }
    };
  } catch (error) {
    return {
      type: LOAD_AE_VOLUME,
      payload: { aeVolume: null }
    };
  }
};
