import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import loginUser from "../services/loginUser";
import { Redirect, Link } from "react-router-dom";
import "./.common.scss";
import ReactFormInputValidation from "react-form-input-validation";

class LoginForm extends Component {
  state = {
    serverErrMessage: "",
    toGameMenu: false,
    toMap: false,
    loading: false,
  };

  constructor(props) {
    super(props);
    this.state.fields = {
      email: "",
      password: "",
    };
    this.state.errors = {};
    this.form = new ReactFormInputValidation(this);
    this.form.useRules({
      email: "required|email",
      password: "required|between:6,72",
    });
    this.form.onformsubmit = () => {
      this.handleLoginFormSubmit();
    };
  }

  async handleLoginFormSubmit() {
    const { email, password } = this.state.fields;
    const { onLogin } = this.props;
    this.setState({ loading: true, serverErrMessage: "" });

    const res = await loginUser({ email, password });
    if (!res) return;
    if (res.status !== 200) {
      this.setState({
        serverErrMessage: res.body.error.message,
        loading: false,
      });
    } else {
      this.setState({ toGameMenu: true, loading: false });
      onLogin(res.body.userName, res.body.authToken);
    }
  }

  handleGuestEntry = () => {
    this.props.onGuestEntry();
    this.setState({ toMap: true });
  };

  render() {
    const { serverErrMessage, toGameMenu, toMap, loading } = this.state;

    if (toGameMenu) {
      return <Redirect to="/home/game_menu" />;
    } else if (toMap) {
      return <Redirect to="/map" />;
    }

    return (
      <div className="menu-window">
        <ul className="menu bg-dark w-100">
          <form onSubmit={this.form.handleSubmit}>
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
            <h6 className="mb-3">Sign In:</h6>
            <li>
              <input
                className="input-group-sm form-control"
                name="email"
                type="email"
                placeholder="Email Address"
                required
                onBlur={this.form.handleBlurEvent}
                onChange={this.form.handleChangeEvent}
                value={this.state.fields.email}
              />
              <label className="error badge badge-danger">
                {this.state.errors.email ? this.state.errors.email : ""}
              </label>
            </li>
            <li>
              <input
                className="input-group-sm form-control mt-3"
                type="password"
                name="password"
                placeholder="Password"
                required
                onBlur={this.form.handleBlurEvent}
                onChange={this.form.handleChangeEvent}
                value={this.state.fields.password}
              />
              <label className="error badge badge-danger">
                {this.state.errors.password ? this.state.errors.password : ""}
              </label>
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
            {serverErrMessage ? (
              <li>
                <label>
                  <span className="badge badge-danger">{serverErrMessage}</span>
                </label>
              </li>
            ) : null}
          </form>
          <h6 className="mb-3 mt-3">Or:</h6>
          <li>
            <button
              className="btn btn-primary form-control"
              disabled={loading}
              onClick={this.handleGuestEntry}
            >
              Enter as a Guest
            </button>
            <label className="mt-1">
              You will not be able to save your game and continue later.
            </label>
          </li>
        </ul>
      </div>
    );
  }
}

export default LoginForm;
