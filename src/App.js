import React, { Component, Fragment } from "react";
import "./App.css";
import BoardMap from "./components/boardMap";

class App extends Component {
  state = {
    rowCount: 8,
    colCount: 8,
    walls: [
      // { row: 1, col: 1 },
      // { row: 1, col: 2 }
    ],
    cellSize: this.props.cellSize,
    borderWidth: Math.ceil(this.props.cellSize * 0.02)
  };

  bgImgStyle = {
    backgroundImage:
      'url("https://dicegrimorium.com/wp-content/uploads/2019/07/ForestPathPublic-1024x1024.jpg")',
    height:
      (this.state.cellSize + this.state.borderWidth * 2) * this.state.rowCount,
    width:
      (this.state.cellSize + this.state.borderWidth * 2) * this.state.colCount,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  };

  render() {
    const { rowCount, colCount, walls } = this.state;
    return (
      <Fragment>
        <div style={this.bgImgStyle}>
          <BoardMap
            rowCount={rowCount}
            colCount={colCount}
            walls={walls}
            cellSize={this.state.cellSize}
            borderWidth={this.state.borderWidth}
          />
        </div>
      </Fragment>
    );
  }
}

export default App;
