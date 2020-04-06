import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class UserMenu extends Component {
  handleContinueGameClick = () => {
    console.log("handleContinueGameClick called");
    this.props.onContinueLastGame();
  };

  handleStartANewGameClick = () => {
    console.log("handleStartANewGameClick called");
    this.props.onStartANewGame();
  };

  handleLogOutClick = () => {
    this.props.onLogOut();
  };

  render() {
    const { userName } = this.props;
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
          >
            Continue Game
          </button>
        </li>
        <li className="nav-item">
          <button
            onClick={this.handleStartANewGameClick}
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
