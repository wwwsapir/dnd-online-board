import React, { Component } from "react";
import "./App.css";
import BoardMap from "./components/boardMap";

class App extends Component {
  state = {
    rowCount: 3,
    colCount: 3
  };

  render() {
    const {rowCount, colCount} = this.state
    return <BoardMap rowCount={rowCount} colCount={colCount} />;
  }
}

export default App;
