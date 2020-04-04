import React, { Component } from "react";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./loginForm";

class LoginScreen extends Component {
  handleLoginOpration = stateData => {
    console.log("handleLoginOpration called");
    this.props.closePopup();
  };

  render() {
    return (
      <div className="LoginScreen">
        <div className="LoginScreenContent">
          <LoginForm onLoginOperation={this.handleLoginOpration} />
        </div>
      </div>
    );
  }
}

export default LoginScreen;
