import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CallResetPasswordAPI } from "../apiUtils";

class PasswordResetForm extends Component {
  state = {
    email: "",
    errMessage: "",
  };

  callPasswordResetAPI(email) {
    console.log("callPasswordResetAPI called", email);
    const promise = CallResetPasswordAPI({ email: email });

    promise.then((res) => {
      if (!res) return;
      if (res.error) {
        this.setState({ errorMessage: res.error.message });
      } else {
        console.debug("Reset password email sent successfully!");
      }
    });
  }

  handleSendButtonClick = () => {
    const { email } = this.state;
    const res = this.callPasswordResetAPI(email);
    if (!res) return;
    this.setState({ validationErrMessage: res.error });
  };

  render() {
    const { email, errMessage } = this.state;
    const { onBackToLoginPage } = this.props;
    return (
      <ul
        className="nav nav-tabs flex-column text-white bg-dark row w-100"
        style={{ border: "8px double blue", fontSize: 15, padding: 20 }}
      >
        <h4 className="col mb-5">
          <span className="creatorHeader">Reset Password</span>
        </h4>
        <li className="nav-item">
          <input
            className="input-group-sm form-control col"
            id="email"
            value={email}
            placeholder="Email Address"
            required
            onChange={(event) => this.setState({ email: event.target.value })}
          />
        </li>
        <li className="nav-item">
          <label className="col">
            A message with a link to reset your password will be sent to this
            email address.
          </label>
        </li>
        <li className="nav-item">
          <button
            onClick={this.handleSendButtonClick}
            className="btn btn-primary form-control mt-3 col"
          >
            Send
          </button>
        </li>
        <li className="nav-item mt-2">
          <a className="float-right" href="#" onClick={onBackToLoginPage}>
            Cancel and back to login
          </a>
        </li>
        {errMessage ? (
          <li className="nav-item col">
            <h4>
              <span className="badge badge-danger">{errMessage}</span>
            </h4>
          </li>
        ) : null}
      </ul>
    );
  }
}

export default PasswordResetForm;
