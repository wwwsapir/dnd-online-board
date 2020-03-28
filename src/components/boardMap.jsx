import React, { Component } from "react";
import MapCell from "./mapCell";
import Character from "./character";

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
    let { selectedChar, selectedCells } = this.state;
    let newState = { ...this.state };
    if (selectedChar || selectedCells.length > 0) {
      newState.selectedChar = undefined;
      newState.selectedCells = [];
    } else {
      newState.selectedChar = char;
      newState.selectedCells = this.getSelectedCharCells(char);
    }
    this.setState(newState);
  };

  getSelectedCharCells(char) {
    let selectedCells = [];
    const { matrix } = this.state;
    for (
      let row = char.topLeftInd.row;
      row < char.widthCells + char.topLeftInd.row;
      row++
    ) {
      for (
        let col = char.topLeftInd.col;
        col < char.heightCells + char.topLeftInd.col;
        col++
      ) {
        selectedCells.push(matrix[row][col]);
      }
    }
    return selectedCells;
  }

  handleAction(cell) {
    console.log("Taking action!", cell);
  }

  changeCellsState(cells, selected) {
    let newState = { ...this.state };
    if (selected) {
      newState.selectedCells.push(cells[0]);
    } else {
      newState.selectedCells = [];
      newState.selectedChar = undefined;
    }
    this.setState(newState);
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
        row: char.topLeftInd.row * (cellSize + borderWidth * 2) + borderWidth,
        col: char.topLeftInd.col * (cellSize + borderWidth * 2) + borderWidth
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
