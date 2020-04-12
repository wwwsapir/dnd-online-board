import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";
import { DEFAULT_MAP_IMG_PATH } from "./constants";

ReactDOM.render(
  <React.StrictMode>
    <div className="container-fluid DNDMapContainer">
      <BrowserRouter>
        <Route path="/">
          <App
            cellSize={45}
            rowCount={15}
            colCount={15}
            bgImageLink={DEFAULT_MAP_IMG_PATH}
          />
        </Route>
      </BrowserRouter>
    </div>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
