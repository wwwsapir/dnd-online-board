import React, { Component } from "react";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./loginForm";
import UserMenu from "./userMenu";
import PasswordResetForm from "./passwordResetForm";
import RegistrationForm from "./registrationForm";

class WelcomeScreen extends Component {
  state = {
    authToken: "",
    userName: "",
    forgotPassword: false,
    showRegister: false,
  };

  handleLogOut = () => {
    this.setState({ userName: "", authToken: "" });
  };

  handleLogIn = (userName, authToken) => {
    this.setState({ userName, authToken });
  };

  toggleForgotPassword = () => {
    const { forgotPassword, authToken } = this.state;
    if (!authToken) {
      this.setState({ forgotPassword: !forgotPassword });
    } else {
      console.error("Try to reset password while logged in");
    }
  };

  toggleRegistration = () => {
    const { registration, authToken } = this.state;
    if (!authToken) {
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
    const { authToken, userName, forgotPassword, registration } = this.state;
    const { onNewGame, onContinueSavedGame } = this.props;
    return (
      <div className="LoginScreen">
        <div className="LoginScreenContent">
          {authToken ? (
            <UserMenu
              onContinueSavedGame={() => onContinueSavedGame(authToken)}
              onStartANewGame={() => onNewGame(authToken)}
              onLogOut={this.handleLogOut}
              userName={userName}
              authToken={authToken}
            />
          ) : forgotPassword ? (
            <PasswordResetForm onBackToLoginPage={this.toggleForgotPassword} />
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
