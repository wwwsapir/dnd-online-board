import React, { Component } from "react";

class MapCell extends Component {
  cellStyle = {
    width: this.props.cellSize,
    height: this.props.cellSize,
    display: "inline-block",
    verticalAlign: "top",
    color: "rgba(255, 255, 255, 1)"
  };

  setCellStyle() {
    let borderStyle = "solid ";
    borderStyle += this.props.selected ? "red" : "black";
    borderStyle += " " + Math.ceil(this.props.cellSize * 0.02) + "px"
    let backgroundStyle = "rgba(0, 0, 0, ";
    backgroundStyle += this.props.cell.wall ? "0.4)" : "0)";
    let cellStyle = { ...this.cellStyle };
    cellStyle.border = borderStyle;
    cellStyle.background = backgroundStyle;
    this.cellStyle = cellStyle;
  }

  render() {
    this.setCellStyle();
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
