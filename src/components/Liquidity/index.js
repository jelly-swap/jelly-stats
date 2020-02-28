import React, { useContext } from "react";
import ProviderInfoContext from "../../context/providerInfo/context";

export default () => {
  const providerInfoContext = useContext(ProviderInfoContext);
  const { providerInfo } = providerInfoContext;

  console.log("INFO ", providerInfo);

  return <div>hi</div>;
};
