import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sideBar.css";
import ImagePicker from "react-image-picker";
import "react-image-picker/dist/index.css";
import { avatarImageURLs } from "../constants";

const avatarsList = Object.values(avatarImageURLs);

class CharacterCreator extends Component {
  state = { characterName: "", height: 1, width: 1, avatarImage: null };

  initiateState() {
    this.setState({
      characterName: "",
      height: 1,
      width: 1,
      avatarImage: null
      //   type: undefined,
      //   avatar: "Choose File"
    });
  }

  onPickAvatar = avatarImage => {
    this.setState({ avatarImage });
  };

  getFileName(path) {
    return path.replace(/^.*[\\\/]/, "");
  }

  handleCancelCreation = () => {
    this.initiateState();
    this.props.onCancel();
  };

  handleCreate = () => {
    const stateData = { ...this.state };
    this.initiateState();
    stateData.avatarImage = stateData.avatarImage.src;
    this.props.onCreation(stateData);
  };

  render() {
    const { boardRowCount, boardColCount } = this.props;
    const { characterName, height, width, avatarFile } = this.state;
    return (
      <ul
        className="nav nav-tabs flex-column text-white bg-dark row w-100"
        style={{ border: "8px double blue", fontSize: 15, padding: 20 }}
      >
        <h4 className="col mb-4">
          <span className="creatorHeader">Add a New Character</span>
        </h4>
        <li className="nav-item">
          <label className="col-3 d-inline">Character name:</label>
          <input
            className="input-group-sm form-control col-8 d-inline"
            id="characterMame"
            value={characterName}
            onChange={event =>
              this.setState({ characterName: event.target.value })
            }
          />
        </li>
        <li className="nav-item">
          <label className="col-4 d-inline">Width in squares: </label>
          <input
            className="input-group-sm mb-2 form-control col-3 d-inline"
            id="width"
            type="number"
            step={1}
            min={1}
            max={boardColCount}
            value={width}
            onChange={event =>
              this.setState({ width: event.target.value.replace(/\D/, "") })
            }
          />
          <label className="ml-30 col-4 d-inline">Height in squares:</label>
          <input
            className="input-group-sm mb-2 form-control col-3 d-inline"
            id="height"
            type="number"
            step={1}
            min={1}
            max={boardRowCount}
            value={height}
            onChange={event =>
              this.setState({ height: event.target.value.replace(/\D/, "") })
            }
          />
        </li>
        <li className="nav-item col">
          <label className="mr-3 mb-3">Choose Avatar:</label>
          <span>
            <ImagePicker
              images={avatarsList.map((avatar, i) => ({
                src: avatar,
                value: i
              }))}
              onPick={this.onPickAvatar}
            />
          </span>
        </li>
        {/* <li className="nav-item col">
          <label className="mr-3 mb-2 radio control-label">
            Character type:
          </label>
          <span>
            <label className="ml-1 mr-2 radio control-label" htmlFor="player">
              <input
                className="radio m-1"
                type="radio"
                name="CharType"
                value="Player"
                id="player"
                onChange={event => this.setState({ type: event.target.value })}
              />
              Player
            </label>
            <label className="ml-1 mr-2 radio control-label" htmlFor="enemy">
              <input
                className="radio m-1"
                type="radio"
                name="CharType"
                value="Enemy"
                id="enemy"
                onChange={event => this.setState({ type: event.target.value })}
              />
              Enemy
            </label>
            <label className="ml-1 mr-2 radio control-label" htmlFor="ally">
              <input
                className="radio m-1"
                type="radio"
                name="CharType"
                value="Ally"
                id="ally"
                onChange={event => this.setState({ type: event.target.value })}
              />
              Ally
            </label>
          </span>
        </li>
        <li className="nav-item col">
          <label className="mr-1">Avatar: </label>
          <div className="custom-file mb-2">
            <input
              type="file"
              className="custom-file-input"
              id="inputGroupFile01"
              onChange={event => {
                this.setState({ avatar: event.target.value });
              }}
            />
            <label className="custom-file-label">
              {this.getFileName(avatar)}
            </label>
          </div>
        </li> */}
        <li className="nav-item">
          <button
            onClick={this.handleCreate}
            className="btn btn-primary form-control ml-3 mt-3 col-md-8"
          >
            Create!
          </button>
          <button
            onClick={this.handleCancelCreation}
            className="btn btn-danger form-control ml-4 mt-3 col-md-3"
          >
            Cancel
          </button>
        </li>
      </ul>
    );
  }
}

export default CharacterCreator;
