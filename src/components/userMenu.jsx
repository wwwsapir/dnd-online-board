import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CallGetGameDataAPI } from "../constants";

class UserMenu extends Component {
  state = {
    gameDataExists: false,
  };

  componentWillMount() {
    this.isGameDataExistsForUser();
  }

  isGameDataExistsForUser() {
    const promise = CallGetGameDataAPI(this.props.authToken);
    promise.then((res) => {
      if (!res) return;
      this.setState({ gameDataExists: !res.error });
    });
  }

  handleLogOutClick = () => {
    this.props.onLogOut();
  };

  render() {
    const { userName, onContinueSavedGame, onStartANewGame } = this.props;
    const { gameDataExists } = this.state;
    return (
      <ul
        className="nav nav-tabs flex-column text-white bg-dark row w-100"
        style={{ border: "8px double blue", fontSize: 15, padding: 20 }}
      >
        <h4 className="col mb-4">
          <span className="creatorHeader">Hi, {userName}! Ready to play?</span>
        </h4>
        <li className="nav-item">
          <button
            onClick={onContinueSavedGame}
            className="btn btn-primary form-control mt-3 col"
            disabled={!gameDataExists}
          >
            Continue Game
          </button>
        </li>
        <li className="nav-item">
          <button
            onClick={onStartANewGame}
            className="btn btn-primary form-control mt-3 col"
          >
            Start a New Game
          </button>
        </li>
        <li className="nav-item mt-2">
          <a className="float-right" href="#" onClick={this.handleLogOutClick}>
            Log Out
          </a>
        </li>
      </ul>
    );
  }
}

export default UserMenu;
