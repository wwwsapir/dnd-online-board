import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CallLoginAPI } from "../apiUtils";
import { Redirect, Link } from "react-router-dom";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: "",
    toGameMenu: false,
  };

  handleLoginFormSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { onLogin } = this.props;
    const promise = CallLoginAPI({ email, password });

    promise.then((res) => {
      if (!res) return;
      if (res.status !== 200) {
        this.setState({ errorMessage: res.body.error.message });
      } else {
        this.setState({ toGameMenu: true });
        onLogin(res.body.userName, res.body.authToken);
      }
    });
  };

  render() {
    const { email, password, errorMessage, toGameMenu } = this.state;

    if (toGameMenu) {
      return <Redirect to="/home/game_menu" />;
    }

    return (
      <form onSubmit={this.handleLoginFormSubmit}>
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
              Login
            </button>
          </li>
          <li className="nav-item mt-2">
            <Link className="float-right" to="/home/forgot_password">
              Forgot password?
            </Link>
            <Link to="/home/register">New user?</Link>
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

export default LoginForm;
