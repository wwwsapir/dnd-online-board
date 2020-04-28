import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import resetUserPassword from "../services/resetUserPassword";
import checkPasswordTokenValid from "../services/checkPasswordTokenValid";
import { Redirect } from "react-router-dom";
import "./.common.scss";
import { useForm } from "react-hook-form";
import { FORM_ERROR_MESSAGE } from "../constants";

const ResetPasswordForm = (props) => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
  });
  const [serverErrMessage, setServerErrMessage] = useState("");
  const [authToken, setAuthToken] = useState(null);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [toLogin, setToLogin] = useState(false);
  const [isRequestLoading, setIsRequestLoading] = useState(false);

  const getAuthTokenFromParams = () => {
    const hrefParts = window.location.href.split("/");
    const authToken = hrefParts[hrefParts.length - 1];
    return authToken;
  };

  const onSubmit = (data) => {
    const { password, passwordConfirmation } = data;
    if (password !== passwordConfirmation) {
      setServerErrMessage(FORM_ERROR_MESSAGE.passwordConfirmation);
    } else {
      handleChangePasswordFormSubmit(password);
    }
  };

  const isTokenMatchesUser = async (token) => {
    const res = await checkPasswordTokenValid(token);
    setIsPageLoading(false);
    if (!res) return;
    if (res.status !== 200) {
      setServerErrMessage(res.body.error.message);
    } else {
      setIsTokenValid(true);
    }
  };

  useEffect(() => {
    const token = getAuthTokenFromParams();
    setAuthToken(token);
    isTokenMatchesUser(token);
  }, []);

  const handleChangePasswordFormSubmit = async (password) => {
    setIsRequestLoading(true);
    setServerErrMessage("");
    const res = await resetUserPassword({
      newPassword: password,
      authToken,
    });
    setIsRequestLoading(false);
    if (!res) return;
    if (res.status !== 200) {
      setServerErrMessage(res.body.error.message);
    } else {
      setToLogin(true);
      props.onPasswordReset();
    }
  };

  const renderLoadingPage = () => {
    return (
      <ul className="menu bg-dark w-100 h-100 row">
        <h4 className="mb-5">
          <span className="menu-header">Page loading...</span>
        </h4>
      </ul>
    );
  };

  const renderAccessDeniedPage = () => {
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
  };

  const renderPasswordResetPage = () => {
    if (toLogin) {
      return <Redirect push to="/home/login" />;
    }

    return (
      <div className="menu-bg-home">
        <div className="menu-window">
          <form onSubmit={handleSubmit(onSubmit)}>
            <ul className="menu bg-dark w-100">
              <h4 className="mb-5">
                <span className="menu-header">D&amp;D Online Board</span>
              </h4>
              <h4>Reset Password</h4>
              <li className="mt-3">
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
              <li className="mt-3">
                <input
                  className="input-group-sm form-control mt-3"
                  type="password"
                  name="passwordConfirmation"
                  placeholder="Confirm Password"
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
                  {errors.passwordConfirmation
                    ? errors.passwordConfirmation.message
                    : ""}
                </label>
              </li>
              <li>
                <button
                  type="submit"
                  className="btn btn-primary form-control mt-3"
                  disabled={isRequestLoading}
                >
                  {isRequestLoading ? "Please wait..." : "Submit"}
                </button>
              </li>
              {serverErrMessage ? (
                <li className="nav-item col mt-4">
                  <label>
                    <span className="badge badge-danger">
                      {serverErrMessage}
                    </span>
                  </label>
                </li>
              ) : null}
            </ul>
          </form>
        </div>
      </div>
    );
  };

  // Render:
  if (isPageLoading) {
    return renderLoadingPage();
  } else if (isTokenValid) {
    return renderPasswordResetPage();
  } else {
    return renderAccessDeniedPage();
  }
};

export default ResetPasswordForm;
