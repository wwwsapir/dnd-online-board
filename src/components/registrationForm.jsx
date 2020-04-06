import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { SendRequest } from "../constants";

class RegistrationForm extends Component {
  state = {
    userName: "",
    email: "",
    password: "",
    errorMessage: ""
  };

  callLoginAPI(loginData) {
    return SendRequest("/auth/login/", "POST", loginData);
  }

  handleLoginButtonClick = () => {
    const { email, password } = this.state;
    const { onLogin } = this.props;
    const promise = this.callLoginAPI({ email, password });

    promise.then(res => {
      if (!res) return;
      if (res.error) {
        this.setState({ loginErrorMessage: res.error.message });
      } else {
        onLogin(res.userName, res.authToken);
      }
    });
  };

  handleForgotPasswordClick = () => {
    console.log("handleForgotPasswordClick called");
    this.props.onForgotPassword();
  };

  render() {
    const { email, password, errorMessage: loginErrorMessage } = this.state;
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
        {loginErrorMessage ? (
          <li className="nav-item col">
            <h4>
              <span className="badge badge-danger">{loginErrorMessage}</span>
            </h4>
          </li>
        ) : null}
      </ul>
    );
  }
}

export default RegistrationForm;
