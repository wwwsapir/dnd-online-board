import React, { Component } from "react";
import "./App.css";
import DiceRoller from "./components/diceRoller";
import "bootstrap/dist/css/bootstrap.min.css";
import MapCanvas from "./components/mapCanvas";
import CharacterCreatorPopUp from "./components/CharacterCreatorPopUp";
import ActionsMenu from "./components/actionsMenu";
import CloneDeep from "lodash/cloneDeep";

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
    matrix: null,
    selectedChar: null,
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
    this.state.matrix = this.createMatrix(
      this.props.rowCount,
      this.props.colCount
    );
    this.state.showCharacterCreatorPopup = false;
    this.state.showCircleCreatorPopup = false;
  }

  createMatrix(rowCount, colCount) {
    let myarr = [];
    for (let i = 0; i < rowCount; i++) {
      let row = [];
      for (let j = 0; j < colCount; j++) {
        let cell = {
          character: null,
          wall: this.isCellWall(i, j)
        };
        row.push(cell);
      }
      myarr.push(row);
    }
    return myarr;
  }

  isCellWall(row, col) {
    const walls = this.state.walls.filter(c => c.row === row && c.col === col);
    return walls.length > 0;
  }

  handleCellClick = (cell, triggerDeselect = true) => {
    const { selectedChar, characters } = this.state;
    if (selectedChar) {
      if (cell.wall) {
        if (triggerDeselect) {
          this.setState({ selectedChar: null });
        }
        return;
      }

      const charInd = this.moveCharacter(cell);
      if (charInd === -1) {
        if (triggerDeselect) {
          this.setState({ selectedChar: null });
        }
        return;
      }
      if (triggerDeselect) {
        this.setState({ selectedChar: null });
      } else {
        this.setState({ selectedChar: characters[charInd] });
      }
    }
  };

  handleKeyUp = e => {
    let { selectedChar, matrix } = this.state;
    if (!selectedChar) {
      return;
    }

    let rowAdd = 0;
    let colAdd = 0;

    switch (e.keyCode) {
      case 37: // Left
        rowAdd = 0;
        colAdd = -1;
        break;
      case 38: // Up
        rowAdd = -1;
        colAdd = 0;
        break;
      case 39: // Right
        rowAdd = 0;
        colAdd = 1;
        break;
      case 40: // Down
        rowAdd = 1;
        colAdd = 0;
        break;
      default:
        this.setState({ selectedChar: null });
        return;
    }
    const row = selectedChar.topLeftRow + rowAdd;
    const col = selectedChar.topLeftCol + colAdd;
    if (this.checkIndicesValid(row, col, row, col)) {
      this.handleCellClick(matrix[row][col], false);
    }
  };

  handleCharClick = char => {
    let { selectedChar } = { ...this.state };
    if (selectedChar) {
      selectedChar = null;
    } else {
      selectedChar = char;
      const selectedCells = this.getSelectedCharCells(char);
      if (!selectedCells) {
        selectedChar = null;
      }
    }
    this.setState({ selectedChar });
  };

  getSelectedCharCells(char) {
    let selectedCells = [];
    const { matrix } = this.state;
    const lastRowInd = char.heightCells + char.topLeftRow - 1;
    const lastColInd = char.widthCells + char.topLeftCol - 1;
    if (
      !this.checkIndicesValid(
        char.topLeftRow,
        char.topLeftCol,
        lastRowInd,
        lastColInd
      )
    ) {
      console.warn("Can't place character outside map boundary!");
      return [];
    }
    for (let row = char.topLeftRow; row < lastRowInd + 1; row++) {
      for (let col = char.topLeftCol; col < lastColInd + 1; col++) {
        selectedCells.push(matrix[row][col]);
      }
    }
    return selectedCells;
  }

  checkIndicesValid(smallRow, smallCol, largeRow, largeCol) {
    const { rowCount, colCount } = this.props;
    return (
      smallRow >= 0 &&
      smallCol >= 0 &&
      largeRow < rowCount &&
      largeCol < colCount
    );
  }

  moveCharacter(cell) {
    const charInd = this.state.characters.indexOf(this.state.selectedChar);
    const positionInd = this.matrixIndexOf(cell);

    if (!this.isNewPosValid(positionInd)) {
      return -1;
    }

    const { characters } = { ...this.state };
    characters[charInd] = { ...this.state.selectedChar };
    characters[charInd].topLeftRow = positionInd.row;
    characters[charInd].topLeftCol = positionInd.col;
    this.setState({ characters });
    return charInd;
  }

  isNewPosValid(newPositionInd) {
    let selectedCharCopy = CloneDeep(this.state.selectedChar);
    selectedCharCopy.topLeftRow = newPositionInd.row;
    selectedCharCopy.topLeftCol = newPositionInd.col;
    return this.getSelectedCharCells(selectedCharCopy).length > 0;
  }

  matrixIndexOf(cell) {
    const { matrix } = this.state;
    for (let row = 0; row < matrix.length; row++) {
      const cellInd = matrix[row].indexOf(cell);
      if (cellInd !== -1) {
        return { row: row, col: cellInd };
      }
    }
    return { row: null, col: null };
  }

  calcCharPosition = char => {
    const { cellSize } = this.props;
    const { borderWidth } = this.state;
    return {
      topLeft: {
        row: char.topLeftRow * cellSize + borderWidth,
        col: char.topLeftCol * cellSize + borderWidth
      },
      width: char.widthCells * cellSize - 2 * borderWidth,
      height: char.heightCells * cellSize - 2 * borderWidth
    };
  };

  componentDidMount() {
    document.addEventListener("keyup", this.handleKeyUp, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keyup", this.handleKeyUp, false);
  }

  handleMouseEnterCell = cell => {
    console.log("handleMouseEnterCell called. cell:", cell);
  };

  handleMouseLeaveCell = cell => {
    console.log("handleMouseLeaveCell called. cell:", cell);
  };

  handleCharacterCreation(stateData) {
    console.log("handleCharacterCreation called. data:", stateData);
  }

  toggleCharacterCreatorPopup = () => {
    this.setState({
      showCharacterCreatorPopup: !this.state.showCharacterCreatorPopup
    });
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
      selectedChar,
      characters,
      matrix
    } = this.state;
    return (
      <div className="row h-100 w-100">
        <div className="MapArea col-9 h-100">
          <MapCanvas
            rowCount={rowCount}
            colCount={colCount}
            walls={walls}
            cellSize={cellSize}
            borderWidth={borderWidth}
            selectedChar={selectedChar}
            characters={characters}
            matrix={matrix}
            onCellClick={this.handleCellClick}
            onCharClick={this.handleCharClick}
            onCalcCharPosition={this.calcCharPosition}
            onMouseEnterCell={this.handleMouseEnterCell}
            onMouseLeaveCell={this.handleMouseLeaveCell}
          ></MapCanvas>
        </div>
        <div className="SideBar col-3 bg-primary">
          <ActionsMenu
            onCharacterCreation={this.toggleCharacterCreatorPopup}
            onCircleCreation={this.toggleCircleCreatorPopup}
            onGameSave={this.handleSaveGame}
          />
          {this.state.showCharacterCreatorPopup ? (
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
