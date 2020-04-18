import React, { Component } from "react";
import "./MapCell.scss";

class MapCell extends Component {
  getDynamicStyle() {
    const { borderWidth, cell, cursorHover, cellSize } = this.props;
    const background = `rgba(0, 0, 0, 0${cell.wall ? ".4" : ""})`;
    return {
      width: cellSize,
      height: cellSize,
      borderWidth: `${borderWidth}px`,
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
        style={this.getDynamicStyle()}
        onClick={() => onClick(cell)}
        onMouseEnter={() => onMouseEnterCell(cell)}
      />
    );
  }
}

export default MapCell;
