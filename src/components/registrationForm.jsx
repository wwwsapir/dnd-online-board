import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CallRegisterAPI } from "../apiUtils";
import { Redirect, Link } from "react-router-dom";

class RegistrationForm extends Component {
  state = {
    userName: "",
    email: "",
    password: "",
    errorMessage: "",
    toLogin: false,
  };

  handleRegisterFormSubmit = (e) => {
    e.preventDefault();
    const { userName, email, password } = this.state;
    const { onRegistered } = this.props;
    const promise = CallRegisterAPI({ userName, email, password });

    promise.then((res) => {
      if (!res) return;
      if (res.status !== 200) {
        this.setState({ errorMessage: res.body.error.message });
      } else {
        this.setState({ toLogin: true });
        onRegistered();
      }
    });
  };

  render() {
    const { userName, email, password, errorMessage, toLogin } = this.state;

    if (toLogin) {
      return <Redirect push to="/home/login" />;
    }

    return (
      <form onSubmit={this.handleRegisterFormSubmit}>
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
              onChange={(event) =>
                this.setState({ userName: event.target.value })
              }
            />
          </li>
          <li className="nav-item">
            <input
              className="input-group-sm form-control col mt-3"
              id="email"
              value={email}
              placeholder="Email Address"
              required
              onChange={(event) => this.setState({ email: event.target.value })}
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
              onChange={(event) =>
                this.setState({ password: event.target.value })
              }
            />
          </li>
          <li className="nav-item">
            <button
              type="submit"
              className="btn btn-primary form-control mt-3 col"
            >
              Register
            </button>
          </li>
          <li className="nav-item mt-2">
            <Link className="float-right" to="/home/login">
              Cancel and back to login
            </Link>
          </li>
          {errorMessage ? (
            <li className="nav-item col">
              <h4>
                <span className="badge badge-danger">{errorMessage}</span>
              </h4>
            </li>
          ) : null}
        </ul>
      </form>
    );
  }
}

export default RegistrationForm;
