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

  handleContinueLastGameClick = () => {
    console.log("handleContinueLastGameClick called");
  };

  handleStartANewGameClick = () => {
    this.props.onNewGame(this.state.authToken);
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

  render() {
    const { authToken, userName, forgotPassword, registration } = this.state;
    return (
      <div className="LoginScreen">
        <div className="LoginScreenContent">
          {authToken ? (
            <UserMenu
              onContinueLastGame={this.handleContinueLastGameClick}
              onStartANewGame={this.handleStartANewGameClick}
              onLogOut={this.handleLogOut}
              userName={userName}
              authToken={authToken}
            />
          ) : forgotPassword ? (
            <PasswordResetForm onBackToLoginPage={this.toggleForgotPassword} />
          ) : registration ? (
            <RegistrationForm
              onRegistered={this.toggleRegistration}
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