import React, { Component, Fragment } from "react";
import "./sideBar.css";
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
      gameMaster,
      isSmallerScreen,
    } = this.props;
    const designClass = isSmallerScreen ? "MenuUlSmallerScreen" : "MenuUl";
    const buttonTopMargin = isSmallerScreen ? 2 : 3;
    return (
      <ul
        className={
          "nav nav-tabs flex-column bg-dark row w-100 ml-1 " + designClass
        }
      >
        <h4 className="mb-3">
          <span className="creatorHeader">Actions</span>
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
              <button
                onClick={onCharacterCreation}
                className={"btn btn-primary form-control mt-" + buttonTopMargin}
              >
                Create a New Character
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={onSpellCircleCreation}
                className={"btn btn-primary form-control mt-" + buttonTopMargin}
              >
                Create a Spell Circle
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={onCharacterCircleDelete}
                className={"btn btn-primary form-control mt-" + buttonTopMargin}
                disabled={!enableDeletion}
              >
                Delete a Character / Circle
              </button>
            </li>
            {gameMaster ? (
              <Fragment>
                <li className="nav-item">
                  <button
                    onClick={onShowPlayersLink}
                    className={
                      "btn btn-primary form-control mt-" + buttonTopMargin
                    }
                  >
                    Show Link for Players
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    onClick={onExitToMenu}
                    className={
                      "btn btn-primary form-control mt-" + buttonTopMargin
                    }
                  >
                    Exit to Menu
                  </button>
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
