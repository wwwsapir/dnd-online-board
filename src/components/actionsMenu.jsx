import React, { Component } from "react";
import "./sideBar.css";
import "bootstrap/dist/css/bootstrap.min.css";

class ActionsMenu extends Component {
  render() {
    const { onCharacterCreation, onCircleCreation, onGameSave } = this.props;
    return (
      <ul
        className="nav nav-tabs flex-column text-white bg-dark row w-100"
        style={{ border: "8px double blue", fontSize: 15, padding: 20 }}
      >
        <h4 className="col mb-3">
          <span className="creatorHeader">Actions</span>
        </h4>
        <li className="nav-item col">
          <button
            onClick={onCharacterCreation}
            className="btn btn-primary form-control mt-3"
          >
            Create a New Character
          </button>
        </li>
        <li className="nav-item col">
          <button
            onClick={onCircleCreation}
            className="btn btn-primary form-control mt-3"
          >
            Create a Color Circle
          </button>
        </li>
        <li className="nav-item col">
          <button
            onClick={onGameSave}
            className="btn btn-primary form-control mt-3"
          >
            Save the Game
          </button>
        </li>
      </ul>
    );
  }
}

export default ActionsMenu;