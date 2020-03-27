import React, { Component } from "react";

class MapCell extends Component {
  cellStyle = {
    width: this.props.cellSize,
    height: this.props.cellSize,
    border: "3px solid ",
    display: "inline-block",
    verticalAlign: "top"
  };

  setBorderColor() {
    console.log(this.props.selected);
    let borderColor = this.props.selected ? "red" : "black";
    this.cellStyle.border += borderColor;
  }

  constructor(props) {
    super(props);
    this.setBorderColor();
  }

  render() {
    return <div style={this.cellStyle}>{this.props.children}</div>;
  }
}

export default MapCell;
