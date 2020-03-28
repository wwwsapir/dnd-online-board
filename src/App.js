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
    borderWidth: Math.ceil(this.props.cellSize * 0.02),
    characters: [
      {
        name: "Ranger",
        imgSrc: this.props.imageLinks.ranger,
        topLeftInd: { row: 0, col: 0 },
        widthCells: 1,
        heightCells: 1
      },
      {
        name: "Warlock",
        imgSrc: this.props.imageLinks.warlock,
        topLeftInd: { row: 2, col: 2 },
        widthCells: 2,
        heightCells: 2
      }
    ]
  };

  style = {
    mapBgImg: {
      height:
        (this.state.cellSize + this.state.borderWidth * 2) *
        this.state.rowCount,
      width:
        (this.state.cellSize + this.state.borderWidth * 2) * this.state.colCount
    }
  };

  render() {
    const { rowCount, colCount, walls } = this.state;
    return (
      <Fragment>
        <div className="MapBgImg" style={this.style.mapBgImg}>
          <BoardMap
            rowCount={rowCount}
            colCount={colCount}
            walls={walls}
            cellSize={this.state.cellSize}
            borderWidth={this.state.borderWidth}
            characters={this.state.characters}
          />
        </div>
      </Fragment>
    );
  }
}

export default App;
