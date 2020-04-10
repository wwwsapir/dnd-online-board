import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CallGetGameDataAPI } from "../apiUtils";
import { Redirect } from "react-router-dom";

class UserMenu extends Component {
  state = {
    toLogin: false,
    toMap: false,
  };

  componentWillMount() {
    this.props.checkGameDataExists();
  }

  handleLogOutClick = () => {
    this.setState({ toLogin: true });
    this.props.onLogOut();
  };

  handleStartNewGameButtonClick = () => {
    if (this.state.gameDataExists) {
      this.setState({ showWarning: true });
    } else {
      this.beginNewGame();
    }
  };

  beginNewGame() {
    this.setState({ toMap: true });
    this.props.onStartANewGame();
  }

  handleContinueGameClick = () => {
    this.setState({ toMap: true });
    this.props.onContinueSavedGame();
  };

  render() {
    const { userName, gameDataExists } = this.props;
    const { showWarning, toLogin, toMap } = this.state;

    if (toLogin) {
      return <Redirect push to="/home/login" />;
    } else if (toMap) {
      return <Redirect push to="/map" />;
    }

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
            onClick={this.handleContinueGameClick}
            className="btn btn-primary form-control mt-3 col"
            disabled={!gameDataExists}
          >
            Continue Game
          </button>
        </li>
        <li className="nav-item">
          <button
            onClick={this.handleStartNewGameButtonClick}
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
        {showWarning ? (
          <span>
            <li className="nav-item mt-2">
              <h6>
                Starting a new game will erase the last saved game, continue?
              </h6>
            </li>
            <span className="inline-form">
              <button
                onClick={this.beginNewGame}
                className="btn btn-danger form-control ml-3 mt-3 col-7 d-inline"
              >
                Yes - Delete my saved game
              </button>
              <button
                onClick={() => this.setState({ showWarning: false })}
                className="btn btn-primary form-control ml-2 mt-3 col-4 d-inline"
              >
                No - Keep my saved game
              </button>
            </span>
          </span>
        ) : null}
      </ul>
    );
  }
}

export default UserMenu;
