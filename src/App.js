import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ProviderInfoState from "./context/providerInfo";
import VolumeState from "./context/volumeContext";

import Navbar from "./components/navbar";

import Dashboard from "./components/dashboard";
import Liquidity from "./components/liquidity";
import Providers from "./components/providers";
import Volume from "./components/volume";

import "./css/App.scss";

const App = () => {
  return (
    <ProviderInfoState>
      <Router>
        <div className="App">
          <div className="navbar-container">
            <Navbar />
          </div>
          <div className="container-content">
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/liquidity" component={Liquidity} />
              <Route path="/providers" component={Providers} />
              <VolumeState>
                <Route path="/volume" component={Volume} />
              </VolumeState>
            </Switch>
          </div>
        </div>
      </Router>
    </ProviderInfoState>
  );
};

export default App;
