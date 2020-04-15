import React, { Component, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sideBar.css";
import { MIN_DICE_FOR_ROLL, MAX_DICE_FOR_ROLL } from "../constants";

class DiceRoller extends Component {
  state = {
    diceType: 4,
    diceCount: 1,
    resultSum: null,
    diceResults: [],
    isDiceNumberValid: true,
  };

  handleRoll = () => {
    const { diceCount, diceType } = this.state;
    if (MIN_DICE_FOR_ROLL > diceCount || diceCount > MAX_DICE_FOR_ROLL) {
      this.setState({
        isDiceNumberValid: false,
        resultSum: null,
        diceResults: [],
      });
    } else {
      let sum = 0;
      let diceResults = [];
      for (let i = 0; i < diceCount; i++) {
        const nextRes = Math.floor(Math.random() * diceType) + 1;
        sum += nextRes;
        diceResults.push(nextRes);
      }
      this.setState({ resultSum: sum, diceResults, isDiceNumberValid: true });
    }
  };

  render() {
    const { diceCount, resultSum, diceResults, isDiceNumberValid } = this.state;
    const designClass = this.props.isSmallerScreen ? "MenuUlSmallerScreen" : "MenuUl";
    return (
      <ul
        className={
          "nav nav-tabs flex-column bg-dark row w-100 ml-1 " + designClass
        }
      >
        <h4 className="mb-3">
          <span className="creatorHeader">Roll Dice</span>
        </h4>
        <li className="nav-item">
          <label className="mr-3 mb-2 radio control-label">Dice type:</label>
          <span>
            <label className="ml-1 mr-2 radio control-label" htmlFor="d-4">
              <input
                className="radio m-1"
                type="radio"
                name="DieType"
                value={4}
                id="d-4"
                defaultChecked
                onChange={(event) =>
                  this.setState({ diceType: event.target.value })
                }
              />
              D-4
            </label>
            <label className="ml-1 mr-2 radio control-label" htmlFor="d-6">
              <input
                className="radio m-1"
                type="radio"
                name="DieType"
                value={6}
                id="d-6"
                onChange={(event) =>
                  this.setState({ diceType: event.target.value })
                }
              />
              D-6
            </label>
            <label className="ml-1 mr-2 radio control-label" htmlFor="d-8">
              <input
                className="radio m-1"
                type="radio"
                name="DieType"
                value={8}
                id="d-8"
                onChange={(event) =>
                  this.setState({ diceType: event.target.value })
                }
              />
              D-8
            </label>
            <label className="ml-1 mr-2 radio control-label" htmlFor="d-10">
              <input
                className="radio m-1"
                type="radio"
                name="DieType"
                value={10}
                id="d-10"
                onChange={(event) =>
                  this.setState({ diceType: event.target.value })
                }
              />
              D-10
            </label>
            <label className="ml-1 mr-2 radio control-label" htmlFor="d-12">
              <input
                className="radio m-1"
                type="radio"
                name="DieType"
                value={12}
                id="d-12"
                onChange={(event) =>
                  this.setState({ diceType: event.target.value })
                }
              />
              D-12
            </label>
            <label className="ml-1 mr-2 radio control-label" htmlFor="d-20">
              <input
                className="radio m-1"
                type="radio"
                name="DieType"
                value={20}
                id="d-20"
                onChange={(event) =>
                  this.setState({ diceType: event.target.value })
                }
              />
              D-20
            </label>
            <label className="ml-1 mr-2 radio control-label" htmlFor="d-100">
              <input
                className="radio m-1"
                type="radio"
                name="DieType"
                value={100}
                id="d-100"
                onChange={(event) =>
                  this.setState({ diceType: event.target.value })
                }
              />
              D-100
            </label>
          </span>
        </li>
        <li className="nav-item">
          <label className="mr-1 col-md-5 p-0">How many dice? </label>
          <input
            className="input-group-sm mb-3 form-control col-md-5 d-inline mt-2"
            id="diceCount"
            type="number"
            step={1}
            min={MIN_DICE_FOR_ROLL}
            max={MAX_DICE_FOR_ROLL}
            value={diceCount}
            onChange={(event) =>
              this.setState({ diceCount: event.target.value.replace(/\D/, "") })
            }
          />
          <button
            onClick={this.handleRoll}
            className="btn btn-primary form-control mt-1 col-md-3 d-inline"
          >
            Roll
          </button>
          {isDiceNumberValid && resultSum ? (
            <label className="mr-3 mb-2 radio control-label col-md-8 d-inline">
              Roll Result Sum:
              <span className="rollSum ml-3">{resultSum}</span>
            </label>
          ) : null}
        </li>
        {isDiceNumberValid && resultSum ? (
          <Fragment>
            <label className="mr-3 mb-2 radio control-label mt-2">
              Dice results:
              <div className="mt-1 row ml-1 mt-1">
                {diceResults.map((res, i) => (
                  <div key={i} className="rollResult d-inline ml-1">
                    {res}
                  </div>
                ))}
              </div>
            </label>
          </Fragment>
        ) : !isDiceNumberValid ? (
          <li className="nav-item col mt-3">
            <h4>
              <span className="badge badge-danger">
                Dice number should be {MIN_DICE_FOR_ROLL}-{MAX_DICE_FOR_ROLL}
              </span>
            </h4>
          </li>
        ) : null}
      </ul>
    );
  }
}

export default DiceRoller;
