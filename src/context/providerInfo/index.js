import React, { useReducer, useEffect } from "react";
import reducer from "./reducer";
import { fetchProviderInfo } from "./actions";
import useInterval from "./useInterval";
import ProviderInfoContext from "./context";

const ProviderInfoState = props => {
  const initialState = {
    providerInfo: []
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const onFetchProviderInfo = async () => dispatch(await fetchProviderInfo());

  useEffect(() => {
    onFetchProviderInfo();
  }, []);

  useInterval(async () => {
    dispatch(await fetchProviderInfo());
  }, 10000);

  return (
    <ProviderInfoContext.Provider
      value={{
        providerInfo: state.providerInfo,

        // actions
        onFetchProviderInfo
      }}
    >
      {props.children}
    </ProviderInfoContext.Provider>
  );
};

export default ProviderInfoState;
