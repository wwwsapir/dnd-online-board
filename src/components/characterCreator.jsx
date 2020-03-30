import React, { Component } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

class CharacterCreator extends Component {
  styles = {
    creationBar: {
      position: "absolute",
      top: 0,
      right: 0,
      border: "3px black solid"
    }
  };

  render() {
    const { boardRowCount, boardColCount, onCreation } = this.props;
    return (
      //   <div style={this.styles.creationBar}>
      <ul className="nav nav-tabs flex-column">
        <h4>Add a new character to the board</h4>
        <li className="nav-item">
          <label className="mr-1">Character name: </label>
          <input />
        </li>
        <li className="nav-item">
          <label className="mr-1">Width in squares: </label>
          <input type="nubmer" min={1} max={boardColCount} step={1} value={1} />
        </li>
        <li className="nav-item">
          <label className="mr-1">Height in squares: </label>
          <input type="nubmer" min={1} max={boardRowCount} step={1} value={1} />
        </li>
        <li className="nav-item">
          <label className="mr-2" >Character type:</label>
          <input type="radio" name="CharType" value="Player" />
          <label className="ml-1 mr-3">Player</label>
          <input type="radio" name="CharType" value="Enemy" />
          <label className="ml-1 mr-3"> Enemy</label>
          <input type="radio" name="CharType" value="Ally" />
          <label className="ml-1 mr-3"> Ally</label>
        </li>
        <li className="nav-item">
          <label className="mr-1">Avatar: </label>
          <input type="file" />
        </li>
        <li className="nav-item">
          <button onClick={onCreation} style={{ "}float": "center" }}>
            Create!
          </button>
        </li>
      </ul>
    );
  }
}

export default CharacterCreator;
