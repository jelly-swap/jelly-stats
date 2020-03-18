import { FETCH_PROVIDER_INFO } from "./types";

export default (state, action) => {
  switch (action.type) {
    case FETCH_PROVIDER_INFO: {
      const { providerInfo } = action.payload;
      return {
        ...state,
        // Once there's more than one object returned from the provider service, simply remove brackets e.g.:
        // Everything should work just fine :)
        // providerInfo: providerInfo
        providerInfo: [providerInfo]
      };
    }

    default:
      return null;
  }
};
