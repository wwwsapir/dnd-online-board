import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import loginUser from "../services/loginUser";
import { Redirect, Link } from "react-router-dom";
import "./.common.scss";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: "",
    toGameMenu: false,
    loading: false,
  };

  handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { onLogin } = this.props;
    this.setState({ loading: true });

    const res = await loginUser({ email, password });
    if (!res) return;
    if (res.status !== 200) {
      this.setState({ errorMessage: res.body.error.message, loading: false });
    } else {
      this.setState({ toGameMenu: true, loading: false });
      onLogin(res.body.userName, res.body.authToken);
    }
  };

  render() {
    const { email, password, errorMessage, toGameMenu, loading } = this.state;

    if (toGameMenu) {
      return <Redirect to="/home/game_menu" />;
    }

    return (
      <div className="menu-window">
        <form onSubmit={this.handleLoginFormSubmit}>
          <ul className="menu bg-dark w-100">
            <h4 className="mb-4">
              <span className="menu-header">
                Welcome to D&amp;D Online Board
              </span>
            </h4>
            <li className="mb-3">
              <Link to="/home/about">
                <h5>What is D&amp;D Online Board? Click here to find out!</h5>
              </Link>
            </li>
            <li>
              <input
                className="input-group-sm form-control"
                id="email"
                value={email}
                placeholder="Email Address"
                required
                onChange={(event) =>
                  this.setState({ email: event.target.value })
                }
              />
            </li>
            <li>
              <input
                className="input-group-sm form-control mt-3"
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
            <li>
              <button
                type="submit"
                className="btn btn-primary form-control mt-3"
                disabled={loading}
              >
                {loading ? "Please wait..." : "Log In"}
              </button>
            </li>
            <li className="mt-2">
              <Link to="/home/register">New user?</Link>
              <Link className="float-right" to="/home/forgot_password">
                Forgot password?
              </Link>
            </li>
            {errorMessage ? (
              <li>
                <h4>
                  <span className="badge badge-danger">{errorMessage}</span>
                </h4>
              </li>
            ) : null}
          </ul>
        </form>
      </div>
    );
  }
}

export default LoginForm;
