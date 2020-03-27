import React, { Component } from "react";
import MapCell from "./mapCell";

class BoardMap extends Component {
  row = [{ cellInd: 0 }, { cellInd: 1 }, { cellInd: 2 }];

  state = {
    matrix: this.createMatrix(this.props.rowCount, this.props.colCount),
    cellSize: 80
  };

  createMatrix(rowCount, colCount) {
    let myarr = [];
    for (let i = 0; i < rowCount; i++) {
      let row = [];
      for (let j = 0; j < colCount; j++) {
        let col = { selected: false, character: null };
        row.push(col);
      }
      myarr.push(row);
    }
    return myarr;
  }

  //   handleSubmit(){
  //     this.setState({
  //       array1: this.createarray1(this.props.rowCount, this.props.colCount)
  //     });
  //   }

  render() {
    const { matrix, cellSize } = this.state;

    return (
      <div>
        {matrix.map((row, i) => (
          <div key={i}>
            {row.map((col, j) => (
              <MapCell
                key={j}
                cellSize={cellSize}
                selected={matrix[i][j].selected}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default BoardMap;
