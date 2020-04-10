import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <div className="container-fluid DNDMapContainer">
      <BrowserRouter>
        <Route path="/">
          <App
            cellSize={45}
            rowCount={15}
            colCount={15}
            bgImageLink="https://dicegrimorium.com/wp-content/uploads/2019/07/ForestPathPublic-1024x1024.jpg"
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
