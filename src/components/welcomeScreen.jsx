import React, { Component } from "react";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./loginForm";
import UserMenu from "./userMenu";
import ForgotPasswordForm from "./forgotPasswordForm";
import RegistrationForm from "./registrationForm";
import { Route, Redirect, Switch } from "react-router-dom";

class WelcomeScreen extends Component {
  render() {
    const {
      onNewGame,
      onContinueSavedGame,
      authToken,
      userName,
      onRegisteredNewUser,
      onLogOut,
      cancelRedirectFromMap,
      onLogIn,
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
              <LoginForm onLogin={onLogIn} />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default WelcomeScreen;
