import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";

const imageBaseUrl = "https://drive.google.com/uc?id=";

const imageLinks = {
  ranger: imageBaseUrl + "1MIyJ4ATQToPI_RN7RfiFQPDmuKBWHz_j",
  rogue: imageBaseUrl + "1bRC8T6ywHD6f23cdLnp2WmWaIImY7YXM",
  sorcerer: imageBaseUrl + "1TK0i8R3td1vj0Xlo1kZmS0Zu7H2c90kK",
  warlock: imageBaseUrl + "1PMrMr1T9WVBa8x5FDqV2ZIOK6Uam_Hw5",
  fighter: imageBaseUrl + "1HJxgNpcvnkyH2Bx36ynbQgIhmBPK1XfA",
  scorbat: imageBaseUrl + "1R4CXRmvvWFQwSWH5blj71R9si4q_ePHb",
  dragon: imageBaseUrl + "13hzS-a0ZeHNe9f1lkWpfTVrj3prDAs0U",
  beetle: imageBaseUrl + "1Iy7IJvd4PT7ImBPjSJRrf7Ytc7ZYiOgs",
  balrog: imageBaseUrl + "1-ShPk6rbliyWzEd7yEFqrJoOZwn1awAM",
};

ReactDOM.render(
  <React.StrictMode>
    <div className="container-fluid DNDMapContainer">
      <App cellSize={45} rowCount={15} colCount={15} imageLinks={imageLinks} />
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
