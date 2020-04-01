import React, { Component } from "react";

class Character extends Component {
  getStyle() {
    const { selected, position, borderWidth } = this.props;
    let borderStyle = selected ? "solid red" : "none"
    borderStyle += " " + borderWidth + "px";
    return {
      width: position.width,
      height: position.height,
      position: "absolute",
      top: position.topLeft.row,
      left: position.topLeft.col,
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