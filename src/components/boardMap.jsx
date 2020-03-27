import React, { Component } from "react";
import MapCell from "./mapCell";

class BoardMap extends Component {
  row = [{ cellInd: 0 }, { cellInd: 1 }, { cellInd: 2 }];

  state = {
    matrix: this.createMatrix(this.props.rowCount, this.props.colCount),
    cellSize: this.props.cellSize,
    selectedCell: undefined
  };

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

  render() {
    const { matrix, cellSize, selectedCell } = this.state;

    return (
      <div>
        {matrix.map((row, i) => (
          <div key={i}>
            {row.map((col, j) => (
              <MapCell
                key={j}
                selected={matrix[i][j] === selectedCell}
                cell={matrix[i][j]}
                cellSize={cellSize}
                onClick={this.handleCellClick}
                borderWidth={this.props.borderWidth}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default BoardMap;
