import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { GAMEPLAY_IMG_PATH } from "../constants";
import "./AboutPage.scss";

class AboutPage extends Component {
  render() {
    return (
      <div className="AboutPage-window">
        <ul className="bg-dark w-100 menu">
          <h4 className="mb-5">
            <span className="menu-header">What is D&amp;D Online Board?</span>
          </h4>
          <p>
            <h4>What is D&amp;D?</h4>
            <label>
              D&amp;D stands for Dungeons &amp; Dragons. It's a fantasy tabletop
              role-playing game (RPG) in which every participant plays a
              character. Characters can do anything a real life person can do
              and more - they can talk, walk, jump, fight each other or fight
              monsters, etc. It's all done by explicitly saying what the
              character does. One of the participants plays a "game master" and
              decides, according to traditional methods, which actions succeed
              and which fail.
            </label>
          </p>
          <p>
            <h4>What is a D&amp;D Board?</h4>
            <label>
              When a fight happens, there's a strict system that determines
              which character goes first, how far it can walk in one turn, and
              if the actions succeed. This is done with the help of a map board
              in which every square is 5 feet long, and different types of dice
              to determine which attacks succeed and how much damage is done.
              Usually the map is a physical board with character miniatures as
              pawns, and the participants meet together to play.
            </label>
          </p>
          <div className="row">
            <p className="col-6">
              <h4>What can I do in D&amp;D Online Board?</h4>
              <label>
                Instead of driving and physically meeting, you can play online
                with your friends. Just connect to an online conversation app,
                and use our online board site to view the same world and take
                character actions.
              </label>
              <ul className="pl-3 mt-2">
                <h5 className="font-weight-bold">The game includes:</h5>
                <li>Simultaneous gameplay for multiple players/computers.</li>
                <li>
                  Chacacters and monsters that can be placed and move on the
                  board.
                </li>
                <li>
                  Spell effect circular areas that can be placed and move on the
                  board.
                </li>
                <li>
                  All dice types virtual roll available on the side-bar during
                  the game.
                </li>
                <li>
                  Your progress is automatically saved, you can continue to play
                  another time.
                </li>
                <br></br>
                <Link to="/home/register">
                  <h4>This sounds so cool! I want to play!</h4>
                </Link>
              </ul>
            </p>
            <div className="col-6">
              <img
                className="gameplay-img"
                src={GAMEPLAY_IMG_PATH}
                alt="gameplay"
              />
            </div>
          </div>
        </ul>
      </div>
    );
  }
}

export default AboutPage;
