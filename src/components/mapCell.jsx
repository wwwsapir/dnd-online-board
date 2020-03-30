import React, { Component } from "react";
import "./mapCell.css";

class MapCell extends Component {
  getCellStyle() {
    let borderStyle = "solid black ";
    borderStyle += this.props.borderWidth + "px";
    let backgroundStyle = "rgba(0, 0, 0, ";
    backgroundStyle += this.props.cell.wall ? "0.4)" : "0)";
    return { border: borderStyle, background: backgroundStyle };
  }

  render() {
    console.log("this.style", this.style);
    if (this.props.selected) {
    }
    const { onClick, cell } = this.props;
    return (
      <div
        className="CellStyle col"
        style={this.getCellStyle()}
        onClick={() => onClick(cell)}
      />
    );
  }
}

export default MapCell;
