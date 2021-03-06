import React, { Component } from "react";
import { CURSOR_IMAGES } from "../constants";
import "./SpellCircle.scss";

class SpellCircle extends Component {
  getDynamicStyle() {
    const {
      position,
      itemDeletionModeOn,
      borderWidth,
      clickable,
      selected,
    } = this.props;
    const { color } = this.props.spellCircle;
    const transparentColor = `rgb(${color.r}, ${color.g}, ${color.b}, 0.5)`;
    let borderStyle = null;
    if (itemDeletionModeOn || selected) {
      borderStyle = `solid rgb(255, 0, 0, 1) ${borderWidth + 1}px`;
    }
    return {
      top: position.row,
      left: position.col,
      height: position.radius * 2,
      width: position.radius * 2,
      background: transparentColor,
      borderRadius: position.radius,
      cursor: itemDeletionModeOn
        ? `url(${CURSOR_IMAGES.delete}), pointer`
        : clickable
        ? `url(${CURSOR_IMAGES.pointer}), pointer`
        : `url(${CURSOR_IMAGES.move}), move`,
      border: borderStyle,
      pointerEvents: clickable ? "auto" : "none",
    };
  }

  render() {
    const { spellCircle, onClick } = this.props;
    if (!spellCircle) {
      return "";
    }

    const charTitle = `${spellCircle.name}${
      spellCircle.owner ? `. Owner: ${spellCircle.owner}` : null
    }`;

    return (
      <div
        className="SpellCircle"
        style={this.getDynamicStyle()}
        onClick={() => onClick(spellCircle)}
        title={charTitle}
      />
    );
  }
}

export default SpellCircle;
