import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  CallResetPasswordResetAPI,
  CallCheckPasswordTokenMatches,
} from "../apiUtils";

class ResetPasswordForm extends Component {
  state = {
    newPassword: "",
    confirmPassword: "",
    errorMessage: "",
    authToken: null,
    tokenValid: false,
  };

  constructor(props) {
    super(props);
    this.state.authToken = this.getAuthTokenFromParams();
  }

  componentDidMount() {
    if (this.state.authToken) {
      this.isTokenMatchesUSer();
    }
  }

  getAuthTokenFromParams() {
    // console.error("getAuthTokenFromParams Not implemented");
    const hrefParts = window.location.href.split("/");
    const authToken = hrefParts[hrefParts.length - 1];
    // this.setState({ authToken });
    return authToken;
  }

  isTokenMatchesUSer() {
    // console.error("isTokenMatchesUSer Not implemented");
    const promise = CallCheckPasswordTokenMatches(this.state.authToken);
    promise.then((res) => {
      if (!res) return;
      if (res.error) {
        this.setState({ errorMessage: res.error.message });
      } else {
        this.setState({ tokenValid: true });
      }
    });
  }

  handleChangePasswordFormSubmit = (e) => {
    e.preventDefault();
    const { newPassword, authToken } = this.state;
    const { onPasswordReset } = this.props;
    const promise = CallResetPasswordResetAPI({
      newPassword,
      authToken,
    });

    promise.then((res) => {
      if (!res) return;
      if (res.error) {
        this.setState({ errorMessage: res.error.message });
      } else {
        onPasswordReset();
      }
    });
  };

  render() {
    const { password, confirmPassword, errorMessage, tokenValid } = this.state;
    if (tokenValid) {
      return (
        <form onSubmit={this.handleChangePasswordFormSubmit}>
          <ul
            className="nav nav-tabs flex-column text-white bg-dark row w-100"
            style={{ border: "8px double blue", fontSize: 15, padding: 20 }}
          >
            <h4 className="col mb-5">
              <span className="creatorHeader">Reset Password</span>
            </h4>
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
              <input
                className="input-group-sm form-control col mt-3"
                type="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm Password"
                required
                onChange={(event) =>
                  this.setState({ confirmPassword: event.target.value })
                }
              />
            </li>
            <li className="nav-item">
              <button
                type="submit"
                className="btn btn-primary form-control mt-3 col"
              >
                Submit
              </button>
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
    } else {
      return (
        <ul
          className="nav nav-tabs flex-column text-white bg-dark row w-100"
          style={{ border: "8px double blue", fontSize: 15, padding: 20 }}
        >
          <h4 className="col mb-5">
            <span className="creatorHeader">Private page. Access denied.</span>
          </h4>
        </ul>
      );
    }
  }
}

export default ResetPasswordForm;
