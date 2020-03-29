import React, { Component } from "react";
import MapCell from "./mapCell";
import Character from "./character";
import CloneDeep from "lodash/cloneDeep";

class BoardMap extends Component {
  row = [{ cellInd: 0 }, { cellInd: 1 }, { cellInd: 2 }];

  state = {
    matrix: this.createMatrix(this.props.rowCount, this.props.colCount),
    selectedCells: [],
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

  handleCellClick = cell => {
    const { selectedCells, selectedChar } = this.state;
    if (selectedChar) {
      if (selectedCells.length > 0) {
        if (!selectedCells.includes(cell) && !cell.wall) {
          this.handleAction(cell);
        }
        this.changeCellsState(selectedCells, false);
      } else if (!cell.wall) {
        this.changeCellsState([cell], true);
      }
    }
  };

  handleCharClick = char => {
    let { selectedChar, selectedCells } = { ...this.state };
    if (selectedChar || selectedCells.length > 0) {
      selectedChar = undefined;
      selectedCells = [];
    } else {
      selectedChar = char;
      selectedCells = this.getSelectedCharCells(char);
      if (!selectedCells) {
        selectedChar = undefined;
      }
    }
    this.setState({ selectedChar, selectedCells });
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

  handleAction(cell) {
    const charInd = this.state.characters.indexOf(this.state.selectedChar);
    const positionInd = this.matrixIndexOf(cell);

    if (!this.isNewPosValid(positionInd)) {
      this.setState({ selectedChar: undefined, selectedCells: [] });
      return;
    }

    const { characters } = { ...this.state };
    characters[charInd] = { ...this.state.selectedChar };
    characters[charInd].topLeftRow = positionInd.row;
    characters[charInd].topLeftCol = positionInd.col;
    this.setState({ characters, selectedChar: undefined, selectedCells: [] });
  }

  isNewPosValid(newPositionInd) {
    let selectedCharCopy = CloneDeep(this.state.selectedChar);
    selectedCharCopy.topLeftRow = newPositionInd.row;
    selectedCharCopy.topLeftCol = newPositionInd.col;
    return this.getSelectedCharCells(selectedCharCopy).length > 0;
  }

  changeCellsState(cells, selected) {
    let { selectedCells, selectedChar } = { ...this.state };
    if (selected) {
      selectedCells.push(cells[0]);
    } else {
      selectedCells = [];
      selectedChar = undefined;
    }
    this.setState({ selectedCells, selectedChar });
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

  render() {
    const { matrix, selectedCells, characters } = this.state;
    const { cellSize, borderWidth } = this.props;

    return (
      <div>
        <div>
          {matrix.map((row, i) => (
            <div key={i}>
              {row.map((cell, j) => (
                <MapCell
                  key={j}
                  selected={selectedCells.includes(cell)}
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
              position={this.calcCharPosition(char)}
              onClick={this.handleCharClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default BoardMap;
