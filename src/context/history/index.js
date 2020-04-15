import React, { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from 'react';

import { safeAccess } from '../../utils';

import { getHistory } from './actions';
import { TIMESTAMP_FORMAT } from '../../config';

const UPDATE = 'UPDATE';

const HistoryContext = createContext();

function useHistoryContext() {
  return useContext(HistoryContext);
}

function reducer(state, { type, payload }) {
  switch (type) {
    case UPDATE: {
      let swaps = payload;

      if (!swaps) return;

      swaps = swaps.map((s) => {
        if (TIMESTAMP_FORMAT[s.network]) {
          s.expiration = s.expiration / 1000;
        }
        return s;
      });

      swaps = swaps.sort((a, b) => {
        return b.expiration - a.expiration;
      });

      return {
        ...state,
        swaps,
      };
    }
    default: {
      throw Error(`Unexpected action type in HistoryContext reducer: '${type}'.`);
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
      getHistory().then((swaps) => {
        update(swaps);
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

export function useSwaps() {
  const { state } = useHistoryContext();
  return safeAccess(state, ['swaps']);
}
