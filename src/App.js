import React, { Component } from "react";
import "./App.css";
import DiceRoller from "./components/diceRoller";
import "bootstrap/dist/css/bootstrap.min.css";
import MapCanvas from "./components/mapCanvas";
import CharacterCreatorPopUp from "./components/CharacterCreatorPopUp";
import ActionsMenu from "./components/actionsMenu";
import CloneDeep from "lodash/cloneDeep";
import ErrorBoundary from "react-error-boundary";
import { DefaultFallbackComponent } from "./constants";
import SpellCircleCreatorPopUp from "./components/spellCircleCreatorPopUp";

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
    placingChar: null,
    selectedCircle: null,
    placingCircle: null,
    itemDeletionModeOn: false,
    spellCircles: [
      {
        name: "Fireball",
        owner: "Warlock",
        radius: 10,
        row: 3,
        col: 3,
        color: { r: 51, g: 204, b: 255, a: 1 }
      }
    ],
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
    this.state.showSpellCircleCreatorPopup = false;
  }

  createMatrix(rowCount, colCount) {
    let myarr = [];
    for (let i = 0; i < rowCount; i++) {
      let row = [];
      for (let j = 0; j < colCount; j++) {
        let cell = {
          row: i,
          col: j,
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
    const { selectedChar, selectedCircle } = {
      ...this.state
    };
    if (selectedCircle) {
      let spellCircles = [...this.state.spellCircles];
      const spellCircleInd = this.moveSpellCircle(cell);
      if (triggerDeselect) {
        spellCircles = this.getSpellCirclesArrWithoutSelection();
        this.setState({
          selectedCircle: null,
          placingCircle: null,
          spellCircles
        });
      } else if (spellCircleInd > -1) {
        this.setState({ selectedCircle: spellCircles[spellCircleInd] });
      }
    }

    if (selectedChar) {
      let characters = [...this.state.characters];
      if (cell.wall) {
        if (triggerDeselect) {
          characters = this.getCharsArrWithoutSelection();
          this.setState({ selectedChar: null, placingChar: null, characters });
        }
        return;
      }

      const charInd = this.moveCharacter(cell);
      if (triggerDeselect) {
        characters = this.getCharsArrWithoutSelection();
        this.setState({ selectedChar: null, placingChar: null, characters });
      } else if (charInd > -1) {
        this.setState({ selectedChar: characters[charInd] });
      }
    }
  };

  // handleKeyUp = e => {
  //   let { selectedChar, matrix } = this.state;
  //   if (!selectedChar) {
  //     return;
  //   }

  //   let rowAdd = 0;
  //   let colAdd = 0;

  //   switch (e.keyCode) {
  //     case 37: // Left
  //       rowAdd = 0;
  //       colAdd = -1;
  //       break;
  //     case 38: // Up
  //       rowAdd = -1;
  //       colAdd = 0;
  //       break;
  //     case 39: // Right
  //       rowAdd = 0;
  //       colAdd = 1;
  //       break;
  //     case 40: // Down
  //       rowAdd = 1;
  //       colAdd = 0;
  //       break;
  //     default:
  //       const characters = this.getCharsArrWithoutSelection();
  //       this.setState({ selectedChar: null, placingChar: null, characters });
  //       return;
  //   }
  //   const row = selectedChar.topLeftRow + rowAdd;
  //   const col = selectedChar.topLeftCol + colAdd;
  //   if (this.checkIndicesValid(row, col, row, col)) {
  //     this.handleCellClick(matrix[row][col], false);
  //   }
  // };

  handleKeyUp = e => {
    let { selectedChar, selectedCircle } = { ...this.state };
    if (selectedChar) {
      const characters = this.getCharsArrWithoutSelection();
      this.setState({ selectedChar: null, placingChar: null, characters });
    } else if (selectedCircle) {
      const spellCircles = this.getSpellCirclesArrWithoutSelection();
      this.setState({
        selectedCircle: null,
        placingCircle: null,
        spellCircles
      });
    }
  };

  getCharsArrWithoutSelection() {
    let charactersCopy = [...this.state.characters];
    if (charactersCopy[charactersCopy.length - 1].topLeftRow === null) {
      // This happens when canceling the creation of a new character
      charactersCopy.pop();
    }
    return charactersCopy;
  }

  getSpellCirclesArrWithoutSelection() {
    let spellCirclesCopy = [...this.state.spellCircles];
    if (spellCirclesCopy[spellCirclesCopy.length - 1].row === null) {
      // This happens when canceling the creation of a new character
      spellCirclesCopy.pop();
    }
    return spellCirclesCopy;
  }

  deleteCharacter(charToDelete) {
    let characters = [...this.state.characters];
    characters = characters.filter(char => char !== charToDelete);
    this.setState({ characters });
    if (characters.length === 0 && this.state.spellCircles.length === 0) {
      this.toggleItemDeletionMode();
    }
  }

  handleCharClick = char => {
    let { selectedChar, placingChar, itemDeletionModeOn } = {
      ...this.state
    };
    if (itemDeletionModeOn) {
      this.deleteCharacter(char);
    } else {
      selectedChar = char;
      placingChar = { ...char }; // A copy of the character for the movement
      this.setState({ selectedChar, placingChar });
    }
  };

  handleSpellCircleClick = spellCircle => {
    let { selectedCircle, placingCircle, itemDeletionModeOn } = {
      ...this.state
    };
    if (itemDeletionModeOn) {
      this.deleteSpellCircle(spellCircle);
    } else {
      selectedCircle = spellCircle;
      placingCircle = { ...spellCircle }; // A copy of the spellCircle for the movement
      this.setState({ selectedCircle, placingCircle });
    }
  };

  deleteSpellCircle(spellCircleToDelete) {
    let spellCircles = [...this.state.spellCircles];
    spellCircles = spellCircles.filter(
      spellCircle => spellCircle !== spellCircleToDelete
    );
    this.setState({ spellCircles });
    if (this.state.characters.length === 0 && spellCircles.length === 0) {
      this.toggleItemDeletionMode();
    }
  }

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
    const { characters, selectedChar } = { ...this.state };
    const charInd = characters.indexOf(selectedChar);
    const { row, col } = cell;
    if (!this.isNewCharPosValid({ row, col })) {
      return -1;
    }

    characters[charInd] = { ...this.state.selectedChar };
    characters[charInd].topLeftRow = row;
    characters[charInd].topLeftCol = col;
    this.setState({ characters });
    return charInd;
  }

  moveSpellCircle(cell) {
    const { spellCircles, selectedCircle } = { ...this.state };
    const circleInd = spellCircles.indexOf(selectedCircle);
    const { row, col } = cell;

    spellCircles[circleInd] = { ...this.state.selectedCircle };
    spellCircles[circleInd].row = row;
    spellCircles[circleInd].col = col;
    this.setState({ spellCircles });
    return circleInd;
  }

  isNewCharPosValid(newPositionInd) {
    let selectedCharCopy = CloneDeep(this.state.selectedChar);
    selectedCharCopy.topLeftRow = newPositionInd.row;
    selectedCharCopy.topLeftCol = newPositionInd.col;
    return this.getSelectedCharCells(selectedCharCopy).length > 0;
  }

  calcCharPosition = char => {
    const { cellSize } = this.props;
    const { borderWidth } = this.state;
    let xPixels = null;
    let yPixels = null;
    if (char.topLeftRow !== null && char.topLeftCol !== null) {
      xPixels = char.topLeftRow * cellSize + borderWidth;
      yPixels = char.topLeftCol * cellSize + borderWidth;
    }

    return {
      topLeft: {
        row: xPixels,
        col: yPixels
      },
      width: char.widthCells * cellSize - 2 * borderWidth,
      height: char.heightCells * cellSize - 2 * borderWidth
    };
  };

  calcSpellCirclePosition = spellCircle => {
    const { cellSize } = this.props;
    let xPixels = null;
    let yPixels = null;
    if (spellCircle.row !== null && spellCircle.col !== null) {
      xPixels =
        spellCircle.row * cellSize - (spellCircle.radius / 5 - 0.5) * cellSize;
      yPixels =
        spellCircle.col * cellSize - (spellCircle.radius / 5 - 0.5) * cellSize;
    }

    return {
      row: xPixels,
      col: yPixels,
      radius: spellCircle.radius * (cellSize / 5)
    };
  };

  componentDidMount() {
    document.addEventListener("keyup", this.handleKeyUp, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keyup", this.handleKeyUp, false);
  }

  handleMouseEnterCell = cell => {
    let { placingChar, placingCircle } = { ...this.state };
    if (placingChar) {
      placingChar.topLeftRow = cell.row;
      placingChar.topLeftCol = cell.col;
      this.setState({ placingChar });
    } else if (placingCircle) {
      placingCircle.row = cell.row;
      placingCircle.col = cell.col;
      this.setState({ placingCircle });
    }
  };

  handleCharacterCreation = stateData => {
    const { characterName, height, width, avatarImage } = stateData;
    let newChar = {
      name: characterName,
      imgSrc: avatarImage,
      topLeftRow: null,
      topLeftCol: null,
      heightCells: height,
      widthCells: width
    };
    const characters = [...this.state.characters];
    characters.push(newChar);
    this.setState({
      characters,
      placingChar: { ...newChar },
      selectedChar: newChar
    });
  };

  toggleCharacterCreatorPopup = () => {
    this.setState({
      showCharacterCreatorPopup: !this.state.showCharacterCreatorPopup
    });
  };

  handleSpellCircleCreation = stateData => {
    const { spellName, ownerName, radius, color } = stateData;
    const newCircle = {
      name: spellName,
      owner: ownerName,
      radius,
      row: null,
      col: null,
      color
    };
    const spellCircles = [...this.state.spellCircles];
    spellCircles.push(newCircle);
    this.setState({
      spellCircles,
      placingCircle: { ...newCircle },
      selectedCircle: newCircle
    });
  };

  toggleItemDeletionMode = () => {
    const { itemDeletionModeOn, selectedChar } = this.state;
    if (selectedChar) {
      this.setState({
        selectedChar: null,
        placingChar: null,
        characters: this.getCharsArrWithoutSelection()
      }); // Cancel character selection
    }
    this.setState({ itemDeletionModeOn: !itemDeletionModeOn });
  };

  toggleSpellCircleCreatorPopup = () => {
    this.setState({
      showSpellCircleCreatorPopup: !this.state.showSpellCircleCreatorPopup
    });
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
      selectedCircle,
      spellCircles,
      matrix,
      placingChar,
      itemDeletionModeOn,
      placingCircle
    } = this.state;
    return (
      <div className="row h-100 w-100">
        <div className="MapArea col-9 h-100">
          <ErrorBoundary FallbackComponent={DefaultFallbackComponent}>
            <MapCanvas
              rowCount={rowCount}
              colCount={colCount}
              walls={walls}
              cellSize={cellSize}
              borderWidth={borderWidth}
              selectedChar={selectedChar}
              characters={characters}
              selectedCircle={selectedCircle}
              spellCircles={spellCircles}
              matrix={matrix}
              onCellClick={this.handleCellClick}
              onCharClick={this.handleCharClick}
              onCalcCharPosition={this.calcCharPosition}
              onCalcSpellCirclePosition={this.calcSpellCirclePosition}
              onMouseEnterCell={this.handleMouseEnterCell}
              placingChar={placingChar}
              itemDeletionModeOn={itemDeletionModeOn}
              onSpellCircleClick={this.handleSpellCircleClick}
              placingCircle={placingCircle}
            ></MapCanvas>
          </ErrorBoundary>
        </div>
        <div className="SideBar col-3 bg-primary">
          <ErrorBoundary FallbackComponent={DefaultFallbackComponent}>
            <ActionsMenu
              onCharacterCreation={this.toggleCharacterCreatorPopup}
              onSpellCircleCreation={this.toggleSpellCircleCreatorPopup}
              onCharacterCircleDelete={this.toggleItemDeletionMode}
              onGameSave={this.handleSaveGame}
              enableDeletion={characters.length > 0 || spellCircles.length > 0}
              itemDeletionModeOn={itemDeletionModeOn}
              onFinishDeletion={this.toggleItemDeletionMode}
            />
          </ErrorBoundary>
          {this.state.showCharacterCreatorPopup ? (
            <ErrorBoundary FallbackComponent={DefaultFallbackComponent}>
              <CharacterCreatorPopUp
                closePopup={this.toggleCharacterCreatorPopup}
                onCharacterCreation={this.handleCharacterCreation}
              />
            </ErrorBoundary>
          ) : null}
          {this.state.showSpellCircleCreatorPopup ? (
            <ErrorBoundary FallbackComponent={DefaultFallbackComponent}>
              <SpellCircleCreatorPopUp
                closePopup={this.toggleSpellCircleCreatorPopup}
                onSpellCircleCreation={this.handleSpellCircleCreation}
              />
            </ErrorBoundary>
          ) : null}
          <ErrorBoundary FallbackComponent={DefaultFallbackComponent}>
            <DiceRoller />
          </ErrorBoundary>
        </div>
      </div>
    );
  }
}

export default App;
