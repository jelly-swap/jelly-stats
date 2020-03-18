import React, { useReducer, useEffect } from "react";
import reducer from "./reducer";
import {
  loadEthWithdraws,
  loadAeWithdraws,
  loadEthVolume,
  loadAeVolume
} from "./actions";
import VolumeContext from "./context";

const VolumeState = props => {
  const initialState = {
    ethWithdraws: [],
    aeWithdraws: [],
    ethVolume: [],
    aeVolume: []
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const onLoadEthWthdraws = async () => dispatch(await loadEthWithdraws());
  const onLoadAeWthdraws = async () => dispatch(await loadAeWithdraws());

  const onLoadEthVolume = async withdraws =>
    dispatch(await loadEthVolume(withdraws));

  const onLoadAeVolume = async withdraws =>
    dispatch(await loadAeVolume(withdraws));

  useEffect(() => {
    onLoadAeWthdraws();
  }, []);

  useEffect(() => {
    onLoadEthWthdraws();
  }, []);

  useEffect(() => {
    onLoadEthVolume(state.ethWithdraws);
  }, [state.ethWithdraws]);

  useEffect(() => {
    onLoadAeVolume(state.aeWithdraws);
  }, [state.aeWithdraws]);

  return (
    <VolumeContext.Provider
      value={{
        ethWithdraws: state.ethWithdraws,
        ethVolume: state.ethVolume,
        aeVolume: state.aeVolume,

        // actions
        onLoadAeVolume,
        onLoadEthVolume,
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
