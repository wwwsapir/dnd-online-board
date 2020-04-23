import React, { Component } from "react";
import "./ExitWarningPopUp.scss";
import "bootstrap/dist/css/bootstrap.min.css";

class ExitToHomeWarningPopUp extends Component {
  handleExitToHome = () => {
    this.props.closePopup();
    this.props.onExitToHome();
  };

  handleCancelExit = () => {
    this.props.closePopup();
  };

  render() {
    return (
      <div className="menu-bg-popup">
        <div className="ExitWarningPopUpInner-window">
          <div className="nav nav-tabs flex-column row w-100 menu">
            <h4>Your guest progress will be deleted. Exit to home?</h4>
            <span className="row mt-3">
              <div className="col-7 d-inline">
                <button
                  onClick={this.handleExitToHome}
                  className="btn btn-primary form-control"
                >
                  Yes - Exit to Home
                </button>
              </div>
              <div className="col-5 d-inline">
                <button
                  onClick={this.handleCancelExit}
                  className="btn btn-danger form-control"
                >
                  No - Back to Game
                </button>
              </div>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default ExitToHomeWarningPopUp;
