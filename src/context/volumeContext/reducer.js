import {
  LOAD_ETH_WITHDRAWS,
  LOAD_AE_WITHDRAWS,
  LOAD_ETH_VOLUME,
  LOAD_AE_VOLUME
} from "./types";

export default (state, action) => {
  console.log("ACTION ", action);

  switch (action.type) {
    case LOAD_ETH_WITHDRAWS: {
      const { ethWithdraws } = action.payload;
      return {
        ...state,

        ethWithdraws: ethWithdraws
      };
    }
    case LOAD_AE_WITHDRAWS: {
      const { aeWithdraws } = action.payload;
      return {
        ...state,

        aeWithdraws: aeWithdraws
      };
    }
    case LOAD_ETH_VOLUME: {
      const { ethVolume } = action.payload;

      return {
        ...state,
        ethVolume: ethVolume
      };
    }

    case LOAD_AE_VOLUME: {
      const { aeVolume } = action.payload;

      return {
        ...state,
        aeVolume: aeVolume
      };
    }

    default:
      return null;
  }
};
