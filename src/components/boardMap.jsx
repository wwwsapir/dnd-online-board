import React, { Component } from "react";
import MapCell from "./mapCell";
import Character from "./character";
import CloneDeep from "lodash/cloneDeep";

class BoardMap extends Component {
  row = [{ cellInd: 0 }, { cellInd: 1 }, { cellInd: 2 }];

  state = {
    matrix: this.createMatrix(this.props.rowCount, this.props.colCount),
    characters: this.props.characters,
    selectedChar: undefined
  };

  createMatrix(rowCount, colCount) {
    let myarr = [];
    for (let i = 0; i < rowCount; i++) {
      let row = [];
      for (let j = 0; j < colCount; j++) {
        let cell = {
          character: undefined,
          wall: this.isCellWall(i, j)
        };
        row.push(cell);
      }
      myarr.push(row);
    }
    return myarr;
  }

  isCellWall(row, col) {
    const walls = this.props.walls.filter(c => c.row === row && c.col === col);
    return walls.length > 0;
  }

  handleCellClick = (cell, triggerDeselect = true) => {
    const { selectedChar, characters } = this.state;
    if (selectedChar) {
      if (cell.wall) {
        if (triggerDeselect) {
          this.setState({ selectedChar: undefined });
        }
        return;
      }

      const charInd = this.handleMoveCharacter(cell);
      if (charInd == -1) {
        if (triggerDeselect) {
          this.setState({ selectedChar: undefined });
        }
        return;
      }
      if (triggerDeselect) {
        console.log("trigger deselect", this.state);
        this.setState({ selectedChar: undefined });
      } else {
        this.setState({ selectedChar: characters[charInd] });
      }
    }
    console.log("after", this.state);
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
        this.setState({ selectedChar: undefined });
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
      selectedChar = undefined;
    } else {
      selectedChar = char;
      const selectedCells = this.getSelectedCharCells(char);
      if (!selectedCells) {
        selectedChar = undefined;
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

  handleMoveCharacter(cell) {
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
    return { row: undefined, col: undefined };
  }

  calcCharPosition(char) {
    const { cellSize, borderWidth } = this.props;
    return {
      topLeft: {
        row: char.topLeftRow * (cellSize + borderWidth * 2) + borderWidth,
        col: char.topLeftCol * (cellSize + borderWidth * 2) + borderWidth
      },
      width:
        char.widthCells * cellSize + (char.widthCells - 1) * 2 * borderWidth,
      height:
        char.heightCells * cellSize + (char.widthCells - 1) * 2 * borderWidth
    };
  }

  componentDidMount() {
    document.addEventListener("keyup", this.handleKeyUp, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keyup", this.handleKeyUp, false);
  }

  render() {
    const { matrix, selectedChar, characters } = this.state;
    const { cellSize, borderWidth } = this.props;

    return (
      <div>
        <div>
          {matrix.map((row, i) => (
            <div key={i}>
              {row.map((cell, j) => (
                <MapCell
                  key={j}
                  cell={cell}
                  cellSize={cellSize}
                  onClick={this.handleCellClick}
                  borderWidth={borderWidth}
                />
              ))}
            </div>
          ))}
        </div>
        <div>
          {characters.map((char, i) => (
            <Character
              key={i}
              character={char}
              selected={selectedChar === char}
              position={this.calcCharPosition(char)}
              onClick={this.handleCharClick}
              borderWidth={borderWidth}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default BoardMap;
