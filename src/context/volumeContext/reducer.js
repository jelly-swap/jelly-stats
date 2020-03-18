import { LOAD_ETH_EITHDRAWS, LOAD_VOLUME } from "./types";

export default (state, action) => {
  switch (action.type) {
    case LOAD_ETH_EITHDRAWS: {
      const { ethWithdraws } = action.payload;
      return {
        ...state,

        ethWithdraws: ethWithdraws
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
