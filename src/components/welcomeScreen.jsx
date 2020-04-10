import React, { Component } from "react";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./loginForm";
import UserMenu from "./userMenu";
import ForgotPasswordForm from "./forgotPasswordForm";
import RegistrationForm from "./registrationForm";
import { Route, Redirect } from "react-router-dom";

class WelcomeScreen extends Component {
  state = {
    forgotPassword: false,
    showRegister: false,
    loggedIn: this.props.authToken ? true : false,
  };

  handleLogOut = () => {
    this.props.onLogOut();
  };

  handleLogIn = (userName, authToken) => {
    this.props.onLogIn(userName, authToken);
  };

  render() {
    const {
      onNewGame,
      onContinueSavedGame,
      authToken,
      userName,
      onRegisteredNewUser,
    } = this.props;

    return (
      <div className="LoginScreen">
        <div className="LoginScreenContent">
          <Route
            path="/menu/userMenu"
            component={() => (
              <UserMenu
                onContinueSavedGame={onContinueSavedGame}
                onStartANewGame={onNewGame}
                onLogOut={this.handleLogOut}
                userName={userName}
                authToken={authToken}
              />
            )}
          />
          <Route
            path="/menu/forgotPassword"
            component={() => <ForgotPasswordForm />}
          />
          <Route
            path="/menu/register"
            component={() => (
              <RegistrationForm onRegistered={onRegisteredNewUser} />
            )}
          />
          <Route
            path="/menu/login"
            component={() => <LoginForm onLogin={this.handleLogIn} />}
          />
        </div>
      </div>
    );
  }
}

export default WelcomeScreen;
