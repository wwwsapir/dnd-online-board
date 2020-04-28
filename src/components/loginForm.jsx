import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import loginUser from "../services/loginUser";
import { Redirect, Link } from "react-router-dom";
import "./.common.scss";
import { useForm } from "react-hook-form";
import { EMAIL_REGEX_PATTERN, FORM_ERROR_MESSAGE } from "../constants";

const LoginForm = (props) => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
  });
  const [serverErrMessage, setServerErrMessage] = useState("");
  const [toGameMenu, setToGameMenu] = useState(false);
  const [toMap, setToMap] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginFormSubmit = async (email, password) => {
    setServerErrMessage("");
    setIsLoading(true);

    const res = await loginUser({ email, password });
    if (!res) return;
    setIsLoading(false);
    if (res.status !== 200) {
      setServerErrMessage(res.body.error.message);
    } else {
      setToGameMenu(true);
      props.onLogin(res.body.userName, res.body.authToken);
    }
  };

  const onSubmit = (data) => handleLoginFormSubmit(data.email, data.password);

  const handleGuestEntry = () => {
    props.onGuestEntry();
    setToMap(true);
  };

  if (toGameMenu) {
    return <Redirect to="/home/game_menu" />;
  } else if (toMap) {
    return <Redirect to="/map" />;
  }

  return (
    <div className="menu-window">
      <ul className="menu bg-dark w-100">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4 className="mb-4">
            <span className="menu-header">Welcome to D&amp;D Online Board</span>
          </h4>
          <li className="mb-3">
            <Link to="/home/about">
              <h5>What is D&amp;D Online Board? Click here to find out!</h5>
            </Link>
          </li>
          <h6 className="mb-3">Sign In:</h6>
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
              {isLoading ? "Please wait..." : "Log In"}
            </button>
          </li>
          <li className="mt-2">
            <Link to="/home/register">New user? Register</Link>
            <Link className="float-right" to="/home/forgot_password">
              Forgot password?
            </Link>
          </li>
          {serverErrMessage ? (
            <li>
              <label>
                <span className="badge badge-danger">{serverErrMessage}</span>
              </label>
            </li>
          ) : null}
        </form>
        <h6 className="mb-3 mt-3">Or:</h6>
        <li>
          <button
            className="btn btn-primary form-control"
            disabled={isLoading}
            onClick={handleGuestEntry}
          >
            Enter as a Guest
          </button>
          <label className="mt-1">
            You will not be able to save your game and continue later.
          </label>
        </li>
      </ul>
    </div>
  );
};

export default LoginForm;
