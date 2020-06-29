import React, { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from 'react';

import { safeAccess } from '../../utils';

import { getRewards } from './actions';

const UPDATE = 'UPDATE';

const HistoryContext = createContext();

function useHistoryContext() {
  return useContext(HistoryContext);
}

function reducer(state, { type, payload }) {
  switch (type) {
    case UPDATE: {
      let reward = payload;

      if (!reward) return;

      return {
        ...state,
        reward,
      };
    }
    default: {
      throw Error(`Unexpected action type in RewardContext reducer: '${type}'.`);
    }
  }
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, {});

  const update = useCallback((swaps) => {
    dispatch({ type: UPDATE, payload: swaps });
  }, []);

  useEffect(() => {
    function get() {
      getRewards().then((rewards) => {
        update(rewards);
      });
    }

    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HistoryContext.Provider
      value={useMemo(() => {
        return {
          state,
          update,
        };
      }, [state, update])}
    >
      {children}
    </HistoryContext.Provider>
  );
}

export function useLp() {
  const { state } = useHistoryContext();
  return safeAccess(state, ['reward']);
}
