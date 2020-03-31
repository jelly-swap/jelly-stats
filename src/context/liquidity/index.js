import React, { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from 'react';

import { safeAccess } from '../../utils';

import { getLiquidity } from './actions';

const UPDATE = 'UPDATE';

const LiquidityContext = createContext();

function useLiquidityContext() {
  return useContext(LiquidityContext);
}

function reducer(state, { type, payload }) {
  switch (type) {
    case UPDATE: {
      const liquidity = payload;

      return {
        ...state,
        liquidity
      };
    }
    default: {
      throw Error(`Unexpected action type in LiquidityContext reducer: '${type}'.`);
    }
  }
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, {});

  const update = useCallback(liquidity => {
    dispatch({ type: UPDATE, payload: liquidity });
  }, []);

  return (
    <LiquidityContext.Provider
      value={useMemo(() => {
        return {
          state,
          update
        };
      }, [state, update])}
    >
      {children}
    </LiquidityContext.Provider>
  );
}

export function Updater() {
  const { update } = useLiquidityContext();

  useEffect(() => {
    let stale = false;

    function get() {
      if (!stale) {
        getLiquidity().then(liquidity => {
          update(liquidity);
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

export function useLiquidity() {
  const { state } = useLiquidityContext();
  return safeAccess(state, ['liquidity']);
}
