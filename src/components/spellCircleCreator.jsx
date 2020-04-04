import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sideBar.css";
import { SketchPicker } from "react-color";
import {
  MIN_SPELL_CIRCLE_RADIUS_FEET,
  MAX_SPELL_CIRCLE_RADIUS_FEET
} from "../constants";

class CharacterCreator extends Component {
  state = {
    spellName: "",
    ownerName: "",
    radius: 5,
    color: {
      r: "241",
      g: "112",
      b: "19",
      a: "1"
    },
    missingFields: false
  };

  initiateState() {
    this.setState({
      spellName: "",
      ownerName: "",
      radius: 5,
      color: {
        r: "241",
        g: "112",
        b: "19",
        a: "1"
      },
      missingFields: false
    });
  }

  onChangeRadius(event) {
    let newRadiusVal = Number(event.target.value.replace(/\D/, ""));
    if (event.target.min > newRadiusVal || newRadiusVal > event.target.max) {
      newRadiusVal = this.state.radius;
    }
    this.setState({ radius: newRadiusVal });
  }

  handleCancelCreation = () => {
    this.initiateState();
    this.props.onCancel();
  };

  handleCreateButtonClick = () => {
    const { spellName, ownerName, radius, color } = { ...this.state };
    if (!spellName || radius <= 0 || !color) {
      this.setState({ missingFields: true });
      return;
    }
    this.setState({ missingFields: false });
    this.initiateState();
    this.props.onCreation({ spellName, ownerName, radius, color });
  };

  render() {
    const { spellName, ownerName, radius, color } = this.state;
    return (
      <ul
        className="nav nav-tabs flex-column text-white bg-dark row w-100"
        style={{ border: "8px double blue", fontSize: 15, padding: 20 }}
      >
        <h4 className="col mb-5">
          <span className="creatorHeader">Add a Spell Circle</span>
        </h4>
        <span className="row">
          <span className="col-8 d-inline">
            <li className="nav-item">
              <input
                className="input-group-sm form-control col"
                id="spellName"
                value={spellName}
                placeholder="Spell name"
                required
                onChange={event =>
                  this.setState({ spellName: event.target.value })
                }
              />
            </li>
            <li className="nav-item">
              <input
                className="input-group-sm form-control col mt-3"
                id="ownerName"
                value={ownerName}
                placeholder="Owner name (optional)"
                onChange={event =>
                  this.setState({ ownerName: event.target.value })
                }
              />
            </li>
            <li className="nav-item">
              <label className="col align-text-bottom mt-3">
                Radius in feet (a square is 5 feet wide):
              </label>
              <input
                className="input-group-sm form-control col"
                id="radius"
                type="number"
                step={MIN_SPELL_CIRCLE_RADIUS_FEET}
                min={MIN_SPELL_CIRCLE_RADIUS_FEET}
                max={MAX_SPELL_CIRCLE_RADIUS_FEET}
                value={radius}
                required
                onChange={event => this.onChangeRadius(event, false)}
              />
            </li>
          </span>
          <li className="nav-item col-3 d-inline">
            <label>Choose color for the circle:</label>
            <SketchPicker
              color={color}
              onChange={color => this.setState({ color: color.rgb })}
            />
          </li>
        </span>
        <li className="nav-item">
          <button
            onClick={this.handleCreateButtonClick}
            className="btn btn-primary form-control ml-3 mt-3 col-md-8 d-inline"
          >
            Create!
          </button>
          <button
            onClick={this.handleCancelCreation}
            className="btn btn-danger form-control ml-4 mt-3 col-md-3 d-inline"
          >
            Cancel
          </button>
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
