import { LOAD_ETH_WITHDRAWS, LOAD_AE_WITHDRAWS, LOAD_VOLUME } from "./types";

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
    case LOAD_VOLUME: {
      const { volume } = action.payload;

      return {
        ...state,
        volume: volume
      };
    }

    default:
      return null;
  }
};
