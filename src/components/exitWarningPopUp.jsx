import React, { Component } from "react";
import "./ExitWarningPopUp.scss";
import "bootstrap/dist/css/bootstrap.min.css";

class ExitWarningPopUp extends Component {
  handleExitToMenu = (stateData) => {
    this.props.closePopup();
    this.props.onExitToMenu();
  };

  handleCancelExit = () => {
    this.props.closePopup();
  };

  render() {
    return (
      <div className="menu-bg-popup">
        <div className="ExitWarningPopUpInner-window">
          <div className="nav nav-tabs flex-column row w-100 menu">
            <h4>Your progress is saved. Exit to menu?</h4>
            <span className="row mt-3">
              <div className="col-7 d-inline">
                <button
                  onClick={this.handleExitToMenu}
                  className="btn btn-primary form-control"
                >
                  Yes - Exit to Menu
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

export default ExitWarningPopUp;
