import React, { Component } from "react";
import SpellCircleCreator from "./SpellCircleCreator";
import "./SpellCircleCreatorPopUp.scss";
import "bootstrap/dist/css/bootstrap.min.css";

class SpellCircleCreatorPopUp extends Component {
  handleSpellCircleCreationClick = (stateData) => {
    this.props.closePopup();
    this.props.onSpellCircleCreation(stateData);
  };

  handleCancelCreation = () => {
    this.props.closePopup();
  };

  render() {
    return (
      <div className="menu-bg-popup">
        <div className="SpellCircleCreatorPopUp-window">
          <SpellCircleCreator
            onCreation={this.handleSpellCircleCreationClick}
            onCancel={this.handleCancelCreation}
          />
        </div>
      </div>
    );
  }
}

export default SpellCircleCreatorPopUp;
