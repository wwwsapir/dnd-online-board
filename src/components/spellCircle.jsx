import React, { Component } from "react";

class SpellCircle extends Component {
  getStyle() {
    const {
      position,
      itemDeletionModeOn,
      borderWidth,
      clickable,
      selected
    } = this.props;
    const { color } = this.props.spellCircle;
    const transparentColor =
      "rgb(" + color.r + ", " + color.g + ", " + color.b + ", 0.5) ";
    let borderStyle = null;
    if (itemDeletionModeOn || selected) {
      borderStyle = "solid rgb(255, 0, 0, 1) " + (borderWidth + 1) + "px";
    }
    return {
      position: "absolute",
      top: position.row,
      left: position.col,
      height: position.radius * 2,
      width: position.radius * 2,
      background: transparentColor,
      borderRadius: position.radius,
      cursor: clickable ? "pointer" : "move",
      border: borderStyle,
      pointerEvents: clickable ? "auto" : "none"
    };
  }

  render() {
    const { spellCircle, onClick, position, cursorHover } = this.props;
    if (!spellCircle) {
      return "";
    }

    return (
      <div
        style={this.getStyle()}
        onClick={() => onClick(spellCircle)}
        title={spellCircle.name}
      />
    );
  }
}

export default SpellCircle;
