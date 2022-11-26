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
import { WagmiConfig, createClient, configureChains, chain } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const PersistWrapperTypeFixed = PersistWrapper as any;

function MyApp({ Component, pageProps }: AppProps) {
  const nextPersistConfig = {
    method: "localStorage",
    allowList: {
      //tokenPrice: [""],
    },
  };

  const { provider, webSocketProvider } = configureChains(
    [chain.polygonMumbai, chain.polygon],
    //[publicProvider()]
    [
      jsonRpcProvider({
        rpc: (chain) => ({
          http: `https://rpc-mumbai.maticvigil.com`,
        }),
      }),
    ]
  );

  const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
  });

  return (
    <Provider store={store}>
      <PersistWrapperTypeFixed wrapperConfig={nextPersistConfig}>
        <WagmiConfig client={client}>
          <Component {...pageProps} />
        </WagmiConfig>
      </PersistWrapperTypeFixed>
    </Provider>
  );
}

export default MyApp;
