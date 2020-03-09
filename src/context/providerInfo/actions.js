import axios from "axios";
import { FETCH_PROVIDER_INFO } from "./types";

export const fetchProviderInfo = async () => {
  try {
    const res = await axios.get(
      "https://spacejelly.network/listener/provider/info"
    );
    return {
      type: FETCH_PROVIDER_INFO,
      payload: {
        providerInfo: [
          {
            providerInfo: { name: "Jelly-Main", coverWithdrawFees: true },
            prices: {
              USDT: {
                BTC: "0.000129337",
                USDT: "0.9949",
                ETH: "0.0051476126",
                TRX: "69.3793584643",
                DAI: "0.9949",
                WBTC: "0.000129337"
              },
              BTC: {
                USDT: "7677.404524",
                BTC: "0.9949",
                ETH: "39.7054710643",
                TRX: "537783.7837842409",
                AE: "52099.94683684",
                DAI: "7677.404524",
                WBTC: "0.999",
                balance: {
                  address: "bc1qwjeylyfrkn8sckwux789dqtscafujhgy4xcddg",
                  balance: "23426624",
                  balanceShort: "0.23426624"
                }
              },
              ETH: {
                USDT: "192.274374",
                ETH: "0.9949",
                BTC: "0.0249292093",
                TRX: "13435.5165424774",
                AE: "1308.4112153",
                DAI: "192.97011",
                WBTC: "0.0249292093",
                balance: {
                  address: "0xb2cB83E2E367682B2C0d3AAF04131Dd94C41A1A9",
                  balance: "19447158500163636483",
                  balanceShort: "19.447158500163636483"
                }
              },
              TRX: {
                USDT: "0.014266866",
                TRX: "0.9949",
                BTC: "0.0000019898",
                ETH: "0.0000736226",
                DAI: "0.014266866",
                WBTC: "0.0000019898"
              },
              AE: {
                BTC: "0.00001862",
                AE: "0.9949",
                ETH: "0.00073402",
                WBTC: "0.0000189031",
                balance: {
                  address:
                    "ak_2Mgic2LxpXo7U4P9KTYqvF51ShNBCgRqWrVQ6pxwNnhZ78Ub1W",
                  balance: "1652038484764999926216",
                  balanceShort: "1652.038484764999926216"
                }
              },
              DAI: {
                BTC: "0.000129337",
                USDT: "0.9949",
                ETH: "0.005166239",
                TRX: "69.3793584643",
                DAI: "0.9949",
                WBTC: "0.000129337",
                balance: {
                  address: "0x44EED7dE9A8bBF75e88afe4507D10767965CBef6",
                  balance: "525463128000000000000",
                  balanceShort: "525.463128"
                }
              },
              WBTC: {
                USDT: "7677.404524",
                BTC: "0.999",
                ETH: "39.7054710643",
                TRX: "537783.7837842409",
                AE: "52892.0786816042",
                DAI: "7677.404524",
                WBTC: "0.9949",
                balance: {
                  address: "0x44EED7dE9A8bBF75e88afe4507D10767965CBef6",
                  balance: "6520800",
                  balanceShort: "0.065208"
                }
              }
            },
            balances: {
              ETH: {
                address: "0xb2cB83E2E367682B2C0d3AAF04131Dd94C41A1A9",
                balance: "19447158500163636483",
                balanceShort: "19.447158500163636483"
              },
              BTC: {
                address: "bc1qwjeylyfrkn8sckwux789dqtscafujhgy4xcddg",
                balance: "23426624",
                balanceShort: "0.23426624"
              },
              AE: {
                address:
                  "ak_2Mgic2LxpXo7U4P9KTYqvF51ShNBCgRqWrVQ6pxwNnhZ78Ub1W",
                balance: "1652038484764999926216",
                balanceShort: "1652.038484764999926216"
              },
              DAI: {
                address: "0x44EED7dE9A8bBF75e88afe4507D10767965CBef6",
                balance: "525463128000000000000",
                balanceShort: "525.463128"
              },
              WBTC: {
                address: "0x44EED7dE9A8bBF75e88afe4507D10767965CBef6",
                balance: "6520800",
                balanceShort: "0.065208"
              }
            },
            pairs: {
              "ETH-BTC": true,
              "BTC-ETH": true,
              "BTC-DAI": true,
              "DAI-BTC": true,
              "TRX-ETH": false,
              "AE-ETH": true,
              "ETH-AE": true,
              "AE-BTC": true,
              "BTC-AE": true,
              "ETH-DAI": true,
              "DAI-ETH": true,
              "WBTC-BTC": true,
              "BTC-WBTC": true
            }
          },
          {
            providerInfo: { name: "Nasko", coverWithdrawFees: true },
            prices: {
              USDT: {
                BTC: "0.000129337",
                USDT: "0.9949",
                ETH: "0.0051476126",
                TRX: "69.3793584643",
                DAI: "0.9949",
                WBTC: "0.000129337"
              },
              BTC: {
                USDT: "7677.404524",
                BTC: "0.9949",
                ETH: "39.7054710643",
                TRX: "537783.7837842409",
                AE: "52099.94683684",
                DAI: "7677.404524",
                WBTC: "0.999",
                balance: {
                  address: "naskobc1qwjeylyfrkn8sckwux789dqtscafujhgy4xcddg",
                  balance: "23426624",
                  balanceShort: "0.23426624"
                }
              },
              ETH: {
                USDT: "192.274374",
                ETH: "0.9949",
                BTC: "0.0249292093",
                TRX: "13435.5165424774",
                AE: "1308.4112153",
                DAI: "192.97011",
                WBTC: "0.0249292093",
                balance: {
                  address: "nask0xb2cB83E2E367682B2C0d3AAF04131Dd94C41A1A9",
                  balance: "19447158500163636483",
                  balanceShort: "19.447158500163636483"
                }
              },
              TRX: {
                USDT: "0.014266866",
                TRX: "0.9949",
                BTC: "0.0000019898",
                ETH: "0.0000736226",
                DAI: "0.014266866",
                WBTC: "0.0000019898"
              },
              AE: {
                BTC: "0.00001862",
                AE: "0.9949",
                ETH: "0.00073402",
                WBTC: "0.0000189031",
                balance: {
                  address:
                    "naskak_2Mgic2LxpXo7U4P9KTYqvF51ShNBCgRqWrVQ6pxwNnhZ78Ub1W",
                  balance: "1652038484764999926216",
                  balanceShort: "1652.038484764999926216"
                }
              },
              DAI: {
                BTC: "0.000129337",
                USDT: "0.9949",
                ETH: "0.005166239",
                TRX: "69.3793584643",
                DAI: "0.9949",
                WBTC: "0.000129337",
                balance: {
                  address: "nas0x44EED7dE9A8bBF75e88afe4507D10767965CBef6",
                  balance: "525463128000000000000",
                  balanceShort: "525.463128"
                }
              },
              WBTC: {
                USDT: "7677.404524",
                BTC: "0.999",
                ETH: "39.7054710643",
                TRX: "537783.7837842409",
                AE: "52892.0786816042",
                DAI: "7677.404524",
                WBTC: "0.9949",
                balance: {
                  address: "nas0x44EED7dE9A8bBF75e88afe4507D10767965CBef6",
                  balance: "6520800",
                  balanceShort: "0.065208"
                }
              }
            },
            balances: {
              ETH: {
                address: "nas0xb2cB83E2E367682B2C0d3AAF04131Dd94C41A1A9",
                balance: "19447158500163636483",
                balanceShort: "19.447158500163636483"
              },
              BTC: {
                address: "nasbc1qwjeylyfrkn8sckwux789dqtscafujhgy4xcddg",
                balance: "23426624",
                balanceShort: "0.23426624"
              },
              AE: {
                address:
                  "nasak_2Mgic2LxpXo7U4P9KTYqvF51ShNBCgRqWrVQ6pxwNnhZ78Ub1W",
                balance: "1652038484764999926216",
                balanceShort: "1652.038484764999926216"
              },
              DAI: {
                address: "nas0x44EED7dE9A8bBF75e88afe4507D10767965CBef6",
                balance: "525463128000000000000",
                balanceShort: "525.463128"
              },
              WBTC: {
                address: "nas0x44EED7dE9A8bBF75e88afe4507D10767965CBef6",
                balance: "6520800",
                balanceShort: "0.065208"
              }
            },
            pairs: {
              "ETH-BTC": true,
              "BTC-ETH": true,
              "BTC-DAI": true,
              "DAI-BTC": true,
              "TRX-ETH": false,
              "AE-ETH": true,
              "ETH-AE": true,
              "AE-BTC": true,
              "BTC-AE": true,
              "ETH-DAI": true,
              "DAI-ETH": true,
              "WBTC-BTC": true,
              "BTC-WBTC": true
            }
          }
        ]
      }
    };
  } catch (error) {
    return {
      type: FETCH_PROVIDER_INFO,
      payload: { providerInfo: null }
    };
  }
};
