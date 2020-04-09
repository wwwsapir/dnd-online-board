import React, { Component } from "react";
import "./PopUp.css";
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
      <div className="PopUp">
        <div className="ExitWarningPopUpInner">
          <div
            className="nav nav-tabs flex-column text-white bg-dark row w-100"
            style={{ border: "8px double blue", fontSize: 15, padding: 20 }}
          >
            <h4>
              Exiting to menu will cause the loss of any unsaved changes.
              <br></br>
              <br></br>
              Continue?
            </h4>
            <span className="inline-form">
              <button
                onClick={this.handleExitToMenu}
                className="btn btn-primary form-control ml-3 mt-3 col-7 d-inline"
              >
                Yes - Exit to Menu
              </button>
              <button
                onClick={this.handleCancelExit}
                className="btn btn-danger form-control ml-2 mt-3 col-4 d-inline"
              >
                No - Back to Game
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default ExitWarningPopUp;
