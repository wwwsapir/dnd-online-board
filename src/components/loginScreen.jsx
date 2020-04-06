import React, { Component } from "react";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./loginForm";
import UserMenu from "./userMenu";
import PasswordResetForm from "./passwordResetForm";

class LoginScreen extends Component {
  state = {
    authToken: "",
    userName: "",
    forgotPassword: false,
    showRegister: false
  };

  logOut = () => {
    this.setState({ userName: "", authToken: "", loggedIn: false });
  };

  logIn = (userName, authToken) => {
    this.setState({ userName, authToken, loggedIn: true });
  };

  handleContinueLastGame = () => {
    console.log("handleContinueLastGame called");
    this.props.closePopup();
  };

  handleStartANewGame = () => {
    console.log("handleStartANewGame called");
    this.props.closePopup();
  };

  toggleForgotPassword = () => {
    const { forgotPassword, authToken: loginToken } = this.state;
    if (!loginToken) {
      this.setState({ forgotPassword: !forgotPassword });
    } else {
      console.error("Try to reset password while logged in");
    }
  };

  render() {
    const { authToken: loginToken, userName, forgotPassword } = this.state;
    return (
      <div className="LoginScreen">
        <div className="LoginScreenContent">
          {loginToken ? (
            <UserMenu
              onContinueLastGame={this.handleContinueLastGame}
              onStartANewGame={this.handleStartANewGame}
              onLogOut={this.logOut}
              userName={userName}
            />
          ) : forgotPassword ? (
            <PasswordResetForm onBackToLoginPage={this.toggleForgotPassword} />
          ) : (
            <LoginForm
              onLogin={this.logIn}
              onForgotPassword={this.toggleForgotPassword}
            />
          )}
        </div>
      </div>
    );
  }
}

export default LoginScreen;
