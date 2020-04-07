import React, { Component } from "react";

class Character extends Component {
  getStyle() {
    const {
      selected,
      position,
      borderWidth,
      transparent,
      itemDeletionModeOn,
      clickable,
    } = this.props;
    let borderStyle = selected || itemDeletionModeOn ? "solid red" : "none";
    borderStyle += " " + borderWidth + "px";
    const opacity = transparent ? 0.45 : 1;
    return {
      width: position.width,
      height: position.height,
      position: "absolute",
      top: position.topLeft.row,
      left: position.topLeft.col,
      border: borderStyle,
      cursor: clickable ? "pointer" : "move",
      opacity,
      pointerEvents: clickable ? "auto" : "none",
    };
  }

  render() {
    const { character, onClick } = this.props;
    if (!character) {
      return "";
    }
    const { image } = this.props.character;
    const imageSrc = image.url ? image.url : image.file;

    return (
      <img
        src={imageSrc}
        alt={character.name}
        style={this.getStyle()}
        onClick={() => onClick(character)}
        title={character.name}
      />
    );
  }
}

export default Character;
