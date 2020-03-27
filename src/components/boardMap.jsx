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
        let col = "1";
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

  drawMatrix() {
    let matStr = "";
    const { matrix } = this.state;
    const { rowCount, colCount } = this.props;
    for (let row = 0; row < rowCount; row++) {
      matStr += "<div>";
      for (let col = 0; col < colCount; col++) {
        matStr += <MapCell cellSize={80} />;
      }
      matStr += "</div>";
    }
    return matStr;
  }

  //   render() {
  //     const Matrix = this.drawMatrix();
  //     return <div>{Matrix}</div>;
  //   }

  render() {
    const { matrix, cellSize } = this.state;

    return (
      <div>
        {matrix.map((row, i) => (
          <div key={i}>
            {row.map((col, j) => (
                <MapCell key={j} cellSize={cellSize} />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default BoardMap;
