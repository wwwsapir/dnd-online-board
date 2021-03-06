import React, { Component, Fragment } from "react";
import "./.common.scss";
import "bootstrap/dist/css/bootstrap.min.css";

class ActionsMenu extends Component {
  render() {
    const {
      onCharacterCreation,
      onSpellCircleCreation,
      onCharacterCircleDelete,
      onShowPlayersLink,
      enableDeletion,
      itemDeletionModeOn,
      onFinishDeletion,
      onExitToMenu,
      onExitToHome,
      gameMaster,
      isSmallerScreen,
      isGuest,
    } = this.props;
    const buttonClass = `btn btn-primary form-control mt-${
      isSmallerScreen ? 2 : 3
    }`;
    return (
      <ul className="nav nav-tabs flex-column row w-100 ml-1 menu">
        <h4 className="mb-1">
          <span className="menu-header">Actions</span>
        </h4>
        {itemDeletionModeOn ? (
          <li className="nav-item">
            <h5 className="mt-3">Click items on the map to delete them</h5>
            <button
              onClick={onFinishDeletion}
              className="btn btn-danger form-control mt-1"
            >
              Finish Deletion
            </button>
          </li>
        ) : (
          <span>
            <li className="nav-item">
              <button onClick={onCharacterCreation} className={buttonClass}>
                Create a New Character
              </button>
            </li>
            <li className="nav-item">
              <button onClick={onSpellCircleCreation} className={buttonClass}>
                Create a Spell Circle
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={onCharacterCircleDelete}
                className={buttonClass}
                disabled={!enableDeletion}
              >
                Delete a Character / Circle
              </button>
            </li>
            {gameMaster ? (
              <Fragment>
                <li className="nav-item">
                  <button onClick={onShowPlayersLink} className={buttonClass}>
                    Show Link for Players
                  </button>
                </li>
                <li className="nav-item">
                  {isGuest ? (
                    <button onClick={onExitToHome} className={buttonClass}>
                      Exit to Home
                    </button>
                  ) : (
                    <button onClick={onExitToMenu} className={buttonClass}>
                      Exit to Menu
                    </button>
                  )}
                </li>
              </Fragment>
            ) : null}
          </span>
        )}
      </ul>
    );
  }
}

export default ActionsMenu;
