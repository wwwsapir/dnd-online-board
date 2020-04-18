import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import resetUserPassword from "../services/resetUserPassword";
import checkPasswordTokenValid from "../services/checkPasswordTokenValid";
import { Redirect } from "react-router-dom";
import "./.common.scss";

class ResetPasswordForm extends Component {
  state = {
    newPassword: "",
    confirmPassword: "",
    errorMessage: "",
    authToken: null,
    tokenValid: false,
    isLoading: true,
    toLogin: false,
    loading: false,
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

  async isTokenMatchesUSer() {
    const res = await checkPasswordTokenValid(this.state.authToken);
    if (!res) return;
    if (res.status !== 200) {
      this.setState({
        errorMessage: res.body.error.message,
        isLoading: false,
      });
    } else {
      this.setState({ tokenValid: true, isLoading: false });
    }
  }

  handleChangePasswordFormSubmit = async (e) => {
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

    this.setState({ loading: true });
    const res = await resetUserPassword({
      newPassword,
      authToken,
    });

    if (!res) return;
    if (res.status !== 200) {
      this.setState({ errorMessage: res.body.error.message, loading: false });
    } else {
      this.setState({ toLogin: true, loading: false });
      onPasswordReset();
    }
  };

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
    const {
      newPassword,
      confirmPassword,
      errorMessage,
      toLogin,
      loading,
    } = this.state;

    if (toLogin) {
      return <Redirect push to="/home/login" />;
    }

    return (
      <div className="menu-bg-home">
        <div className="menu-window">
          <form onSubmit={this.handleChangePasswordFormSubmit}>
            <ul className="menu bg-dark w-100">
              <h4 className="mb-5">
                <span className="menu-header">D&amp;D Online Board</span>
              </h4>
              <h4>Reset Password</h4>
              <li>
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
              <li>
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
                  <h4>
                    <span className="badge badge-danger">{errorMessage}</span>
                  </h4>
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
