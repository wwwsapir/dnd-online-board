import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";

const imageLinks = {
  ranger: "https://drive.google.com/uc?id=1MIyJ4ATQToPI_RN7RfiFQPDmuKBWHz_j",
  rogue: "https://drive.google.com/uc?id=1bRC8T6ywHD6f23cdLnp2WmWaIImY7YXM",
  sorcerer: "https://drive.google.com/uc?id=1TK0i8R3td1vj0Xlo1kZmS0Zu7H2c90kK",
  warlock: "https://drive.google.com/uc?id=1PMrMr1T9WVBa8x5FDqV2ZIOK6Uam_Hw5",
  fighter: "https://drive.google.com/uc?id=1HJxgNpcvnkyH2Bx36ynbQgIhmBPK1XfA"
};

ReactDOM.render(
  <React.StrictMode>
    <div
      className="container-fluid"
      style={{ border: "solid black 3px", height: "800px" }}
    >
      <App cellSize={70} imageLinks={imageLinks} />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
