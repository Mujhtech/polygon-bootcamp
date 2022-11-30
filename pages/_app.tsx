import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@fontsource/space-mono";
import "@fontsource/fira-sans";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { Provider } from "react-redux";
import { store } from "../app/store";
import PersistWrapper from "next-persist/lib/NextPersistWrapper";
import {
  WagmiConfig,
  createClient,
  configureChains,
  chain,
  useContractEvent,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import toast, { Toaster } from "react-hot-toast";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CONTRACT_ADDRESS } from "../app/constant";
import { ABI } from "../blockchain/ABIS/Eventnexo";
import { shortenAddress } from "../utils/address";
import { Identicon } from "../components/Identicon";

const PersistWrapperTypeFixed = PersistWrapper as any;

function MyApp({ Component, pageProps }: AppProps) {
  const nextPersistConfig = {
    method: "localStorage",
    allowList: {
      //tokenPrice: [""],
    },
  };

  const { provider, chains, webSocketProvider } = configureChains(
    [chain.polygonMumbai, chain.polygon],
    [publicProvider()]
    // [
    //   jsonRpcProvider({
    //     rpc: (chain) => ({
    //       http: `https://rpc-mumbai.maticvigil.com`,
    //     }),
    //   }),
    // ]
  );

  const client = createClient({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: "wagmi",
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
        },
      }),
      new InjectedConnector({
        chains,
        options: {
          name: "Injected",
          shimDisconnect: true,
        },
      }),
    ],
    provider,
    webSocketProvider,
  });

  useContractEvent({
    address: CONTRACT_ADDRESS,
    abi: ABI.abi,
    eventName: "TicketMint",
    listener(...args: [...args: unknown[], event: any]) {
      if (args[2].event == "TicketMint") {
        toast.custom(
          (t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-black bg-opacity-80 shadow-xl rounded-lg pointer-events-auto flex ring-0 ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <span>✅</span>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-xs md:text-sm text-white capitalize">
                      New ticket minted
                    </p>
                    <div className="mt-1 flex items-center text-sm md:text-base text-white space-x-2">
                      <Identicon address={args[1]} size={15} />
                      <span>
                        {shortenAddress(args[1], true, true)} just mint new
                        ticket.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200 cursor-pointer">
                <button
                  type="button"
                  onClick={() => toast.dismiss(t.id)}
                  className="cursor-pointer w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-xs md:text-sm font-medium text-white focus:outline-none focus:ring-0"
                >
                  Close
                </button>
              </div>
            </div>
          ),
          {
            duration: 200,
          }
        );
      }
      console.log(args, event);
    },
  });

  return (
    <Provider store={store}>
      <PersistWrapperTypeFixed wrapperConfig={nextPersistConfig}>
        <WagmiConfig client={client}>
          <Component {...pageProps} />
          <Toaster />
        </WagmiConfig>
      </PersistWrapperTypeFixed>
    </Provider>
  );
}

export default MyApp;
