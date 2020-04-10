import React, { Component } from "react";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./loginForm";
import UserMenu from "./userMenu";
import ForgotPasswordForm from "./forgotPasswordForm";
import RegistrationForm from "./registrationForm";
import { Route } from "react-router-dom";

class WelcomeScreen extends Component {
  state = {
    forgotPassword: false,
    showRegister: false,
  };

  handleLogOut = () => {
    this.props.onLogOut();
  };

  handleLogIn = (userName, authToken) => {
    this.props.onLogIn(userName, authToken);
  };

  toggleForgotPassword = () => {
    const { forgotPassword } = this.state;
    if (!this.props.authToken) {
      this.setState({ forgotPassword: !forgotPassword });
    } else {
      console.error("Try to reset password while logged in");
    }
  };

  toggleRegistration = () => {
    const { registration } = this.state;
    if (!this.props.authToken) {
      this.setState({ registration: !registration });
    } else {
      console.error("Try to cancel registration while already logged in");
    }
  };

  handleRegistered = () => {
    this.props.onRegisteredNewUser();
    this.toggleRegistration();
  };

  render() {
    const { forgotPassword, registration } = this.state;
    const { onNewGame, onContinueSavedGame, authToken, userName } = this.props;
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
            component={() => (
              <ForgotPasswordForm
                onBackToLoginPage={this.toggleForgotPassword}
              />
            )}
          />
          <Route
            path="/menu/register"
            component={() => (
              <RegistrationForm
                onRegistered={this.handleRegistered}
                onBackToLoginPage={this.toggleRegistration}
              />
            )}
          />
          <Route
            path="/menu/login"
            component={() => (
              <LoginForm
                onLogin={this.handleLogIn}
                onForgotPassword={this.toggleForgotPassword}
                onRegistration={this.toggleRegistration}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default WelcomeScreen;
