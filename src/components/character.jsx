import React, { Component } from "react";

class Character extends Component {
  style = {
    width: this.props.position.width,
    height: this.props.position.height,
    position: "absolute",
    top: this.props.position.topLeft.row,
    left: this.props.position.topLeft.col,
  };

  render() {
    if (this.props.character === undefined) {
      return "";
    }
    const { character } = this.props;
    console.log(character.imgSrc);
    return <img src={character.imgSrc} alt={character.name} style={this.style} />;
  }
}

export default Character;
