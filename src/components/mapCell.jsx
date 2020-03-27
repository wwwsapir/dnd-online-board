import React, { Component } from "react";

class MapCell extends Component {
  cellStyle = {
    width: this.props.cellSize,
    height: this.props.cellSize,
    display: "inline-block",
    verticalAlign: "top",
    color: "rgba(255, 255, 255, 1)"
  };

  setCellColor() {
    let borderStyle = "3px solid ";
    borderStyle += this.props.selected ? "red" : "black";
    let backgroundStyle = "rgba(0, 0, 0, ";
    backgroundStyle += this.props.cell.wall ? "0.2)" : "0)";
    let cellStyle = { ...this.cellStyle };
    cellStyle.border = borderStyle;
    cellStyle.background = backgroundStyle;
    this.cellStyle = cellStyle;
  }

  render() {
    this.setCellColor();
    if (this.props.selected) {
    }
    const { onClick, cell, children } = this.props;
    return (
      <div style={this.cellStyle} onClick={() => onClick(cell)}>
        {children}
      </div>
    );
  }
}

export default MapCell;
