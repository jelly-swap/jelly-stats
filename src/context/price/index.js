import React, { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from 'react';

import { safeAccess } from '../../utils';
import { ASSETS } from '../../config';

import { getPrices } from './actions';

const UPDATE = 'UPDATE';

const PriceContext = createContext();

function usePriceContext() {
  return useContext(PriceContext);
}

function reducer(state, { type, payload }) {
  switch (type) {
    case UPDATE: {
      const prices = payload;

      const result = {};

      ASSETS.forEach(n => {
        const price = prices[`${n}-USDT`];

        if (price) {
          result[n] = price;
        }
      });

      return {
        ...state,
        prices: result
      };
    }
    default: {
      throw Error(`Unexpected action type in PriceContext reducer: '${type}'.`);
    }
  }
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, {});

  const update = useCallback(prices => {
    dispatch({ type: UPDATE, payload: prices });
  }, []);

  return (
    <PriceContext.Provider
      value={useMemo(() => {
        return {
          state,
          update
        };
      }, [state, update])}
    >
      {children}
    </PriceContext.Provider>
  );
}

export function Updater() {
  const { update } = usePriceContext();

  useEffect(() => {
    let stale = false;

    function get() {
      if (!stale) {
        getPrices().then(prices => {
          update(prices);
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

export function useAllPrices() {
  const { state } = usePriceContext();
  return safeAccess(state, ['prices']);
}
