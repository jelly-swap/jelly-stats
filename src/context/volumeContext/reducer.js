import { LOAD_DATA } from "./types";

export default (state, action) => {
  switch (action.type) {
    case LOAD_DATA: {
      const { withdraws } = action.payload;
      return {
        ...state,

        withdraws: withdraws
      };
    }

    default:
      return null;
  }
};
