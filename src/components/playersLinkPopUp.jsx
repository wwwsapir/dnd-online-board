import React, { Component } from "react";
import "./popUp.css";
import "bootstrap/dist/css/bootstrap.min.css";
import copy from "copy-to-clipboard";

class PlayersLinkPopUp extends Component {
  handleCopyToClipboardClick = (stateData) => {
    copy(this.props.gameLink);
    this.props.closePopup();
    this.props.onCopyToClipboard();
  };

  copyLinkToClipboard() {
    console.log("copyLinkToClipboard called");
    const element = this.textArea;
    element.select();
    document.execCommand("copy");
  }

  handleCloseClick = () => {
    this.props.closePopup();
  };

  render() {
    return (
      <div className="PopUp">
        <div className="ExitWarningPopUpInner">
          <ul className="nav nav-tabs flex-column bg-dark row w-100 p-20 MenuUl">
            <li>
              <h4 className="mb-3">Game link for players:</h4>
              <textarea rows={3} disabled className="form-control">
                {this.props.gameLink}
              </textarea>
            </li>
            <li className="row">
              <div className="col-8 d-inline">
                <button
                  className="btn btn-primary form-control mt-3"
                  onClick={this.handleCopyToClipboardClick}
                >
                  Copy To Clipboard
                </button>
              </div>
              <div className="col-4 d-inline">
                <button
                  className="btn btn-danger form-control mt-3"
                  onClick={this.handleCloseClick}
                >
                  Close
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default PlayersLinkPopUp;
