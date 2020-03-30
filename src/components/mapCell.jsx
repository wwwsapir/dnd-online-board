import React, { Component } from "react";
import "./mapCell.css";

class MapCell extends Component {
  style = {
    width: this.props.cellSize + "%",
    height: "100%"
  };

  setCellStyle() {
    let borderStyle = "solid black ";
    borderStyle += this.props.borderWidth + "px";
    let backgroundStyle = "rgba(0, 0, 0, ";
    backgroundStyle += this.props.cell.wall ? "0.4)" : "0)";
    let cellStyle = { ...this.style };
    cellStyle.border = borderStyle;
    cellStyle.background = backgroundStyle;
    this.style = cellStyle;
  }

  render() {
    console.log("cellSize", this.props.cellSize)
    this.setCellStyle();
    if (this.props.selected) {
    }
    const { onClick, cell } = this.props;
    return (
      <div
        className="CellStyle col"
        style={this.style}
        onClick={() => onClick(cell)}
      />
    );
  }
}

export default MapCell;
