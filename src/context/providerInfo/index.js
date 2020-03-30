import React, { useReducer, useEffect } from 'react';
import reducer from './reducer';
import { fetchProvidersInfo, aggregateTokens, aggregateUSDTPrices } from './actions';
import { useInterval } from '../../utils';
import ProvidersInfoContext from './context';

const ProvidersInfoState = props => {
  const initialState = {
    providersInfo: null,
    tokens: {
      AE: 0,
      BTC: 0,
      DAI: 0,
      ETH: 0,
      WBTC: 0
    },
    usdtPrices: {
      'AE-USDT': 0,
      'BTC-USDT': 0,
      'DAI-USDT': 0,
      'ETH-USDT': 0,
      'WBTC-USDT': 0,
      'USDT-USDT': 0
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const onFetchProvidersInfo = async () => dispatch(await fetchProvidersInfo());

  useEffect(() => {
    onFetchProvidersInfo();
  }, []);

  useEffect(() => {
    if (state.providersInfo) {
      dispatch(aggregateTokens(state.providersInfo));
      dispatch(aggregateUSDTPrices(state.providersInfo));
    }
  }, [state.providersInfo]);

  useInterval(async () => {
    dispatch(await fetchProvidersInfo());
  }, 10000);

  return (
    <ProvidersInfoContext.Provider
      value={{
        providerInfo: state.providersInfo,
        tokens: state.tokens,
        usdtPrices: state.usdtPrices,
        // actions
        onFetchProvidersInfo
      }}
    >
      {props.children}
    </ProvidersInfoContext.Provider>
  );
};

export default ProvidersInfoState;
