import React from "react";
import Select from "react-select";
import selectorStyles from "./selectorStyles";

import "./styles.scss";

const options = [
  { value: "btc", label: "Bitcoin" },
  { value: "eth", label: "Ethereum" },
  { value: "vanilla", label: "Vanilla" }
];

export default () => {
  return (
    <div className="providers">
      <div className="selector-wrapper">
        <Select options={options} styles={selectorStyles()} />
      </div>
    </div>
  );
};
