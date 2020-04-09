import React, { Component } from "react";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./loginForm";
import UserMenu from "./userMenu";
import ForgotPasswordForm from "./forgotPasswordForm";
import RegistrationForm from "./registrationForm";

class WelcomeScreen extends Component {
  state = {
    userName: "",
    forgotPassword: false,
    showRegister: false,
  };

  handleLogOut = () => {
    this.setState({ userName: "" });
    this.props.onLogOut();
  };

  handleLogIn = (userName, authToken) => {
    this.setState({ userName });
    this.props.onLogIn(authToken);
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
    const { userName, forgotPassword, registration } = this.state;
    const { onNewGame, onContinueSavedGame, authToken } = this.props;
    return (
      <div className="LoginScreen">
        <div className="LoginScreenContent">
          {authToken ? (
            <UserMenu
              onContinueSavedGame={onContinueSavedGame}
              onStartANewGame={onNewGame}
              onLogOut={this.handleLogOut}
              userName={userName}
              authToken={authToken}
            />
          ) : forgotPassword ? (
            <ForgotPasswordForm onBackToLoginPage={this.toggleForgotPassword} />
          ) : registration ? (
            <RegistrationForm
              onRegistered={this.handleRegistered}
              onBackToLoginPage={this.toggleRegistration}
            />
          ) : (
            <LoginForm
              onLogin={this.handleLogIn}
              onForgotPassword={this.toggleForgotPassword}
              onRegistration={this.toggleRegistration}
            />
          )}
        </div>
      </div>
    );
  }
}

export default WelcomeScreen;
