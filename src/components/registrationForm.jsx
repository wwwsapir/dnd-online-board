import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import registerNewUser from "../services/registerNewUser";
import { Redirect, Link } from "react-router-dom";
import TempMessage from "./TempMessage";
import "./.common.scss";
import { useForm } from "react-hook-form";
import { EMAIL_REGEX_PATTERN, FORM_ERROR_MESSAGE } from "../constants";

const RegistrationForm = (props) => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
  });
  const [serverErrMessage, setServerErrMessage] = useState("");
  const [toLogin, setToLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegisterFormSubmit = async (userName, email, password) => {
    setServerErrMessage("");
    setIsLoading(true);
    const res = await registerNewUser({ userName, email, password });

    if (!res) return;
    setIsLoading(false);
    if (res.status !== 200) {
      setServerErrMessage(res.body.error.message);
    } else {
      setToLogin(true);
      props.onRegistered();
    }
  };

  const onSubmit = (data) =>
    handleRegisterFormSubmit(data.userName, data.email, data.password);

  if (toLogin) {
    return <Redirect push to="/home/login" />;
  }

  return (
    <div className="menu-window">
      <form onSubmit={handleSubmit(onSubmit)}>
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
              ref={register({
                required: {
                  value: true,
                  message: FORM_ERROR_MESSAGE.userNameMissing,
                },
                minLength: {
                  value: 6,
                  message: FORM_ERROR_MESSAGE.userNameLength,
                },
                maxLength: {
                  value: 72,
                  message: FORM_ERROR_MESSAGE.userNameLength,
                },
              })}
            />
            <label className="error badge badge-danger">
              {errors.userName ? errors.userName.message : ""}
            </label>
          </li>
          <li className="mb-3">
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
            <label className="error badge badge-danger">
              {errors.email ? errors.email.message : ""}
            </label>
          </li>
          <li>
            <input
              className="input-group-sm form-control mt-3"
              type="password"
              name="password"
              placeholder="Password"
              ref={register({
                required: {
                  value: true,
                  message: FORM_ERROR_MESSAGE.passwordMissing,
                },
                minLength: {
                  value: 6,
                  message: FORM_ERROR_MESSAGE.passwordLength,
                },
                maxLength: {
                  value: 72,
                  message: FORM_ERROR_MESSAGE.passwordLength,
                },
              })}
            />
            <label className="error badge badge-danger">
              {errors.password ? errors.password.message : ""}
            </label>
          </li>
          <li>
            <button
              type="submit"
              className="btn btn-primary form-control mt-3"
              disabled={isLoading}
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
          {isLoading ? <TempMessage message="Please wait..." /> : null}
        </ul>
      </form>
    </div>
  );
};

export default RegistrationForm;
