import { FETCH_PROVIDERS_INFO, AGGREGATE_TOKENS } from './types';

export default (state, action) => {
  switch (action.type) {
    case FETCH_PROVIDERS_INFO: {
      return {
        ...state,
        // Once there's more than one object returned from the provider service, simply remove brackets e.g.:
        // Everything should work just fine :)
        // providerInfo: providerInfo
        providersInfo: action.payload
      };
    }
    case AGGREGATE_TOKENS: {
      return {
        ...state,
        tokens: { ...action.payload }
      };
    }

    default:
      return state;
  }
};
