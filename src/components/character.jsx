import React, { Component } from "react";

class Character extends Component {
  getStyle() {
    const { selected, position, borderWidth } = this.props;
    let borderStyle = selected ? "solid red" : "none"
    borderStyle += " " + borderWidth + "px";
    const borderChange = selected ? borderWidth : 0;
    return {
      width: position.width,
      height: position.height,
      position: "absolute",
      top: position.topLeft.row - borderChange,
      left: position.topLeft.col - borderChange,
      border: borderStyle
    };
  }

  render() {
    if (this.props.character === undefined) {
      return "";
    }
    const { character } = this.props;
    return (
      <img
        src={character.imgSrc}
        alt={character.name}
        style={this.getStyle()}
        onClick={() => this.props.onClick(character)}
      />
    );
  }
}

export default Character;