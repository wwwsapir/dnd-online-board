import React, { Component } from "react";

class MapCell extends Component {
  styles = {
    width: this.props.cellSize,
    height: this.props.cellSize,
    border: "3px solid black",
    display:  "inline-block",
    verticalAlign: 'top'
  };

  render() {
    return <div style={this.styles}>{this.props.children}</div>;
  }
}

export default MapCell;
