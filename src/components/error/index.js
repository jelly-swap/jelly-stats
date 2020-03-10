import React from "react";
import error from "../../css/images/error.png";

import "./style.scss";

export default ({ msg }) => {
  return (
    <div className="error">
      <img src={error} alt="error-icon"></img>
      <span>
        Something went wrong... :( <br></br>Reason: {msg}
      </span>
    </div>
  );
};
