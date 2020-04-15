import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter, Route } from "react-router-dom";
import { DEFAULT_MAP_IMG_PATH } from "./constants";
import { isMobile } from "react-device-detect";
import BrowserDetection from "react-browser-detection";

const renderApp = () => {
  return (
    <div className="container-fluid DNDMapContainer">
      <HashRouter>
        <Route path="/">
          <App
            cellSize={45}
            rowCount={15}
            colCount={15}
            bgImageLink={DEFAULT_MAP_IMG_PATH}
          />
        </Route>
      </HashRouter>
    </div>
  );
};

const browserHandler = {
  chrome: renderApp,
  firefox: renderApp,
  opera: renderApp,
  default: (browser) => (
    <div>
      Hi {browser}! This app currently only works on Firefox, Chrome and Opera
      browsers. Please use one of them to enter :)
    </div>
  ),
};

ReactDOM.render(
  <React.StrictMode>
    {isMobile ? (
      <div>
        This app is unavailable on mobile devices. Please use a a desktop to
        enter :)
      </div>
    ) : (
      <BrowserDetection>{browserHandler}</BrowserDetection>
    )}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
