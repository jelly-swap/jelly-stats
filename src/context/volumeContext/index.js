import React, { useReducer, useEffect } from "react";
import reducer from "./reducer";
import { loadData } from "./actions";
// import { useInterval } from "../../utils";
import VolumeContext from "./context";

const VolumeState = props => {
  const initialState = {
    withdraws: []
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const onLoadData = async () => dispatch(await loadData());

  useEffect(() => {
    onLoadData();
  }, []);

  // useInterval(async () => {
  //   dispatch(await loadData());
  // }, 10000);

  return (
    <VolumeContext.Provider
      value={{
        withdraws: state.withdraws,

        // actions
        onLoadData
      }}
    >
      {props.children}
    </VolumeContext.Provider>
  );
};

export default VolumeState;
