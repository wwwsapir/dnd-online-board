import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import sendResetUserPasswordEmail from "../services/sendResetPasswordEmail";
import { Link } from "react-router-dom";
import "./.common.scss";
import { useForm } from "react-hook-form";
import { EMAIL_REGEX_PATTERN, FORM_ERROR_MESSAGE } from "../constants";

const ForgotPasswordForm = () => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
  });
  const [serverErrMessage, setServerErrMessage] = useState("");
  const [info, setInfo] = useState(
    "A message with a link to reset your password will be sent to this email address."
  );
  const [isLoading, setIsLoading] = useState(false);

  const callResetPasswordSendAPI = async (email) => {
    setInfo("Please wait...");
    setServerErrMessage("");
    setIsLoading(true);
    const res = await sendResetUserPasswordEmail({ email });
    if (!res) return;
    setIsLoading(false);
    if (res.status !== 200) {
      setInfo("An error has occured");
      setServerErrMessage(res.body.error.message);
    } else {
      setInfo("Reset message sent to email address!");
    }
  };

  const onSubmit = (data) => callResetPasswordSendAPI(data.email);

  return (
    <div className="menu-window">
      <form onSubmit={handleSubmit(onSubmit)}>
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
              ref={register({
                required: {
                  value: true,
                  message: FORM_ERROR_MESSAGE.emailMissing,
                },
                pattern: {
                  value: EMAIL_REGEX_PATTERN,
                  message: FORM_ERROR_MESSAGE.emailInvalid,
                },
              })}
            />
          </li>
          <li>
            <label>{info}</label>
          </li>
          <li>
            <button
              type="submit"
              className="btn btn-primary form-control mt-3"
              disabled={isLoading}
            >
              Send
            </button>
          </li>
          <li className="mt-2 mb-4">
            <Link className="float-right" to="/home/login">
              Back to log in
            </Link>
          </li>
          {serverErrMessage ? (
            <li>
              <label>
                <span className="badge badge-danger">{serverErrMessage}</span>
              </label>
            </li>
          ) : null}
          <h4 className="error badge badge-danger" style={{ fontSize: 14 }}>
            {errors.email ? errors.email.message : ""}
          </h4>
        </ul>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
