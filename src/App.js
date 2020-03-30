import React, { Component, Fragment } from "react";
import "./App.css";
import BoardMap from "./components/boardMap";
import CharacterCreator from "./components/characterCreator";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  state = {
    rowCount: this.props.rowCount,
    colCount: this.getColCount(),
    walls: [
      // { row: 1, col: 1 },
      // { row: 1, col: 2 }
    ],
    cellSize: 100 / this.props.rowCount,
    borderWidth: Math.ceil((100 / this.props.rowCount) * 0.2),
    characters: [
      {
        name: "Ranger",
        imgSrc: this.props.imageLinks.ranger,
        topLeftRow: 0,
        topLeftCol: 0,
        widthCells: 1,
        heightCells: 1
      },
      {
        name: "Warlock",
        imgSrc: this.props.imageLinks.warlock,
        topLeftRow: 2,
        topLeftCol: 2,
        widthCells: 2,
        heightCells: 2
      }
    ]
  };

  getColCount() {
    console.warn("Temp col count");
    return 8;
  }

  handleCharacterCreation() {
    console.log("handleCharacterCreation called");
  }

  render() {
    const {
      rowCount,
      colCount,
      walls,
      cellSize,
      borderWidth,
      characters
    } = this.state;
    return (
      <div className="row h-100 w-100">
        <div className="MapBgImg col-md-9" style={{ border: "blue 5px solid" }}>
          <BoardMap
            rowCount={rowCount}
            colCount={colCount}
            walls={walls}
            cellSize={cellSize}
            borderWidth={borderWidth}
            characters={characters}
          />
        </div>
        <div
          className="col-md-3"
          style={{
            border: "blue 5px solid"
          }}
        >
          <CharacterCreator onCreation={this.handleCharacterCreation} />
        </div>
      </div>
    );
  }
}

export default App;
