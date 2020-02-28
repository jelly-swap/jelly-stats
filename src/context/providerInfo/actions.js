import axios from "axios";
import { FETCH_PROVIDER_INFO } from "./types";

export const fetchProviderInfo = async () => {
  try {
    const res = await axios.get(
      "https://spacejelly.network/listener/provider/info"
    );
    return {
      type: FETCH_PROVIDER_INFO,
      payload: { providerInfo: res.data }
    };
  } catch (error) {
    return {
      type: FETCH_PROVIDER_INFO,
      payload: { providerInfo: null }
    };
  }
};
