import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ProviderInfoState from "./context/providerInfo";
import Navbar from "./components/Navbar";

import Dashboard from "./components/dashboard";
import Liquidity from "./components/liquidity";
import Providers from "./components/providers";

import "./css/App.scss";

const App = () => {
  return (
    <ProviderInfoState>
      <Router>
        <div className="App">
          <div className="navbar-container">
            <Navbar />
          </div>
          <div className="container">
            <Switch>
              <Route exact path="/liquidity" component={Liquidity} />
              <Route exact path="/providers" component={Providers} />
              <Route exact path="/" component={Dashboard} />
            </Switch>
          </div>
        </div>
      </Router>
    </ProviderInfoState>
  );
};

export default App;
