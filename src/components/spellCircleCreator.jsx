import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sideBar.css";
import { SketchPicker } from "react-color";
import {
  MIN_SPELL_CIRCLE_RADIUS_FEET,
  MAX_SPELL_CIRCLE_RADIUS_FEET,
} from "../constants";

class CharacterCreator extends Component {
  state = {
    spellName: "",
    ownerName: "",
    radius: MIN_SPELL_CIRCLE_RADIUS_FEET,
    color: {
      r: "241",
      g: "112",
      b: "19",
      a: "1",
    },
    missingFields: false,
    isRadiusValid: true,
  };

  initiateState() {
    this.setState({
      spellName: "",
      ownerName: "",
      radius: MIN_SPELL_CIRCLE_RADIUS_FEET,
      color: {
        r: "241",
        g: "112",
        b: "19",
        a: "1",
      },
      missingFields: false,
      isRadiusValid: true,
    });
  }

  onChangeRadius(event) {
    let newRadiusVal = Number(event.target.value.replace(/\D/, ""));
    this.setState({ radius: newRadiusVal });
  }

  handleCancelCreation = () => {
    this.initiateState();
    this.props.onCancel();
  };

  handleCreateButtonClick = () => {
    const { spellName, ownerName, radius, color } = { ...this.state };
    this.setState({ isRadiusValid: true, missingFields: false }); // initialize errors
    if (!spellName || !color) {
      this.setState({ missingFields: true });
    } else if (
      MIN_SPELL_CIRCLE_RADIUS_FEET > radius ||
      radius > MAX_SPELL_CIRCLE_RADIUS_FEET
    ) {
      this.setState({ isRadiusValid: false });
    } else {
      // form is valid
      this.initiateState(); // Prepare for next circle creation
      this.props.onCreation({ spellName, ownerName, radius, color });
    }
  };

  render() {
    const {
      spellName,
      ownerName,
      radius,
      color,
      isRadiusValid,
      missingFields,
    } = this.state;
    return (
      <ul className="nav nav-tabs flex-column bg-dark row w-100 MenuUl p-20">
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
                onChange={(event) =>
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
                onChange={(event) =>
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
                onChange={(event) => this.onChangeRadius(event, false)}
              />
            </li>
          </span>
          <li className="nav-item col-3 d-inline">
            <label className="mb-2">Choose color for the circle:</label>
            <SketchPicker
              color={color}
              onChange={(color) => this.setState({ color: color.rgb })}
            />
          </li>
        </span>
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
        {missingFields ? (
          <li className="nav-item col">
            <h4>
              <span className="badge badge-danger">
                Not all fields are filled/selected!
              </span>
            </h4>
          </li>
        ) : null}
        {isRadiusValid ? null : (
          <li className="nav-item col">
            <h4>
              <span className="badge badge-danger">
                Radius value should be {MIN_SPELL_CIRCLE_RADIUS_FEET}-
                {MAX_SPELL_CIRCLE_RADIUS_FEET}
              </span>
            </h4>
          </li>
        )}
      </ul>
    );
  }
}

export default CharacterCreator;
