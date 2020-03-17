import { LOAD_DATA } from "./types";

export default (state, action) => {
  switch (action.type) {
    case LOAD_DATA: {
      const { dates } = action.payload;
      return {
        ...state,

        dates: dates
      };
    }

    default:
      return null;
  }
};
