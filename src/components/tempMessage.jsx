import React, { Component } from "react";
import "./TempMessage.scss";
import "bootstrap/dist/css/bootstrap.min.css";

class TempMessage extends Component {
  render() {
    return (
      <div className="menu-bg-popup">
        <div className="TempMessage-window">
          <div className="TempMessage-text">
            <h2>{this.props.message}</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default TempMessage;
