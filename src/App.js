import React, { Component } from "react";
import "./App.css";
import BoardMap from "./components/boardMap";

class App extends Component {
  state = {
    rowCount: 3,
    colCount: 3,
    walls: [
      { row: 1, col: 1 },
      { row: 1, col: 2 }
    ]
  };

  render() {
    const { rowCount, colCount, walls } = this.state;
    return <BoardMap rowCount={rowCount} colCount={colCount} walls={walls} />;
  }
}

export default App;
