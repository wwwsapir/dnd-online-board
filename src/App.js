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
    cellSize: Math.floor((100 / this.props.rowCount) * 0.96),
    borderWidth: Math.ceil((100 / this.props.rowCount) * 0.02),
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

  MapBgImg = {
    backgroundImage:
      'url("https://dicegrimorium.com/wp-content/uploads/2019/07/ForestPathPublic-1024x1024.jpg")',
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  };

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
      <div style={{border: "solid black 3px"}} className="h-50" >
        <div className="h-50" style={this.MapBgImg}>
          <BoardMap
            rowCount={rowCount}
            colCount={colCount}
            walls={walls}
            cellSize={cellSize}
            borderWidth={borderWidth}
            characters={characters}
          />
        </div>
        {/* <CharacterCreator onCreation={this.handleCharacterCreation} /> */}
      </div>
    );
  }
}

export default App;
