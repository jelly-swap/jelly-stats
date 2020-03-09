import { FETCH_PROVIDER_INFO } from "./types";

export default (state, action) => {
  switch (action.type) {
    case FETCH_PROVIDER_INFO: {
      const { providerInfo } = action.payload;
      return {
        ...state,
        providerInfo: providerInfo
      };
    }

    default:
      return null;
  }
};
