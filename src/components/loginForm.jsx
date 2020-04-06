import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_URL } from "../constants";

class LoginForm extends Component {
  state = {
    userName: "",
    email: "",
    password: "",
    isUserNameValid: true,
    missingData: false,
    loginData: null
  };

  callLoginAPI() {
    const { userName } = this.state;
    fetch(API_URL + "login/" + userName)
      .then(res => res.text())
      .then(res => console.log(res));
  }

  handleLoginButtonClick = () => {
    const { userName, password } = this.state;
    const { onLogin } = this.props;
    this.callLoginAPI();
    return;
    this.setState({ isUserNameValid: true, missingData: false }); // initiate errors
    if (!userName || !password) {
      this.setState({ missingData: true });
    } else {
      onLogin(userName);
    }
  };

  handleForgotPasswordClick = () => {
    console.log("handleForgotPasswordClick called");
    this.props.onForgotPassword();
  };

  render() {
    const { email, password, isUserNameValid, missingData } = this.state;
    return (
      <ul
        className="nav nav-tabs flex-column text-white bg-dark row w-100"
        style={{ border: "8px double blue", fontSize: 15, padding: 20 }}
      >
        <h4 className="col mb-5">
          <span className="creatorHeader">Welcome to D&amp;D Online Map</span>
        </h4>
        <li className="nav-item">
          <input
            className="input-group-sm form-control col"
            id="email"
            value={email}
            placeholder="Email Address"
            required
            onChange={event => this.setState({ email: event.target.value })}
          />
        </li>
        <li className="nav-item">
          <input
            className="input-group-sm form-control col mt-3"
            type="password"
            id="password"
            value={password}
            placeholder="Password"
            required
            onChange={event => this.setState({ password: event.target.value })}
          />
        </li>
        <li className="nav-item">
          <button
            onClick={this.handleLoginButtonClick}
            className="btn btn-primary form-control mt-3 col"
          >
            Login
          </button>
        </li>
        <li className="nav-item mt-2">
          <a
            className="float-right"
            href="#"
            onClick={this.handleForgotPasswordClick}
          >
            forgot password?
          </a>
        </li>
        {isUserNameValid ? null : (
          <li className="nav-item col">
            <h4>
              <span className="badge badge-danger">
                User name already exists
              </span>
            </h4>
          </li>
        )}
        {missingData ? (
          <li className="nav-item col">
            <h4>
              <span className="badge badge-danger">
                User name and password are required
              </span>
            </h4>
          </li>
        ) : null}
      </ul>
    );
  }
}

export default LoginForm;
