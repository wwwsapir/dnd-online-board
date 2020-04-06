import React, { Component } from "react";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./loginForm";
import UserMenu from "./userMenu";
import PasswordResetForm from "./passwordResetForm";

class LoginScreen extends Component {
  state = {
    loginToken: "",
    userName: "",
    forgotPassword: false
  };
  toggleLogin = userName => {
    this.setState({ userName, loggedIn: !this.state.loggedIn });
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
    const { forgotPassword, loginToken } = this.state;
    if (!loginToken) {
      this.setState({ forgotPassword: !forgotPassword });
    } else {
      console.error("Try to reset password while logged in");
    }
  };

  render() {
    const { loginToken, userName, forgotPassword } = this.state;
    return (
      <div className="LoginScreen">
        <div className="LoginScreenContent">
          {loginToken ? (
            <UserMenu
              onContinueLastGame={this.handleContinueLastGame}
              onStartANewGame={this.handleStartANewGame}
              onLogOut={this.toggleLogin}
              userName={userName}
            />
          ) : null}
          {forgotPassword ? (
            <PasswordResetForm onBackToLoginPage={this.toggleForgotPassword} />
          ) : (
            <LoginForm
              onLogin={this.toggleLogin}
              onForgotPassword={this.toggleForgotPassword}
            />
          )}
        </div>
      </div>
    );
  }
}

export default LoginScreen;
