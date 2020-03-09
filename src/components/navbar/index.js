import React from "react";
import { NavLink } from "react-router-dom";

import "./style.scss";

export default () => {
  return (
    <ul>
      <li>
        <NavLink activeClassName="selected" to="/" exact={true}>
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="selected" to="/liquidity">
          Liquidity
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="selected" to="/providers">
          Providers
        </NavLink>
      </li>
    </ul>
  );
};
