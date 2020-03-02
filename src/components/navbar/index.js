import React from "react";
import { NavLink } from "react-router-dom";

import "./style.scss";

export default () => {
  return (
    <ul>
      <li>
        <NavLink to="/" exact={true}>
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/liquidity">Liquidity</NavLink>
      </li>
      <li>
        <NavLink to="/providers">Providers</NavLink>
      </li>
    </ul>
  );
};
