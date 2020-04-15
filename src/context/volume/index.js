import React, { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from 'react';

import { safeAccess } from '../../utils';

import { getVolume } from './actions';

const UPDATE = 'UPDATE';

const VolumeContext = createContext();

function useVolumeContext() {
  return useContext(VolumeContext);
}

function reducer(state, { type, payload }) {
  switch (type) {
    case UPDATE: {
      let volume = payload;

      return {
        ...state,
        volume,
      };
    }
    default: {
      throw Error(`Unexpected action type in VolumeContext reducer: '${type}'.`);
    }
  }
}

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, {});

  const update = useCallback((volume) => {
    dispatch({ type: UPDATE, payload: volume });
  }, []);

  useEffect(() => {
    function get() {
      getVolume().then((volume) => {
        update(volume);
      });
    }

    get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VolumeContext.Provider
      value={useMemo(() => {
        return {
          state,
          update,
        };
      }, [state, update])}
    >
      {children}
    </VolumeContext.Provider>
  );
}

export function useVolume() {
  const { state } = useVolumeContext();
  return safeAccess(state, ['volume']);
}
