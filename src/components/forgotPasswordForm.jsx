import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import sendResetUserPasswordEmail from "../services/sendResetPasswordEmail";
import { Link } from "react-router-dom";
import "./.common.scss";

class ForgotPasswordForm extends Component {
  state = {
    email: "",
    errMessage: "",
    messageUnderBox:
      "A message with a link to reset your password will be sent to this email address.",
    loading: false,
  };

  async callResetPasswordSendAPI(email) {
    this.setState({ loading: true });
    const res = await sendResetUserPasswordEmail({ email: email });
    if (!res) return;
    if (res.status !== 200) {
      this.setState({
        errMessage: res.body.error.message,
        messageUnderBox: "An error has occured",
        loading: false,
      });
    } else {
      this.setState({
        emailSent: true,
        messageUnderBox: "Reset message sent to email address!",
        loading: false,
      });
    }
  }

  handleSendButtonClick = () => {
    const { email } = this.state;
    this.setState({ messageUnderBox: "Please wait..." });
    this.callResetPasswordSendAPI(email);
  };

  render() {
    const { email, errMessage, messageUnderBox, loading } = this.state;
    return (
      <div className="menu-window">
        <ul className="menu bg-dark w-100">
          <h4 className="mb-5">
            <span className="menu-header">Reset Password</span>
          </h4>
          <li>
            <input
              className="input-group-sm form-control"
              id="email"
              value={email}
              placeholder="Email Address"
              required
              onChange={(event) => this.setState({ email: event.target.value })}
            />
          </li>
          <li>
            <label>{messageUnderBox}</label>
          </li>
          <li>
            <button
              onClick={this.handleSendButtonClick}
              className="btn btn-primary form-control mt-3"
              disabled={loading}
            >
              Send
            </button>
          </li>
          <li className="mt-2 mb-4">
            <Link className="float-right" to="/home/login">
              Back to log in
            </Link>
          </li>
          {errMessage ? (
            <li>
              <h4>
                <span className="badge badge-danger">{errMessage}</span>
              </h4>
            </li>
          ) : null}
        </ul>
      </div>
    );
  }
}

export default ForgotPasswordForm;
