import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../css/images/logo.png';

import { openLink } from '../../utils';

import './style.scss';

export default () => {
  return (
    <div className='navbar'>
      <div className='logo-container'>
        <img src={logo} alt='jelly-logo' onClick={openLink(`https://jelly.market/`)}></img>
      </div>
      <ul>
        <li>
          <NavLink activeClassName='selected' to='/' exact={true}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName='selected' to='/liquidity'>
            Liquidity
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName='selected' to='/providers'>
            Providers
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName='selected' to='/history'>
            History
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName='selected' to='/rewards'>
            Rewards
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName='selected' to='/competition'>
            Competition
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
