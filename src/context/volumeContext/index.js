import React, { useReducer, useEffect } from "react";
import reducer from "./reducer";
import { loadEthWithdraws, loadAeWithdraws, loadVolume } from "./actions";
import VolumeContext from "./context";

const VolumeState = props => {
  const initialState = {
    ethWithdraws: [],
    aeWithdraws: [],
    volume: []
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const onLoadEthWthdraws = async () => dispatch(await loadEthWithdraws());
  const onLoadAeWthdraws = async () => dispatch(await loadAeWithdraws());

  const onLoadVolume = async ethWithdraws =>
    dispatch(await loadVolume(ethWithdraws));

  useEffect(() => {
    onLoadEthWthdraws();
    onLoadAeWthdraws();
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
        onLoadEthWthdraws,
        onLoadAeWthdraws,
        dispatch
      }}
    >
      {props.children}
    </VolumeContext.Provider>
  );
};

export default VolumeState;
