import React, { Component } from "react";

class Character extends Component {
  getStyle() {
    const {
      selected,
      position,
      borderWidth,
      cursorHover,
      transparent,
      itemDeletionModeOn
    } = this.props;
    let borderStyle = selected || itemDeletionModeOn ? "solid red" : "none";
    borderStyle += " " + borderWidth + "px";
    const opacity = transparent ? 0.4 : 1;
    return {
      width: position.width,
      height: position.height,
      position: "absolute",
      top: position.topLeft.row,
      left: position.topLeft.col,
      border: borderStyle,
      cursor: cursorHover,
      opacity
    };
  }

  onMouseHover() {}

  render() {
    if (!this.props.character) {
      return "";
    }
    const { character, onClick } = this.props;
    return (
      <img
        src={character.imgSrc}
        alt={character.name}
        style={this.getStyle()}
        onClick={() => onClick(character)}
        title={character.name}
      />
    );
  }
}

export default Character;
