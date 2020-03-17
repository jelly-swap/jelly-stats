import React, { useReducer, useEffect } from "react";
import reducer from "./reducer";
import { loadWithdraws, loadVolume } from "./actions";
// import { useInterval } from "../../utils";
import VolumeContext from "./context";

const VolumeState = props => {
  const initialState = {
    withdraws: [],
    volume: {}
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const onLoadWthdraws = async () => dispatch(await loadWithdraws());
  const onLoadVolume = async withdraws => dispatch(await loadVolume(withdraws));

  useEffect(() => {
    onLoadWthdraws();
  }, []);

  useEffect(() => {
    onLoadVolume(state.withdraws);
  }, [state.withdraws]);

  // useInterval(async () => {
  //   dispatch(await loadData());
  // }, 10000);

  return (
    <VolumeContext.Provider
      value={{
        withdraws: state.withdraws,
        volume: state.volume,

        // actions
        onLoadVolume,
        onLoadWthdraws,
        dispatch
      }}
    >
      {props.children}
    </VolumeContext.Provider>
  );
};

export default VolumeState;
