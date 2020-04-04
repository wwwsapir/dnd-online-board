import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sideBar.css";
import ImagePicker from "react-image-picker";
import "react-image-picker/dist/index.css";
import {
  AVATAR_IMAGE_URLS,
  MIN_CHARACTER_SIZE_SQUARES,
  MAX_CHARACTER_SIZE_SQUARES
} from "../constants";

const avatarsList = Object.values(AVATAR_IMAGE_URLS);

class CharacterCreator extends Component {
  state = {
    characterName: "",
    height: 1,
    width: 1,
    avatarImage: null,
    missingFields: false
  };

  initiateState() {
    this.setState({
      characterName: "",
      height: 1,
      width: 1,
      avatarImage: null,
      //   type: null,
      //   avatar: "Choose File"
      missingFields: false
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
      <ul
        className="nav nav-tabs flex-column text-white bg-dark row w-100"
        style={{ border: "8px double blue", fontSize: 15, padding: 20 }}
      >
        <h4 className="col mb-4">
          <span className="creatorHeader">Add a New Character</span>
        </h4>
        <li className="nav-item">
          <input
            className="input-group-sm form-control col-11 mb-3"
            id="characterName"
            value={characterName}
            placeholder="Character name"
            required
            onChange={event =>
              this.setState({ characterName: event.target.value })
            }
          />
        </li>
        <li className="nav-item">
          <span className="inline-form">
            <span className="form-group">
              <label className="col-4 d-inline" htmlFor="width">
                Width in squares:{" "}
              </label>
              <input
                className="input-group-sm form-control col-4 d-inline"
                style={{ maxWidth: "264px" }}
                id="width"
                type="number"
                step={MIN_CHARACTER_SIZE_SQUARES}
                min={MIN_CHARACTER_SIZE_SQUARES}
                max={MAX_CHARACTER_SIZE_SQUARES}
                value={width}
                required
                onChange={event => this.onChangeSize(event, false)}
              />
            </span>
            <span className="form-group">
              <label className="ml-30 col-4 d-inline ml-1" htmlFor="height">
                Height in squares:
              </label>
              <input
                className="input-group-sm form-control col-4 d-inline"
                style={{ maxWidth: "264px" }}
                id="height"
                type="number"
                step={MIN_CHARACTER_SIZE_SQUARES}
                min={MIN_CHARACTER_SIZE_SQUARES}
                max={MAX_CHARACTER_SIZE_SQUARES}
                value={height}
                required
                onChange={event => this.onChangeSize(event, true)}
              />
            </span>
          </span>
        </li>
        <li className="nav-item col">
          <span className="form-group">
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
          <span className="inline-form">
            <button
              onClick={this.handleCreateButtonClick}
              className="btn btn-primary form-control mt-3 col-8 d-inline"
            >
              Create!
            </button>
            <button
              onClick={this.handleCancelCreation}
              className="btn btn-danger form-control ml-3 mt-3 col-3 d-inline"
            >
              Cancel
            </button>
          </span>
        </li>
        {this.state.missingFields ? (
          <li className="nav-item col">
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
