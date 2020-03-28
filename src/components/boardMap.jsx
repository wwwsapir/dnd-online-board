import React, { Component } from "react";
import MapCell from "./mapCell";
import Character from "./character";

class BoardMap extends Component {
  row = [{ cellInd: 0 }, { cellInd: 1 }, { cellInd: 2 }];

  state = {
    matrix: this.createMatrix(this.props.rowCount, this.props.colCount),
    selectedCell: undefined,
    characters: this.props.characters
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
    const { selectedCell } = this.state;
    if (selectedCell) {
      if (cell !== selectedCell && !cell.wall) {
        this.handleAction(cell);
      }
      this.changeCellState(selectedCell, false);
    } else if (!cell.wall) {
      this.changeCellState(cell, true);
    }
  };

  handleAction(cell) {
    console.log("Taking action!", cell);
  }

  changeCellState(cell, selected) {
    let newState = { ...this.state };
    newState.selectedCell = selected ? cell : undefined;
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
    const { matrix, selectedCell, characters } = this.state;
    const { cellSize, borderWidth } = this.props;

    return (
      <div>
        <div>
          {matrix.map((row, i) => (
            <div key={i}>
              {row.map((col, j) => (
                <MapCell
                  key={j}
                  selected={col === selectedCell}
                  cell={col}
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
            />
          ))}
        </div>
      </div>
    );
  }
}

export default BoardMap;
