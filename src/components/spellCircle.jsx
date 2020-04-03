import React, { Component } from "react";

class SpellCircle extends Component {
  getStyle() {
    const {
      position,
      cursorHover,
      itemDeletionModeOn,
      borderWidth
    } = this.props;
    const { color } = this.props.spellCircle;
    const transparentColor =
      "rgb(" + color.r + ", " + color.g + ", " + color.b + ", 0.5) ";
    let borderStyle = null;
    if (itemDeletionModeOn) {
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
      cursor: cursorHover,
      border: borderStyle
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
