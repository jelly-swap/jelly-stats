import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Liquidity from "./components/Liquidity";

import "./css/App.scss";

const App = () => {
  return (
    <Router>
      <div className="App">
        <div className="navbar-container">
          <Navbar />
        </div>
        <div className="container">
          <Switch>
            <Route exact path="/liquidity" component={Liquidity} />
            <Route exact path="/" component={Dashboard} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
