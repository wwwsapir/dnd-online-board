import React, { Component } from "react";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./loginForm";
import UserArea from "./userArea";

class LoginScreen extends Component {
  state = {
    loggedIn: false,
    userName: ""
  };
  toggleLogin = userName => {
    console.log("toggleLogin called");
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

  render() {
    const { loggedIn, userName } = this.state;
    return (
      <div className="LoginScreen">
        <div className="LoginScreenContent">
          {loggedIn ? (
            <UserArea
              onContinueLastGame={this.handleContinueLastGame}
              onStartANewGame={this.handleStartANewGame}
              onLogOut={this.toggleLogin}
              userName={userName}
            />
          ) : (
            <LoginForm onLogin={this.toggleLogin} />
          )}
        </div>
      </div>
    );
  }
}

export default LoginScreen;
