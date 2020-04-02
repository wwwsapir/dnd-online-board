import React, { Component } from "react";
import "./App.css";
import DiceRoller from "./components/diceRoller";
import "bootstrap/dist/css/bootstrap.min.css";
import MapCanvas from "./components/mapCanvas";
import CharacterCreatorPopUp from "./components/CharacterCreatorPopUp";
import ActionsMenu from "./components/actionsMenu";

class App extends Component {
  state = {
    rowCount: this.props.rowCount,
    colCount: this.props.colCount,
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
        topLeftRow: 1,
        topLeftCol: 7,
        widthCells: 1,
        heightCells: 1
      },
      {
        name: "Dragon",
        imgSrc: this.props.imageLinks.dragon,
        topLeftRow: 1,
        topLeftCol: 4,
        widthCells: 2,
        heightCells: 2
      },
      {
        name: "Warlock",
        imgSrc: this.props.imageLinks.warlock,
        topLeftRow: 4,
        topLeftCol: 9,
        widthCells: 1,
        heightCells: 1
      },
      {
        name: "Fighter",
        imgSrc: this.props.imageLinks.fighter,
        topLeftRow: 3,
        topLeftCol: 6,
        widthCells: 1,
        heightCells: 1
      },
      {
        name: "Beetle",
        imgSrc: this.props.imageLinks.beetle,
        topLeftRow: 6,
        topLeftCol: 5,
        widthCells: 1,
        heightCells: 1
      }
    ]
  };

  constructor(props) {
    super(props);
    this.state.showPopup = false;
  }

  handleCharacterCreation(stateData) {
    console.log("handleCharacterCreation called. data:", stateData);
  }

  toggleCharacterCreatorPopup = () => {
    this.setState({ showPopup: !this.state.showPopup });
  };

  toggleCircleCreatorPopup = () => {
    console.log("toggleCircleCreatorPopup called");
  };

  handleSaveGame = () => {
    console.log("handleSaveGame called");
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
      <div className="row h-100 w-100">
        {/* <div className="MapBgImg col-md-9" style={{ border: "blue 5px solid" }}> */}
        <div className="MapArea col-md-9 h-100">
          <MapCanvas
            rowCount={rowCount}
            colCount={colCount}
            walls={walls}
            cellSize={cellSize}
            borderWidth={borderWidth}
            characters={characters}
          ></MapCanvas>
        </div>
        <div className="SideBar col-md-3 bg-primary">
          <ActionsMenu
            onCharacterCreation={this.toggleCharacterCreatorPopup}
            onCircleCreation={this.toggleCircleCreatorPopup}
            onGameSave={this.handleSaveGame}
          />
          {this.state.showPopup ? (
            <CharacterCreatorPopUp
              closePopup={this.toggleCharacterCreatorPopup}
              onCharacterCreation={this.handleCharacterCreation}
            />
          ) : null}
          <DiceRoller />
        </div>
      </div>
    );
  }
}

export default App;
