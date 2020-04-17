import React, { Component } from "react";
import "./home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./loginForm";
import GameMenu from "./gameMenu";
import ForgotPasswordForm from "./forgotPasswordForm";
import RegistrationForm from "./registrationForm";
import AboutPage from "./aboutPage";
import { Route, Redirect, Switch } from "react-router-dom";

class WelcomeScreen extends Component {
  render() {
    const {
      onNewGame,
      onContinueSavedGame,
      authToken,
      userName,
      onRegisteredNewUser,
      onLogOut,
      cancelRedirectFromMap,
      onLogIn,
    } = this.props;

    return (
      <div className="HomeBg">
        <Switch>
          <Redirect
            exact
            from="/home"
            to={authToken ? "/home/game_menu" : "/home/login"}
          />
          <Route path="/home/game_menu">
            <GameMenu
              onContinueSavedGame={onContinueSavedGame}
              onStartANewGame={onNewGame}
              onLogOut={onLogOut}
              userName={userName}
              authToken={authToken}
              cancelRedirectFromMap={cancelRedirectFromMap}
              isSmallerScreen={this.props.isSmallerScreen}
            />
          </Route>
          <Route path="/home/forgot_password">
            <ForgotPasswordForm />
          </Route>
          <Route path="/home/about">
            <AboutPage isSmallerScreen={this.props.isSmallerScreen} />
          </Route>
          <Route path="/home/register">
            <RegistrationForm onRegistered={onRegisteredNewUser} />
          </Route>
          <Route path="/home/login">
            <LoginForm onLogin={onLogIn} />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default WelcomeScreen;
