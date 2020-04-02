import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sideBar.css";

class DiceRoller extends Component {
  state = {
    diceType: 4,
    diceCount: 1,
    resultSum: undefined
  };

  handleRoll = () => {
    const { diceCount, diceType } = this.state;
    let sum = 0;
    for (let i = 0; i < diceCount; i++) {
      sum += Math.floor(Math.random() * diceType) + 1;
    }
    this.setState({ resultSum: sum });
  };

  render() {
    const { diceCount, resultSum } = this.state;
    return (
      <ul
        className="nav nav-tabs flex-column text-white bg-dark row w-100"
        style={{ border: "8px double blue", fontSize: 15, padding: 20 }}
      >
        <h4 className="col mb-4">
          <span className="creatorHeader">Roll Dice</span>
        </h4>
        <li className="nav-item col">
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
                onChange={event =>
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
                onChange={event =>
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
                onChange={event =>
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
                onChange={event =>
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
                onChange={event =>
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
                onChange={event =>
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
                onChange={event =>
                  this.setState({ diceType: event.target.value })
                }
              />
              D-100
            </label>
          </span>
        </li>
        <li className="nav-item">
          <label className="mr-1 col-md-5">How many dice? </label>
          <input
            className="input-group-sm mb-3 form-control col-md-5 d-inline"
            id="diceCount"
            type="number"
            step={1}
            min={1}
            max={200}
            value={diceCount}
            onChange={event =>
              this.setState({ diceCount: event.target.value.replace(/\D/, "") })
            }
          />
        </li>
        <li className="nav-item col">
          <button
            onClick={this.handleRoll}
            className="btn btn-primary form-control mt-1 col-md-3"
          >
            Roll
          </button>
          <label className="mr-3 mb-2 radio control-label col-md-8">
            Roll Result Sum:{" "}
            <span className="rollResult" hidden={resultSum ? false : true}>
              {resultSum}
            </span>
          </label>
        </li>
      </ul>
    );
  }
}

export default DiceRoller;
