import React, { Component } from "react";
import "./mapCell.css";

class MapCell extends Component {
  getCellStyle() {
    const { borderWidth, cell, cursorHover, cellSize } = this.props;
    let border = "solid black ";
    border += borderWidth + "px";
    let background = "rgba(0, 0, 0, ";
    background += cell.wall ? "0.4)" : "0)";
    return {
      width: cellSize,
      height: cellSize,
      border,
      background,
      cursor: cursorHover
    };
  }

  render() {
    if (this.props.selected) {
    }
    const { onClick, cell } = this.props;
    return (
      <div
        className="CellStyle"
        style={this.getCellStyle()}
        onClick={() => onClick(cell)}
      />
    );
  }
}

export default MapCell;
