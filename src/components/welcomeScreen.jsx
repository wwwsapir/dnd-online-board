import React, { Component } from "react";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./loginForm";
import UserMenu from "./userMenu";
import ForgotPasswordForm from "./forgotPasswordForm";
import RegistrationForm from "./registrationForm";
import { Route, Redirect, Switch } from "react-router-dom";
import { CallGetGameDataAPI } from "../apiUtils";

class WelcomeScreen extends Component {
  state = {
    gameDataExists: false,
  };

  handleLogIn = (userName, authToken) => {
    this.props.onLogIn(userName, authToken);
    this.checkForExistingGameData();
  };

  checkForExistingGameData = () => {
    const promise = CallGetGameDataAPI(this.props.authToken);
    promise.then((res) => {
      if (!res) return;
      this.setState({ gameDataExists: !res.error });
    });
  };

  render() {
    const {
      onNewGame,
      onContinueSavedGame,
      authToken,
      userName,
      onRegisteredNewUser,
      onLogOut,
      cancelRedirectFromMap
    } = this.props;

    return (
      <div className="LoginScreen">
        <div className="LoginScreenContent">
          <Switch>
            <Redirect
              exact
              from="/home"
              to={authToken ? "/home/userMenu" : "/home/login"}
            />
            <Route path="/home/userMenu">
              <UserMenu
                onContinueSavedGame={onContinueSavedGame}
                onStartANewGame={onNewGame}
                onLogOut={onLogOut}
                userName={userName}
                authToken={authToken}
                gameDataExists={this.state.gameDataExists}
                checkGameDataExists={this.checkForExistingGameData}
                cancelRedirectFromMap={cancelRedirectFromMap}
              />
            </Route>
            <Route path="/home/forgotPassword">
              <ForgotPasswordForm />
            </Route>
            <Route path="/home/register">
              <RegistrationForm onRegistered={onRegisteredNewUser} />
            </Route>
            <Route path="/home/login">
              <LoginForm onLogin={this.handleLogIn} />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default WelcomeScreen;
