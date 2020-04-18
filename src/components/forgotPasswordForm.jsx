import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import sendResetUserPasswordEmail from "../services/sendResetPasswordEmail";
import { Link } from "react-router-dom";
import "./.common.scss";
import ReactFormInputValidation from "react-form-input-validation";

class ForgotPasswordForm extends Component {
  state = {
    serverErrMessage: "",
    messageUnderBox:
      "A message with a link to reset your password will be sent to this email address.",
    loading: false,
  };

  constructor(props) {
    super(props);
    this.state.fields = {
      email: "",
    };
    this.state.errors = {};
    this.form = new ReactFormInputValidation(this);
    this.form.useRules({
      email: "required|email",
    });
    this.form.onformsubmit = (fields) => {
      this.callResetPasswordSendAPI(fields.email);
    };
  }

  async callResetPasswordSendAPI(email) {
    this.setState({
      loading: true,
      messageUnderBox: "Please wait...",
      errMessage: "",
    });
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

  render() {
    const { serverErrMessage: errMessage, messageUnderBox, loading } = this.state;
    return (
      <div className="menu-window">
        <form onSubmit={this.form.handleSubmit}>
          <ul className="menu bg-dark w-100">
            <h4 className="mb-5">
              <span className="menu-header">Reset Password</span>
            </h4>
            <li>
              <input
                className="input-group-sm form-control"
                name="email"
                type="email"
                placeholder="Email Address"
                required
                onChange={(event) =>
                  this.setState({ email: event.target.value })
                }
                onBlur={this.form.handleBlurEvent}
                onChange={this.form.handleChangeEvent}
                value={this.state.fields.email}
              />
            </li>
            <li>
              <label>{messageUnderBox}</label>
            </li>
            <li>
              <button
                type="submit"
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
                <label>
                  <span className="badge badge-danger">{errMessage}</span>
                </label>
              </li>
            ) : null}
            <h4 className="error badge badge-danger" style={{ fontSize: 14 }}>
              {this.state.errors.email ? this.state.errors.email : ""}
            </h4>
          </ul>
        </form>
      </div>
    );
  }
}

export default ForgotPasswordForm;
