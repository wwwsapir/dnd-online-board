import React, { Component } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

class CharacterCreator extends Component {
  state = {
    characterName: "",
    height: 1,
    width: 1,
    type: undefined,
    avater: ""
  };

  render() {
    const { boardRowCount, boardColCount, onCreation } = this.props;
    const { characterName, height, width, avater } = this.state;
    return (
      <ul
        className="nav nav-tabs flex-column text-white bg-dark col"
        style={{ border: "8px double blue", textAlign: "center", fontSize: 15 }}
      >
        <h4>Add a new character to the board</h4>
        <li className="nav-item">
          <label className="mr-1">Character name: </label>
          <input
            className="input-group-sm m-2"
            value={characterName}
            onChange={event =>
              this.setState({ characterName: event.target.value })
            }
          />
        </li>
        <li className="nav-item">
          <label className="mr-1">Width in squares: </label>
          <input
            className="input-group-sm m-2"
            type="number"
            step={1}
            min={1}
            max={boardColCount}
            value={width}
            onChange={event =>
              this.setState({ width: event.target.value.replace(/\D/, "") })
            }
          />
        </li>
        <li className="nav-item">
          <label className="mr-1">Height in squares: </label>
          <input
            className="input-group-sm m-2"
            type="number"
            step={1}
            min={1}
            max={boardRowCount}
            value={height}
            onChange={event =>
              this.setState({ height: event.target.value.replace(/\D/, "") })
            }
          />
        </li>
        <li className="nav-item">
          <label className="mr-3">Character type:</label>
          <input
            className="input-group-sm"
            type="radio"
            name="CharType"
            value="Player"
            onChange={event => this.setState({ type: event.target.value })}
          />
          <label className="ml-1 mr-3">Player</label>
          <input
            className="input-group-sm"
            type="radio"
            name="CharType"
            value="Enemy"
            onChange={event => this.setState({ type: event.target.value })}
          />
          <label className="ml-1 mr-3"> Enemy</label>
          <input
            className="input-group-sm"
            type="radio"
            name="CharType"
            value="Ally"
            onChange={event => this.setState({ type: event.target.value })}
          />
          <label className="ml-1 mr-3"> Ally</label>
        </li>
        <li className="nav-item">
          <label className="mr-1">Avatar: </label>
          <input
            className="input-group-sm m-2"
            type="file"
            value={avater}
            onChange={event => this.setState({ avater: event.target.value })}
          />
        </li>
        <li className="nav-item">
          <button
            onClick={onCreation}
            style={{ "}float": "center" }}
            className="btn btn-primary m-2"
          >
            Create!
          </button>
        </li>
      </ul>
    );
  }
}

export default CharacterCreator;
