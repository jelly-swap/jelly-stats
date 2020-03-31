import React, { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from 'react';

import { safeAccess } from '../../utils';

import { getProviders } from './actions';

const UPDATE = 'UPDATE';

const ProviderContext = createContext();

function usePriceContext() {
  return useContext(ProviderContext);
}

function reducer(state, { type, payload }) {
  switch (type) {
    case UPDATE: {
      const providers = payload;

      return {
        ...state,
        providers
      };
    }
    default: {
      throw Error(`Unexpected action type in ProviderContext reducer: '${type}'.`);
    }
  }
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, {});

  const update = useCallback(providers => {
    dispatch({ type: UPDATE, payload: providers });
  }, []);

  return (
    <ProviderContext.Provider
      value={useMemo(() => {
        return {
          state,
          update
        };
      }, [state, update])}
    >
      {children}
    </ProviderContext.Provider>
  );
}

export function Updater() {
  const { update } = usePriceContext();

  useEffect(() => {
    let stale = false;

    function get() {
      if (!stale) {
        getProviders().then(providers => {
          update(providers);
        });
      }
    }

    get();

    const pricePoll = setInterval(() => {
      get();
    }, 15000);

    return () => {
      stale = true;
      clearInterval(pricePoll);
    };
  }, [update]);

  return null;
}

export function useProviders() {
  const { state } = usePriceContext();
  return safeAccess(state, ['providers']);
}
