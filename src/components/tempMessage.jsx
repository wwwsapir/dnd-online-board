import React, { Component } from "react";
import "./popUp.css";
import "bootstrap/dist/css/bootstrap.min.css";

class TempMessage extends Component {
  render() {
    return (
      <div className="PopUp">
        <div className="TempMessageInner">
          <div className="text-white" style={{ textAlignLast: "center" }}>
            <h2>{this.props.message}</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default TempMessage;
