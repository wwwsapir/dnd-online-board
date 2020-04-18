import React, { Component, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect, Link } from "react-router-dom";
import getGameData from "../services/getUserGameData";
import "./GameMenu.scss";

let _gameMenuMounted = false;

class GameMenu extends Component {
  state = {
    toLogin: false,
    toMap: false,
    gameDataExists: false,
    continueGameText: "",
    loading: false,
  };

  componentWillMount() {
    this.props.cancelRedirectFromMap(); // We only want to redirect once from map, without unmounting map compponent (this allows back button press)
  }

  componentDidMount() {
    _gameMenuMounted = true;
    if (this.state && this.props.authToken) {
      this.checkForExistingGameData(this.props.authToken);
    }
  }

  componentWillUnmount() {
    _gameMenuMounted = false;
  }

  componentWillReceiveProps(nextProps) {
    if (_gameMenuMounted) {
      if (this.props.authToken !== nextProps.authToken) {
        this.checkForExistingGameData(nextProps.authToken);
      }
    }
  }

  async checkForExistingGameData(authToken) {
    this.setState({
      continueGameText: "Collecting game data from server...",
      loading: true,
    });
    const res = await getGameData(authToken);
    if (!res || !_gameMenuMounted) return;
    if (res.status !== 200) {
      this.setState({
        continueGameText: "No Saved Game",
        loading: false,
      });
    } else {
      this.setState({
        gameDataExists: true,
        continueGameText: "Continue Last Saved Game",
        loading: false,
      });
    }
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

  beginNewGame = () => {
    this.setState({ toMap: true });
    this.props.onStartANewGame();
  };

  handleContinueGameClick = () => {
    this.setState({ toMap: true });
    this.props.onContinueSavedGame();
  };

  renderGameMenu() {
    const { userName } = this.props;
    const {
      showWarning,
      gameDataExists,
      continueGameText,
      loading,
    } = this.state;
    return (
      <Fragment>
        <h4 className="mb-4">
          <span className="menu-header">Hi, {userName}! Ready to play?</span>
        </h4>
        <li>
          <button
            onClick={this.handleContinueGameClick}
            className="btn btn-primary form-control mt-3"
            disabled={!gameDataExists}
          >
            {continueGameText}
          </button>
        </li>
        <li>
          <button
            onClick={this.handleStartNewGameButtonClick}
            className="btn btn-primary form-control mt-3"
            disabled={loading}
          >
            Start a New Game
          </button>
        </li>
        <li className="mt-2 mb-4">
          <a className="float-right" href="#" onClick={this.handleLogOutClick}>
            Log Out
          </a>
        </li>
        {showWarning ? (
          <span>
            <li className="mt-2">
              <h6>
                Starting a new game will erase the last saved game, continue?
              </h6>
            </li>
            <span className="inline-form row">
              <dev className="col-7 d-inline p-1">
                <button
                  onClick={this.beginNewGame}
                  className="btn btn-danger form-control mt-3"
                >
                  Yes - Delete my saved game
                </button>
              </dev>
              <dev className="col-5 d-inline p-1">
                <button
                  onClick={() => this.setState({ showWarning: false })}
                  className="btn btn-primary form-control mt-3"
                >
                  No - Keep my saved game
                </button>
              </dev>
            </span>
          </span>
        ) : null}
      </Fragment>
    );
  }

  renderNotLoggedInError() {
    return (
      <Fragment>
        <h4 className="mb-4">
          <span className="menu-header">Hey... unknown user!</span>
          <br></br>
          <br></br>
          Oops! You can't see the game menu if you're not logged in :) <br></br>
          Please log in to play.
        </h4>
        <Link to="/home/login">Login Here</Link>
      </Fragment>
    );
  }

  render() {
    const { authToken, isSmallerScreen } = this.props;
    const { toLogin, toMap } = this.state;

    if (toLogin) {
      return <Redirect push to="/home/login" />;
    } else if (toMap) {
      return <Redirect push to="/map" />;
    }

    return (
      <div className="GameMenu-window">
        <ul className={"w-100 menu"}>
          {authToken ? this.renderGameMenu() : this.renderNotLoggedInError()}
        </ul>
      </div>
    );
  }
}

export default GameMenu;
