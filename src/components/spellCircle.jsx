import React, { Component } from "react";

class SpellCircle extends Component {
  getStyle() {
    const { position, cursorHover, itemDeletionModeOn } = this.props;
    const { color } = this.props.spellCircle;
    return {
      position: "absolute",
      top: position.row,
      left: position.col,
      height: position.radius * 2,
      width: position.radius * 2,
      background: color,
      borderRadius: position.radius,
      cursor: cursorHover,
      border: itemDeletionModeOn ? "solid rgb(255, 0, 0, 1) 3px" : null
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
