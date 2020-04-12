import React, { Component } from "react";
import SpellCircleCreator from "./spellCircleCreator";
import "./popUp.css";
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
      <div className="PopUp">
        <div className="SpellCircleCreatorPopUpInner">
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
