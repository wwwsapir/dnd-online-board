import React, { Component } from "react";
import "./MapCell.scss";

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
      cursor: cursorHover,
    };
  }

  render() {
    if (this.props.selected) {
    }
    const { onClick, cell, onMouseEnterCell } = this.props;
    return (
      <div
        className="MapCell"
        style={this.getCellStyle()}
        onClick={() => onClick(cell)}
        onMouseEnter={() => onMouseEnterCell(cell)}
      />
    );
  }
}

export default MapCell;
