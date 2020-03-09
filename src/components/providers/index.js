import React, { useContext, useState } from "react";
import Select from "react-select";
import { safeAccess } from "../../utils";

import ProviderInfoContext from "../../context/providerInfo/context";

import selectorStyles from "./selectorStyles";

import "./styles.scss";

export default () => {
  const providerInfoContext = useContext(ProviderInfoContext);
  const { providerInfo } = providerInfoContext;
  const [chosenToken, setChosenToken] = useState("");

  console.log("PROVIDER INFO ", providerInfo);

  const balances = safeAccess(providerInfo[0], ["balances"]);
  let options = [];

  if (balances) {
    let keys = Object.keys(balances);
    keys.forEach(e => {
      options.push({
        value: e.toLocaleLowerCase(),
        label: e
      });
    });
  }

  return (
    <div className="providers">
      <div className="selector-wrapper">
        <Select
          options={options}
          styles={selectorStyles()}
          onChange={e => setChosenToken(e.value)}
        />
      </div>
    </div>
  );
};
