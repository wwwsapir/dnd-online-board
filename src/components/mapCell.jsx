import React, { Component } from "react";
import "./mapCell.css";

class MapCell extends Component {
  style = {
    width: this.props.cellSize,
    height: this.props.cellSize
  };

  getCellStyle() {
    const { borderWidth, cell, cursorHover } = this.props;
    let borderStyle = "solid black ";
    borderStyle += borderWidth + "px";
    let backgroundStyle = "rgba(0, 0, 0, ";
    backgroundStyle += cell.wall ? "0.4)" : "0)";
    let cellStyle = { ...this.style };
    cellStyle.border = borderStyle;
    cellStyle.background = backgroundStyle;
    cellStyle.cursor = cursorHover;
    return cellStyle;
  }

  render() {
    console.log("cell cursor", this.props.cursorHover);
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
