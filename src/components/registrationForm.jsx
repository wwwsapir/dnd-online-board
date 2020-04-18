import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import registerNewUser from "../services/registerNewUser";
import { Redirect, Link } from "react-router-dom";
import TempMessage from "./TempMessage";

class RegistrationForm extends Component {
  state = {
    userName: "",
    email: "",
    password: "",
    errorMessage: "",
    toLogin: false,
    loading: false,
  };

  handleRegisterFormSubmit = async (e) => {
    e.preventDefault();
    const { userName, email, password } = this.state;
    const { onRegistered } = this.props;
    this.setState({ loading: true });
    const res = await registerNewUser({ userName, email, password });

    if (!res) return;
    if (res.status !== 200) {
      this.setState({
        errorMessage: res.body.error.message,
        loading: false,
      });
    } else {
      this.setState({ toLogin: true, loading: false });
      onRegistered();
    }
  };

  render() {
    const {
      userName,
      email,
      password,
      errorMessage,
      toLogin,
      loading,
    } = this.state;

    if (toLogin) {
      return <Redirect push to="/home/login" />;
    }

    return (
      <div className="HomeBgContent">
        <form onSubmit={this.handleRegisterFormSubmit}>
          <ul className="MenuUl bg-dark w-100">
            <h4 className="mb-5">
              <span className="creatorHeader">New User Registration</span>
            </h4>
            <li>
              <input
                className="input-group-sm form-control"
                id="userName"
                value={userName}
                placeholder="User Name"
                required
                onChange={(event) =>
                  this.setState({ userName: event.target.value })
                }
              />
            </li>
            <li>
              <input
                className="input-group-sm form-control mt-3"
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
                Register
              </button>
            </li>
            <li className="mt-2 mb-4">
              <Link className="float-right" to="/home/login">
                Already registered? log in
              </Link>
            </li>
            {errorMessage ? (
              <li>
                <h4>
                  <span className="badge badge-danger">{errorMessage}</span>
                </h4>
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
