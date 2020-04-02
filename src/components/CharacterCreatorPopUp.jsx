import React, { Component } from "react";
import CharacterCreator from "./characterCreator";
import "./PopUp.css";
import "bootstrap/dist/css/bootstrap.min.css";

class CharacterCreatorPopUp extends Component {
  render() {
    return (
      <div className="PopUp">
        <div className="PopUpInner">
          <CharacterCreator />
          <button onClick={this.props.closePopup}>Finish</button>
        </div>
      </div>
    );
  }
}

export default CharacterCreatorPopUp;
