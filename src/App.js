import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Yellow from './css/images/yellow.svg';
import Purple from './css/images/purple.svg';
import Orange from './css/images/orange.svg';
import Green from './css/images/green.svg';

import Navbar from './components/navbar';

import Dashboard from './components/dashboard';
import Liquidity from './components/liquidity';
import Providers from './components/providers';
import History from './components/history';

import './css/App.scss';
import PriceProvider, { Updater as PriceUpdater } from './context/price';
import LiquidityProvider, { Updater as LiquidityUpdater } from './context/liquidity';
import ProviderContext, { Updater as ProviderUpdate } from './context/providers';
import HistoryContext from './context/history';

function Updaters() {
  return (
    <>
      <PriceUpdater />
      <LiquidityUpdater />
      <ProviderUpdate />
    </>
  );
}

const App = () => {
  return (
    <PriceProvider>
      <LiquidityProvider>
        <ProviderContext>
          <HistoryContext>
            <Updaters />
            <Router>
              <div className='App'>
                <div className='navbar-container'>
                  <Navbar />
                </div>
                <div className='container-content'>
                  <Switch>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/liquidity' component={Liquidity} />
                    <Route path='/providers' component={Providers} />
                    <Route path='/history' component={History} />
                  </Switch>
                  <img src={Yellow} alt='help' style={{ right: '27%', top: '90%' }} />
                  <img src={Purple} alt='help' style={{ right: '-4%', bottom: '15%' }} />
                  <img src={Orange} alt='help' style={{ left: '-5%', bottom: '20%' }} />
                  <img src={Green} alt='help' style={{ right: '-2%', top: '-5%' }} />
                </div>
              </div>
            </Router>
          </HistoryContext>
        </ProviderContext>
      </LiquidityProvider>
    </PriceProvider>
  );
};

export default App;
