import React from "react";
import { formatDisplayNum } from "../../utils";

export default ({ network, priceToUSD }) => {
  return (
    <div className="card">
      <span className="price">{formatDisplayNum(priceToUSD)} $</span>
      <span className="network">{network}</span>
    </div>
  );
};
