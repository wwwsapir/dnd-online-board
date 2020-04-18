import React, { Component } from "react";
import CharacterCreator from "./CharacterCreator";
import "./CharacterCreatorPopUp.scss";
import "bootstrap/dist/css/bootstrap.min.css";

class CharacterCreatorPopUp extends Component {
  handleCharacterCreationClick = (stateData) => {
    this.props.closePopup();
    this.props.onCharacterCreation(stateData);
  };

  handleCancelCreation = () => {
    this.props.closePopup();
  };

  render() {
    return (
      <div className="menu-bg-popup">
        <div className="CharacterCreatorPopUp-window">
          <CharacterCreator
            onCreation={this.handleCharacterCreationClick}
            onCancel={this.handleCancelCreation}
          />
        </div>
      </div>
    );
  }
}

export default CharacterCreatorPopUp;
