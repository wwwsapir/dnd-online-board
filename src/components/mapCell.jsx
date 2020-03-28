import React, { Component } from "react";
import "./mapCell.css";

class MapCell extends Component {
  style = {
    width: this.props.cellSize,
    height: this.props.cellSize
  };

  setCellStyle() {
    let borderStyle = "solid ";
    borderStyle += this.props.selected ? "red" : "black";
    borderStyle += " " + this.props.borderWidth + "px";
    let backgroundStyle = "rgba(0, 0, 0, ";
    backgroundStyle += this.props.cell.wall ? "0.4)" : "0)";
    let cellStyle = { ...this.style };
    cellStyle.border = borderStyle;
    cellStyle.background = backgroundStyle;
    this.style = cellStyle;
  }

  render() {
    this.setCellStyle();
    if (this.props.selected) {
    }
    const { onClick, cell, children } = this.props;
    return (
      <div
        className="CellStyle"
        style={this.style}
        onClick={() => onClick(cell)}
      >
        {children}
      </div>
    );
  }
}

export default MapCell;
