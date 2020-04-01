import React, { Component, Fragment } from "react";
import "./App.css";
import CharacterCreator from "./components/characterCreator";
import "bootstrap/dist/css/bootstrap.min.css";
import MapCanvas from "./components/mapCanvas";

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
      },
      {
        name: "Fighter",
        imgSrc: this.props.imageLinks.fighter,
        topLeftRow: 5,
        topLeftCol: 0,
        widthCells: 1,
        heightCells: 1
      }
    ]
  };

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
        {/* <div className="MapBgImg col-md-9" style={{ border: "blue 5px solid" }}> */}
        <div
          className="col-md-9 h-100"
          style={{ border: "blue 5px solid", padding: 0 }}
        >
          <MapCanvas
            rowCount={rowCount}
            colCount={colCount}
            walls={walls}
            cellSize={cellSize}
            borderWidth={borderWidth}
            characters={characters}
          ></MapCanvas>
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
