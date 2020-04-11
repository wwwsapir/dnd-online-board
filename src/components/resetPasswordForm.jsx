import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  CallResetPasswordResetAPI,
  CallCheckPasswordTokenMatches,
} from "../apiUtils";
import { Redirect } from "react-router-dom";

class ResetPasswordForm extends Component {
  state = {
    newPassword: "",
    confirmPassword: "",
    errorMessage: "",
    authToken: null,
    tokenValid: false,
    isLoading: true,
    toLogin: false,
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
    const hrefParts = window.location.href.split("/");
    const authToken = hrefParts[hrefParts.length - 1];
    return authToken;
  }

  isTokenMatchesUSer() {
    const promise = CallCheckPasswordTokenMatches(this.state.authToken);
    promise.then((res) => {
      if (!res) return;
      if (res.status !== 200) {
        this.setState({
          errorMessage: res.body.error.message,
          isLoading: false,
        });
      } else {
        this.setState({ tokenValid: true, isLoading: false });
      }
    });
  }

  handleChangePasswordFormSubmit = (e) => {
    e.preventDefault();
    const { newPassword, confirmPassword, authToken } = this.state;
    const { onPasswordReset } = this.props;

    if (!newPassword || !confirmPassword) {
      this.setState({ errorMessage: "Please fill both of the above fields" });
      return;
    }
    if (newPassword !== confirmPassword) {
      this.setState({ errorMessage: "Passwords must match" });
      return;
    }

    const promise = CallResetPasswordResetAPI({
      newPassword,
      authToken,
    });

    promise.then((res) => {
      if (!res) return;
      if (res.status !== 200) {
        this.setState({ errorMessage: res.body.error.message });
      } else {
        this.setState({ toLogin: true });
        onPasswordReset();
      }
    });
  };

  renderLoadingPage() {
    return (
      <ul
        className="nav nav-tabs flex-column text-white bg-dark row w-100 h-100"
        style={{ border: "8px double blue", fontSize: 15, padding: 20 }}
      >
        <h4 className="col mb-5">
          <span className="creatorHeader">Page loading...</span>
        </h4>
      </ul>
    );
  }

  renderAccessDeniedPage() {
    return (
      <ul
        className="nav nav-tabs flex-column text-white align-text-top bg-dark row h-100 w-100"
        style={{ border: "8px double blue", fontSize: 15, padding: 20 }}
      >
        <li className="col md-5">
          <h3 className="mb-5">
            <span className="creatorHeader">Access denied</span>
          </h3>
          <h5>
            If you're trying to reset your password, this link may be an old
            password reset link.<br></br> Please look for the latest one in your
            inbox/spam folder or request a new one.
          </h5>
        </li>
      </ul>
    );
  }

  renderPasswordResetPage() {
    const { newPassword, confirmPassword, errorMessage, toLogin } = this.state;

    if (toLogin) {
      return <Redirect push to="/home/login" />;
    }

    return (
      <form
        onSubmit={this.handleChangePasswordFormSubmit}
        className="row bg-dark h-100"
      >
        <ul
          className="nav nav-tabs flex-column text-white bg-dark col w-100 align-top"
          style={{ border: "8px double blue", fontSize: 15, padding: 20 }}
        >
          <h4 className="mb-5">
            <span className="creatorHeader">D&amp;D Online Board</span>
          </h4>
          <h4>Reset Password</h4>
          <span className="col-4 p-0">
            <li className="nav-item">
              <input
                className="input-group-sm form-control mt-3"
                type="password"
                id="newPassword"
                value={newPassword}
                placeholder="New Password"
                required
                onChange={(event) =>
                  this.setState({ newPassword: event.target.value })
                }
              />
            </li>
            <li className="nav-item">
              <input
                className="input-group-sm form-control mt-3"
                type="password"
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
                className="btn btn-primary form-control mt-3"
              >
                Submit
              </button>
            </li>
            {errorMessage ? (
              <li className="nav-item col mt-4">
                <h4>
                  <span className="badge badge-danger">{errorMessage}</span>
                </h4>
              </li>
            ) : null}
          </span>
        </ul>
      </form>
    );
  }

  render() {
    const { tokenValid, isLoading } = this.state;
    if (isLoading) {
      return this.renderLoadingPage();
    } else if (tokenValid) {
      return this.renderPasswordResetPage();
    } else {
      return this.renderAccessDeniedPage();
    }
  }
}

export default ResetPasswordForm;
