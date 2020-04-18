import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import resetUserPassword from "../services/resetUserPassword";
import checkPasswordTokenValid from "../services/checkPasswordTokenValid";
import { Redirect } from "react-router-dom";
import "./.common.scss";
import ReactFormInputValidation from "react-form-input-validation";

class ResetPasswordForm extends Component {
  state = {
    serverErrorMessage: "",
    authToken: null,
    tokenValid: false,
    isLoading: true,
    toLogin: false,
    loading: false,
  };

  constructor(props) {
    super(props);
    this.state.authToken = this.getAuthTokenFromParams();
    this.state.fields = {
      password: "",
      password_confirmation: "",
    };
    this.state.errors = {};
    this.form = new ReactFormInputValidation(this);
    this.form.useRules({
      password: "required|between:6,72",
      password_confirmation: "required|between:6,72",
    });
    this.form.onformsubmit = () => {
      if (
        this.state.fields.password !== this.state.fields.password_confirmation
      ) {
        this.setState({ serverErrorMessage: "Passwords must match!" });
        return;
      }
      this.handleChangePasswordFormSubmit();
    };
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

  async isTokenMatchesUSer() {
    const res = await checkPasswordTokenValid(this.state.authToken);
    if (!res) return;
    if (res.status !== 200) {
      this.setState({
        serverErrorMessage: res.body.error.message,
        isLoading: false,
      });
    } else {
      this.setState({ tokenValid: true, isLoading: false });
    }
  }

  async handleChangePasswordFormSubmit() {
    const { password } = this.state.fields;
    const { authToken } = this.state;
    const { onPasswordReset } = this.props;

    this.setState({ loading: true, serverErrorMessage: "" });
    const res = await resetUserPassword({
      newPassword: password,
      authToken,
    });

    if (!res) return;
    if (res.status !== 200) {
      this.setState({
        serverErrorMessage: res.body.error.message,
        loading: false,
      });
    } else {
      this.setState({ toLogin: true, loading: false });
      onPasswordReset();
    }
  }

  renderLoadingPage() {
    return (
      <ul className="menu bg-dark w-100 h-100 row">
        <h4 className="mb-5">
          <span className="menu-header">Page loading...</span>
        </h4>
      </ul>
    );
  }

  renderAccessDeniedPage() {
    return (
      <ul className="menu bg-dark w-100 h-100 row">
        <li className="md-5">
          <h3 className="mb-5">
            <span className="menu-header">Access denied</span>
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
    const { serverErrorMessage: errorMessage, toLogin, loading } = this.state;

    if (toLogin) {
      return <Redirect push to="/home/login" />;
    }

    return (
      <div className="menu-bg-home">
        <div className="menu-window">
          <form onSubmit={this.form.handleSubmit}>
            <ul className="menu bg-dark w-100">
              <h4 className="mb-5">
                <span className="menu-header">D&amp;D Online Board</span>
              </h4>
              <h4>Reset Password</h4>
              <li className="mt-3">
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
              <li className="mt-3">
                <input
                  className="input-group-sm form-control"
                  type="password"
                  name="password_confirmation"
                  placeholder="Confirm Password"
                  required
                  onBlur={this.form.handleBlurEvent}
                  onChange={this.form.handleChangeEvent}
                  value={this.state.fields.password_confirmation}
                />
                <label className="error badge badge-danger">
                  {this.state.errors.password_confirmation
                    ? this.state.errors.password_confirmation
                    : ""}
                </label>
              </li>
              <li>
                <button
                  type="submit"
                  className="btn btn-primary form-control mt-3"
                  disabled={loading}
                >
                  {loading ? "Please wait..." : "Submit"}
                </button>
              </li>
              {errorMessage ? (
                <li className="nav-item col mt-4">
                  <label>
                    <span className="badge badge-danger">{errorMessage}</span>
                  </label>
                </li>
              ) : null}
            </ul>
          </form>
        </div>
      </div>
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
