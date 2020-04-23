import React, { Component } from "react";
import "./.common.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./LoginForm";
import GameMenu from "./GameMenu";
import ForgotPasswordForm from "./ForgotPasswordForm";
import RegistrationForm from "./RegistrationForm";
import AboutPage from "./AboutPage";
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
      onGuestEntry,
      isGuest,
    } = this.props;

    return (
      <div className="menu-bg-home">
        <Switch>
          <Redirect
            exact
            from="/home"
            to={authToken && !isGuest ? "/home/game_menu" : "/home/login"}
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
            <LoginForm onLogin={onLogIn} onGuestEntry={onGuestEntry} />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default WelcomeScreen;
