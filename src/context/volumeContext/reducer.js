import { LOAD_WITHDRAWS, LOAD_VOLUME } from "./types";

export default (state, action) => {
  switch (action.type) {
    case LOAD_WITHDRAWS: {
      const { withdraws } = action.payload;
      return {
        ...state,

        withdraws: withdraws
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
