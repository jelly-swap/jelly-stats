import React, { useReducer, useEffect } from "react";
import reducer from "./reducer";
import { loadethWithdraws, loadVolume } from "./actions";
import VolumeContext from "./context";

const VolumeState = props => {
  const initialState = {
    ethWithdraws: [],
    volume: []
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const onLoadWthdraws = async () => dispatch(await loadethWithdraws());
  const onLoadVolume = async ethWithdraws =>
    dispatch(await loadVolume(ethWithdraws));

  useEffect(() => {
    onLoadWthdraws();
  }, []);

  useEffect(() => {
    onLoadVolume(state.ethWithdraws);
  }, [state.ethWithdraws]);

  return (
    <VolumeContext.Provider
      value={{
        ethWithdraws: state.ethWithdraws,
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
