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

  callRegisterAPI(userData) {
    return SendRequest("/auth/register/", "POST", userData);
  }

  handleRegisterButtonClick = () => {
    const { userName, email, password } = this.state;
    const { onRegistered } = this.props;
    const promise = this.callRegisterAPI({ userName, email, password });

    promise.then(res => {
      console.log(res);
      if (!res) return;
      if (res.error) {
        this.setState({ errorMessage: res.error.message });
      } else {
        onRegistered(res.userName, res.authToken);
      }
    });
  };

  render() {
    const { userName, email, password, errorMessage } = this.state;
    const { onBackToLoginPage } = this.props;
    return (
      <ul
        className="nav nav-tabs flex-column text-white bg-dark row w-100"
        style={{ border: "8px double blue", fontSize: 15, padding: 20 }}
      >
        <h4 className="col mb-5">
          <span className="creatorHeader">New User Registration</span>
        </h4>
        <li className="nav-item">
          <input
            className="input-group-sm form-control col"
            id="userName"
            value={userName}
            placeholder="User Name"
            required
            onChange={event => this.setState({ userName: event.target.value })}
          />
        </li>
        <li className="nav-item">
          <input
            className="input-group-sm form-control col mt-3"
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
            onClick={this.handleRegisterButtonClick}
            className="btn btn-primary form-control mt-3 col"
          >
            Register
          </button>
        </li>
        <li className="nav-item mt-2">
          <a className="float-right" href="#" onClick={onBackToLoginPage}>
            Cancel and back to login
          </a>
        </li>
        {errorMessage ? (
          <li className="nav-item col">
            <h4>
              <span className="badge badge-danger">{errorMessage}</span>
            </h4>
          </li>
        ) : null}
      </ul>
    );
  }
}

export default RegistrationForm;
