import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import registerNewUser from "../services/registerNewUser";
import { Redirect, Link } from "react-router-dom";
import TempMessage from "./TempMessage";
import "./.common.scss";
import ReactFormInputValidation from "react-form-input-validation";

class RegistrationForm extends Component {
  state = {
    serverErrMessage: "",
    toLogin: false,
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
      userName: "required|between:6,72",
      email: "required|email",
      password: "required|between:6,72",
    });
    this.form.onformsubmit = () => {
      this.handleRegisterFormSubmit();
    };
  }

  async handleRegisterFormSubmit() {
    const { userName, email, password } = this.state.fields;
    const { onRegistered } = this.props;
    this.setState({ loading: true, serverErrMessage: "" });
    const res = await registerNewUser({ userName, email, password });

    if (!res) return;
    if (res.status !== 200) {
      this.setState({
        serverErrMessage: res.body.error.message,
        loading: false,
      });
    } else {
      this.setState({ toLogin: true, loading: false });
      onRegistered();
    }
  }

  render() {
    const { serverErrMessage, toLogin, loading } = this.state;

    if (toLogin) {
      return <Redirect push to="/home/login" />;
    }

    return (
      <div className="menu-window">
        <form onSubmit={this.form.handleSubmit}>
          <ul className="menu bg-dark w-100">
            <h4 className="mb-5">
              <span className="menu-header">New User Registration</span>
            </h4>
            <li className="mb-3">
              <input
                className="input-group-sm form-control"
                name="userName"
                type="text"
                placeholder="User Name"
                required
                onBlur={this.form.handleBlurEvent}
                onChange={this.form.handleChangeEvent}
                value={this.state.fields.userName}
              />
              <label className="error badge badge-danger">
                {this.state.errors.userName ? this.state.errors.userName : ""}
              </label>
            </li>
            <li className="mb-3">
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
                className="input-group-sm form-control"
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
                Register
              </button>
            </li>
            <li className="mt-2 mb-4">
              <Link className="float-right" to="/home/login">
                Already registered? log in
              </Link>
            </li>
            {serverErrMessage ? (
              <li>
                <label>
                  <span className="badge badge-danger">{serverErrMessage}</span>
                </label>
              </li>
            ) : null}
            {loading ? <TempMessage message="Please wait..." /> : null}
          </ul>
        </form>
      </div>
    );
  }
}

export default RegistrationForm;
