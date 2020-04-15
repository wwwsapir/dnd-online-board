import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sideBar.css";
import ImagePicker from "react-image-picker";
import "react-image-picker/dist/index.css";
import {
  AVATAR_IMG_URLS,
  MIN_CHARACTER_SIZE_SQUARES,
  MAX_CHARACTER_SIZE_SQUARES,
} from "../constants";

const avatarsList = Object.values(AVATAR_IMG_URLS);

class CharacterCreator extends Component {
  state = {
    characterName: "",
    height: 1,
    width: 1,
    avatarImage: null,
    missingFields: false,
  };

  initiateState() {
    this.setState({
      characterName: "",
      height: MIN_CHARACTER_SIZE_SQUARES,
      width: MIN_CHARACTER_SIZE_SQUARES,
      avatarImage: null,
      //   type: null,
      //   avatar: "Choose File"
      missingFields: false,
    });
  }

  onChangeSize(event, isHeight) {
    let newVal = Number(event.target.value.replace(/\D/, ""));
    if (event.target.min > newVal || newVal > event.target.max) {
      newVal = isHeight ? this.state.height : this.state.width;
    }
    isHeight
      ? this.setState({ height: newVal })
      : this.setState({ width: newVal });
  }

  onPickAvatar = (avatarImage) => {
    this.setState({ avatarImage });
  };

  getFileName(path) {
    return path.replace(/^.*[\\\/]/, "");
  }

  handleCancelCreation = () => {
    this.initiateState();
    this.props.onCancel();
  };

  handleCreateButtonClick = () => {
    const { characterName, height, width } = { ...this.state };
    let { avatarImage } = { ...this.state };
    if (!characterName || height <= 0 || width <= 0 || !avatarImage) {
      this.setState({ missingFields: true });
      return;
    }
    this.setState({ missingFields: false });
    this.initiateState();
    avatarImage = avatarImage.src;
    this.props.onCreation({ characterName, height, width, avatarImage });
  };

  render() {
    const { characterName, height, width, avatarFile } = this.state;
    return (
      <ul className="nav nav-tabs flex-column bg-dark row w-100 p-20 MenuUl">
        <div>
          <h4 className="mb-4">
            <span className="creatorHeader ml-2">Add a New Character</span>
            
          </h4>
        </div>
        <li className="nav-item">
          <div className="col">
            <input
              className="input-group-sm form-control"
              id="characterName"
              value={characterName}
              placeholder="Character name"
              required
              onChange={(event) =>
                this.setState({ characterName: event.target.value })
              }
            />
          </div>
        </li>
        <li className="nav-item col">
          <div className="row mt-3 mb-3">
            <span className="form-group" className="col-6 d-inline">
              <label className="d-inline col-5" htmlFor="width">
                Width in squares:
              </label>
              <input
                className="input-group-sm form-control d-inline col-7"
                id="width"
                type="number"
                step={MIN_CHARACTER_SIZE_SQUARES}
                min={MIN_CHARACTER_SIZE_SQUARES}
                max={MAX_CHARACTER_SIZE_SQUARES}
                value={width}
                required
                onChange={(event) => this.onChangeSize(event, false)}
              />
            </span>
            <span className="form-group" className="col-6 d-inline">
              <label className="d-inline col-5" htmlFor="height">
                Height in squares:
              </label>
              <input
                className="input-group-sm form-control d-inline col-7"
                id="height"
                type="number"
                step={MIN_CHARACTER_SIZE_SQUARES}
                min={MIN_CHARACTER_SIZE_SQUARES}
                max={MAX_CHARACTER_SIZE_SQUARES}
                value={height}
                required
                onChange={(event) => this.onChangeSize(event, true)}
              />
            </span>
          </div>
        </li>
        <li className="nav-item col">
          <span className="form-group">
            <label className="mr-3 mb-3">Choose Avatar:</label>
            <span>
              <ImagePicker
                images={avatarsList.map((avatar, i) => ({
                  src: avatar,
                  value: i,
                }))}
                onPick={this.onPickAvatar}
              />
            </span>
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
          <span className="row mt-3">
            <div className="mt-3 col-8 d-inline">
              <button
                onClick={this.handleCreateButtonClick}
                className="btn btn-primary form-control"
              >
                Create!
              </button>
            </div>
            <div className="mt-3 col-4 d-inline">
              <button
                onClick={this.handleCancelCreation}
                className="btn btn-danger form-control"
              >
                Cancel
              </button>
            </div>
          </span>
        </li>
        {this.state.missingFields ? (
          <li className="nav-item col mt-3">
            <h4>
              <span className="badge badge-danger">
                Not all fields are filled/selected!
              </span>
            </h4>
          </li>
        ) : null}
      </ul>
    );
  }
}

export default CharacterCreator;
