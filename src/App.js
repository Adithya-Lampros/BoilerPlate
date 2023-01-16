import "./App.css";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  BrowserRouter,
} from "react-router-dom";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli, polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Navbar from "./componets/Navbar";
import Home from "./componets/Home";

function App() {
  const { chains, provider } = configureChains(
    [goerli, polygonMumbai],
    [
      alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_ID }),
      publicProvider(),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: "projectone",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <div className="App">
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" exact element={<Home />} />
              </Routes>
            </BrowserRouter>
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default App;
