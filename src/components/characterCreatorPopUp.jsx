import React, { Component } from "react";
import CharacterCreator from "./CharacterCreator";
import "./popUp.css";
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
    const innerClass = this.props.isSmallerScreen
      ? "CharacterCreatorPopUpInnerSmallerScreen"
      : "CharacterCreatorPopUpInner";
    return (
      <div className="PopUp">
        <div className={innerClass}>
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
