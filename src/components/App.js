import React, { Component, Fragment } from "react";
import "./App.css";
import DiceRoller from "./diceRoller";
import "bootstrap/dist/css/bootstrap.min.css";
import MapCanvas from "./mapCanvas";
import CharacterCreatorPopUp from "./characterCreatorPopUp";
import ActionsMenu from "./actionsMenu";
import CloneDeep from "lodash/cloneDeep";
import ErrorBoundary from "react-error-boundary";
import { DefaultFallbackComponent } from "../constants";
import {
  CallGetGameDataAPI,
  CallSaveNewGameDataAPI,
  CallUpdateGameDataAPI,
} from "../apiUtils";
import SpellCircleCreatorPopUp from "./spellCircleCreatorPopUp";
import WelcomeScreen from "./welcomeScreen";
import TempMessage from "./tempMessage";
import ResetPasswordForm from "./resetPasswordForm";
import ExitWarningPopUp from "./exitWarningPopUp";
import { Persist } from "react-persist";
import { Route, Redirect, Switch, Link } from "react-router-dom";
import "./home.css";
import PlayersLinkPopUp from "./playersLinkPopUp";
import { PLAYERS_GAME_URL } from "../constants";

class App extends Component {
  state = {
    authToken: null,
    userName: "",
    rowCount: this.props.rowCount,
    colCount: this.props.colCount,
    walls: [
      // { row: 1, col: 1 },
      // { row: 1, col: 2 }
    ],
    cellSize: this.props.cellSize,
    borderWidth: Math.ceil(this.props.cellSize * 0.02),
    matrix: null,
    selectedChar: null,
    placingChar: null,
    selectedCircle: null,
    placingCircle: null,
    itemDeletionModeOn: false,
    showTempMessage: false,
    tempMessageText: "",
    mapImage: {
      url: this.props.bgImageLink,
      file: null,
    },
    resetPasswordScreen: false,
    spellCircles: [],
    characters: [],
    showCharacterCreatorPopup: false,
    showSpellCircleCreatorPopup: false,
    showExitWarningPopUp: false,
    showGameMenu: true,
    toGameMenu: false,
    updating: false,
    showPlayerLinkPopUp: false,
  };

  constructor(props) {
    super(props);
    this.state.matrix = this.createMatrix(
      this.props.rowCount,
      this.props.colCount
    );
    if (window.location.href.split("/").includes("reset")) {
      localStorage.removeItem("dnd-app");
      this.state.resetPasswordScreen = true;
    }
  }

  initiateGame() {
    this.setState({ walls: [], spellCircles: [], characters: [] });
  }

  setStateFromSavedGameData(savedGameData) {
    const matrix = this.createMatrix(
      savedGameData.rowCount,
      savedGameData.colCount
    );
    const borderWidth = Math.ceil(savedGameData.cellSize * 0.02);
    this.setState({
      ...savedGameData,
      matrix,
      borderWidth,
    });
  }

  createMatrix(rowCount, colCount) {
    let myarr = [];
    for (let i = 0; i < rowCount; i++) {
      let row = [];
      for (let j = 0; j < colCount; j++) {
        let cell = {
          row: i,
          col: j,
          wall: this.isCellWall(i, j),
        };
        row.push(cell);
      }
      myarr.push(row);
    }
    return myarr;
  }

  isCellWall(row, col) {
    const walls = this.state.walls.filter(
      (c) => c.row === row && c.col === col
    );
    return walls.length > 0;
  }

  handleCellClick = (cell, triggerDeselect = true) => {
    const { selectedChar, selectedCircle } = {
      ...this.state,
    };
    if (selectedCircle) {
      let spellCircles = [...this.state.spellCircles];
      const spellCircleInd = this.moveSpellCircle(cell);
      this.handleSaveGame();
      if (triggerDeselect) {
        spellCircles = this.getSpellCirclesArrWithoutSelection();
        this.setState({
          selectedCircle: null,
          placingCircle: null,
          spellCircles,
        });
      } else if (spellCircleInd > -1) {
        this.setState({ selectedCircle: spellCircles[spellCircleInd] });
      }
    }

    if (selectedChar) {
      let characters = [...this.state.characters];
      if (cell.wall) {
        if (triggerDeselect) {
          characters = this.getCharsArrWithoutSelection();
          this.setState({ selectedChar: null, placingChar: null, characters });
        }
        return;
      }

      const charInd = this.moveCharacter(cell);
      this.handleSaveGame();
      if (triggerDeselect) {
        characters = this.getCharsArrWithoutSelection();
        this.setState({ selectedChar: null, placingChar: null, characters });
      } else if (charInd > -1) {
        this.setState({ selectedChar: characters[charInd] });
      }
    }
  };

  // handleKeyUp = e => {
  //   let { selectedChar, matrix } = this.state;
  //   if (!selectedChar) {
  //     return;
  //   }

  //   let rowAdd = 0;
  //   let colAdd = 0;

  //   switch (e.keyCode) {
  //     case 37: // Left
  //       rowAdd = 0;
  //       colAdd = -1;
  //       break;
  //     case 38: // Up
  //       rowAdd = -1;
  //       colAdd = 0;
  //       break;
  //     case 39: // Right
  //       rowAdd = 0;
  //       colAdd = 1;
  //       break;
  //     case 40: // Down
  //       rowAdd = 1;
  //       colAdd = 0;
  //       break;
  //     default:
  //       const characters = this.getCharsArrWithoutSelection();
  //       this.setState({ selectedChar: null, placingChar: null, characters });
  //       return;
  //   }
  //   const row = selectedChar.topLeftRow + rowAdd;
  //   const col = selectedChar.topLeftCol + colAdd;
  //   if (this.checkIndicesValid(row, col, row, col)) {
  //     this.handleCellClick(matrix[row][col], false);
  //   }
  // };

  handleKeyUp = (e) => {
    let { selectedChar, selectedCircle } = { ...this.state };
    if (selectedChar) {
      const characters = this.getCharsArrWithoutSelection();
      this.setState({ selectedChar: null, placingChar: null, characters });
    } else if (selectedCircle) {
      const spellCircles = this.getSpellCirclesArrWithoutSelection();
      this.setState({
        selectedCircle: null,
        placingCircle: null,
        spellCircles,
      });
    }
  };

  getCharsArrWithoutSelection() {
    let charactersCopy = [...this.state.characters];
    if (charactersCopy[charactersCopy.length - 1].topLeftRow === null) {
      // This happens when canceling the creation of a new character
      charactersCopy.pop();
    }
    return charactersCopy;
  }

  getSpellCirclesArrWithoutSelection() {
    let spellCirclesCopy = [...this.state.spellCircles];
    if (spellCirclesCopy[spellCirclesCopy.length - 1].row === null) {
      // This happens when canceling the creation of a new character
      spellCirclesCopy.pop();
    }
    return spellCirclesCopy;
  }

  deleteCharacter(charToDelete) {
    let characters = [...this.state.characters];
    characters = characters.filter((char) => char !== charToDelete);
    this.setState({ characters });
    if (characters.length === 0 && this.state.spellCircles.length === 0) {
      this.toggleItemDeletionMode();
    }
  }

  handleCharClick = (char) => {
    let { selectedChar, placingChar, itemDeletionModeOn } = {
      ...this.state,
    };
    if (itemDeletionModeOn) {
      this.deleteCharacter(char);
    } else {
      selectedChar = char;
      placingChar = { ...char }; // A copy of the character for the movement
      this.setState({ selectedChar, placingChar });
    }
  };

  handleSpellCircleClick = (spellCircle) => {
    let { selectedCircle, placingCircle, itemDeletionModeOn } = {
      ...this.state,
    };
    if (itemDeletionModeOn) {
      this.deleteSpellCircle(spellCircle);
    } else {
      selectedCircle = spellCircle;
      placingCircle = { ...spellCircle }; // A copy of the spellCircle for the movement
      this.setState({ selectedCircle, placingCircle });
    }
  };

  deleteSpellCircle(spellCircleToDelete) {
    let spellCircles = [...this.state.spellCircles];
    spellCircles = spellCircles.filter(
      (spellCircle) => spellCircle !== spellCircleToDelete
    );
    this.setState({ spellCircles });
    if (this.state.characters.length === 0 && spellCircles.length === 0) {
      this.toggleItemDeletionMode();
    }
  }

  getSelectedCharCells(char) {
    let selectedCells = [];
    const { matrix } = this.state;
    const lastRowInd = char.heightCells + char.topLeftRow - 1;
    const lastColInd = char.widthCells + char.topLeftCol - 1;
    if (
      !this.checkIndicesValid(
        char.topLeftRow,
        char.topLeftCol,
        lastRowInd,
        lastColInd
      )
    ) {
      console.warn("Can't place character outside map boundary!");
      return [];
    }
    for (let row = char.topLeftRow; row < lastRowInd + 1; row++) {
      for (let col = char.topLeftCol; col < lastColInd + 1; col++) {
        selectedCells.push(matrix[row][col]);
      }
    }
    return selectedCells;
  }

  checkIndicesValid(smallRow, smallCol, largeRow, largeCol) {
    const { rowCount, colCount } = this.props;
    return (
      smallRow >= 0 &&
      smallCol >= 0 &&
      largeRow < rowCount &&
      largeCol < colCount
    );
  }

  moveCharacter(cell) {
    const { characters, selectedChar } = { ...this.state };
    const charInd = characters.indexOf(selectedChar);
    const { row, col } = cell;
    if (!this.isNewCharPosValid({ row, col })) {
      return -1;
    }

    characters[charInd] = { ...this.state.selectedChar };
    characters[charInd].topLeftRow = row;
    characters[charInd].topLeftCol = col;
    this.setState({ characters });
    return charInd;
  }

  moveSpellCircle(cell) {
    const { spellCircles, selectedCircle } = { ...this.state };
    const circleInd = spellCircles.indexOf(selectedCircle);
    const { row, col } = cell;

    spellCircles[circleInd] = { ...this.state.selectedCircle };
    spellCircles[circleInd].row = row;
    spellCircles[circleInd].col = col;
    this.setState({ spellCircles });
    return circleInd;
  }

  isNewCharPosValid(newPositionInd) {
    let selectedCharCopy = CloneDeep(this.state.selectedChar);
    selectedCharCopy.topLeftRow = newPositionInd.row;
    selectedCharCopy.topLeftCol = newPositionInd.col;
    return this.getSelectedCharCells(selectedCharCopy).length > 0;
  }

  calcCharPosition = (char) => {
    const { cellSize } = this.props;
    const { borderWidth } = this.state;
    let xPixels = null;
    let yPixels = null;
    if (char.topLeftRow !== null && char.topLeftCol !== null) {
      xPixels = char.topLeftRow * cellSize + borderWidth;
      yPixels = char.topLeftCol * cellSize + borderWidth;
    }

    return {
      topLeft: {
        row: xPixels,
        col: yPixels,
      },
      width: char.widthCells * cellSize - 2 * borderWidth,
      height: char.heightCells * cellSize - 2 * borderWidth,
    };
  };

  calcSpellCirclePosition = (spellCircle) => {
    const { cellSize } = this.props;
    let xPixels = null;
    let yPixels = null;
    if (spellCircle.row !== null && spellCircle.col !== null) {
      xPixels =
        spellCircle.row * cellSize - (spellCircle.radius / 5 - 0.5) * cellSize;
      yPixels =
        spellCircle.col * cellSize - (spellCircle.radius / 5 - 0.5) * cellSize;
    }

    return {
      row: xPixels,
      col: yPixels,
      radius: spellCircle.radius * (cellSize / 5),
    };
  };

  componentDidMount() {
    document.addEventListener("keyup", this.handleKeyUp, false);
    if (localStorage.getItem("dnd-app")) {
    }
    if (
      !this.state.authToken &&
      window.location.href.split("/").includes("game")
    ) {
      // player mode (/game route)
      const authToken = this.getAuthTokenFromParams();
      if (authToken) {
        this.setState({ authToken });
      }
    }
    setInterval(() => {
      const { authToken, selectedChar, selectedCircle } = this.state;
      if (authToken && !selectedChar && !selectedCircle) {
        this.handleContinueSavedGame();
      }
    }, 1000);
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.handleKeyUp, false);
  }

  handleMouseEnterCell = (cell) => {
    let { placingChar, placingCircle } = { ...this.state };
    if (placingChar) {
      placingChar.topLeftRow = cell.row;
      placingChar.topLeftCol = cell.col;
      this.setState({ placingChar });
    } else if (placingCircle) {
      placingCircle.row = cell.row;
      placingCircle.col = cell.col;
      this.setState({ placingCircle });
    }
  };

  handleCharacterCreation = (stateData) => {
    const { characterName, height, width, avatarImage } = stateData;
    let newChar = {
      name: characterName,
      image: { url: avatarImage, file: null },
      topLeftRow: null,
      topLeftCol: null,
      heightCells: height,
      widthCells: width,
    };
    const characters = [...this.state.characters];
    characters.push(newChar);
    this.setState({
      characters,
      placingChar: { ...newChar },
      selectedChar: newChar,
    });
  };

  toggleCharacterCreatorPopup = () => {
    this.setState({
      showCharacterCreatorPopup: !this.state.showCharacterCreatorPopup,
    });
  };

  handleSpellCircleCreation = (stateData) => {
    const { spellName, ownerName, radius, color } = stateData;
    const newCircle = {
      name: spellName,
      owner: ownerName,
      radius,
      row: null,
      col: null,
      color,
    };
    const spellCircles = [...this.state.spellCircles];
    spellCircles.push(newCircle);
    this.setState({
      spellCircles,
      placingCircle: { ...newCircle },
      selectedCircle: newCircle,
    });
  };

  toggleItemDeletionMode = () => {
    const { itemDeletionModeOn, selectedChar } = this.state;
    if (itemDeletionModeOn) {
      this.handleSaveGame();
    }
    if (selectedChar) {
      this.setState({
        selectedChar: null,
        placingChar: null,
        characters: this.getCharsArrWithoutSelection(),
      }); // Cancel character selection
    }
    this.setState({ itemDeletionModeOn: !itemDeletionModeOn });
  };

  toggleSpellCircleCreatorPopup = () => {
    this.setState({
      showSpellCircleCreatorPopup: !this.state.showSpellCircleCreatorPopup,
    });
  };

  togglePlayersLinkPopUp = () => {
    this.setState({ showPlayerLinkPopUp: !this.state.showPlayerLinkPopUp });
  };

  toggleExitWarningPopUp = () => {
    const { showExitWarningPopUp } = { ...this.state };
    this.setState({ showExitWarningPopUp: !showExitWarningPopUp });
  };

  handleSaveGame = () => {
    const {
      authToken,
      rowCount,
      colCount,
      walls,
      cellSize,
      spellCircles,
      characters,
      mapImage,
    } = this.state;
    const gameStateToSave = {
      rowCount,
      colCount,
      walls,
      cellSize,
      spellCircles,
      characters,
      mapImage,
    };
    this.createOrUpdateGameState({ gameState: gameStateToSave }, authToken);
  };

  createOrUpdateGameState(body_object, authToken) {
    this.setState({ updating: true });
    const promiseGet = CallGetGameDataAPI(authToken);
    promiseGet.then((resGet) => {
      if (!resGet) return;
      const apiCall =
        resGet.status !== 200 ? CallSaveNewGameDataAPI : CallUpdateGameDataAPI;
      const promisePost = apiCall(body_object, authToken);
      promisePost.then((resPost) => {
        if (!resPost) return;
        this.setState({ updating: false });
        if (resPost.status !== 200) {
          console.error(resPost.body.error.message);
        }
      });
    });
  }

  showTempMessage(messageText, timeoutMs) {
    this.setState({ tempMessageText: messageText }, () => {
      this.setState({ showTempMessage: true }, () => {
        setTimeout(
          () => this.setState({ showTempMessage: false, tempMessageText: "" }),
          timeoutMs
        );
      });
    });
  }

  handleRegisteredNewUser = () => {
    this.showTempMessage("User registered successfully!", 1500);
  };

  handleStartNewGame = () => {
    this.setState({ showGameMenu: false, toGameMenu: false });
    this.initiateGame();
  };

  handleContinueSavedGame = () => {
    this.setState({ showGameMenu: false, toGameMenu: false });
    const promise = CallGetGameDataAPI(this.state.authToken);
    promise.then((res) => {
      if (!res) return;
      if (res.status !== 200) {
        console.error(res.body.error.message);
      } else {
        if (
          !this.state.selectedChar &&
          !this.state.selectedCircle &&
          !this.state.updating
        )
          this.setStateFromSavedGameData(res.body.gameState);
      }
    });
  };

  handlePasswordResetComplete = () => {
    this.showTempMessage("Password changed successfully!", 2000);
  };

  handleExitToMenu = () => {
    this.setState({ toGameMenu: true });
  };

  handleLogIn = (userName, authToken) => {
    this.setState({ authToken, userName });
  };

  cancelRedirectFromMap = () => {
    this.setState({ toGameMenu: false });
  };

  renderWelcomeScreen() {
    return (
      <ErrorBoundary FallbackComponent={DefaultFallbackComponent}>
        <WelcomeScreen
          onNewGame={this.handleStartNewGame}
          onContinueSavedGame={this.handleContinueSavedGame}
          onRegisteredNewUser={this.handleRegisteredNewUser}
          authToken={this.state.authToken}
          userName={this.state.userName}
          onLogOut={() => this.setState({ authToken: null, userName: "" })}
          onLogIn={this.handleLogIn}
          cancelRedirectFromMap={this.cancelRedirectFromMap}
        />
        {this.state.showTempMessage ? (
          <TempMessage message={this.state.tempMessageText} />
        ) : null}
      </ErrorBoundary>
    );
  }

  renderPasswordResetScreen() {
    return (
      <ErrorBoundary FallbackComponent={DefaultFallbackComponent}>
        <ResetPasswordForm onPasswordReset={this.handlePasswordResetComplete} />
        {this.state.showTempMessage ? (
          <TempMessage message={this.state.tempMessageText} />
        ) : null}
      </ErrorBoundary>
    );
  }

  renderSideBar() {
    const { characters, spellCircles, itemDeletionModeOn } = this.state;
    return (
      <div className="SideBar col-3 bg-primary">
        <ErrorBoundary FallbackComponent={DefaultFallbackComponent}>
          <ActionsMenu
            onCharacterCreation={this.toggleCharacterCreatorPopup}
            onSpellCircleCreation={this.toggleSpellCircleCreatorPopup}
            onCharacterCircleDelete={this.toggleItemDeletionMode}
            onShowPlayersLink={this.togglePlayersLinkPopUp}
            enableDeletion={characters.length > 0 || spellCircles.length > 0}
            itemDeletionModeOn={itemDeletionModeOn}
            onFinishDeletion={this.toggleItemDeletionMode}
            onExitToMenu={this.toggleExitWarningPopUp}
          />
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={DefaultFallbackComponent}>
          <DiceRoller />
        </ErrorBoundary>
      </div>
    );
  }

  getAuthTokenFromParams() {
    const hrefParts = window.location.href.split("/");
    const authToken = hrefParts[hrefParts.length - 1];
    return authToken;
  }

  renderMapArea(gameMaster = true) {
    const {
      rowCount,
      colCount,
      walls,
      cellSize,
      borderWidth,
      selectedChar,
      characters,
      selectedCircle,
      spellCircles,
      matrix,
      placingChar,
      itemDeletionModeOn,
      placingCircle,
      mapImage,
    } = this.state;

    const map_width = gameMaster ? "col-9" : "col";
    return (
      <div className={"MapArea h-100 p-0 " + map_width}>
        <ErrorBoundary FallbackComponent={DefaultFallbackComponent}>
          <MapCanvas
            rowCount={rowCount}
            colCount={colCount}
            walls={walls}
            cellSize={cellSize}
            borderWidth={borderWidth}
            selectedChar={selectedChar}
            characters={characters}
            selectedCircle={selectedCircle}
            spellCircles={spellCircles}
            matrix={matrix}
            onCellClick={this.handleCellClick}
            onCharClick={this.handleCharClick}
            onCalcCharPosition={this.calcCharPosition}
            onCalcSpellCirclePosition={this.calcSpellCirclePosition}
            onMouseEnterCell={this.handleMouseEnterCell}
            placingChar={placingChar}
            itemDeletionModeOn={itemDeletionModeOn}
            onSpellCircleClick={this.handleSpellCircleClick}
            placingCircle={placingCircle}
            mapImage={mapImage}
          ></MapCanvas>
        </ErrorBoundary>
      </div>
    );
  }

  renderPopUps() {
    const {
      showTempMessage,
      tempMessageText,
      showCharacterCreatorPopup,
      showSpellCircleCreatorPopup,
      showPlayerLinkPopUp,
      showExitWarningPopUp,
    } = this.state;
    return (
      <Fragment>
        {showCharacterCreatorPopup ? (
          <ErrorBoundary FallbackComponent={DefaultFallbackComponent}>
            <CharacterCreatorPopUp
              closePopup={this.toggleCharacterCreatorPopup}
              onCharacterCreation={this.handleCharacterCreation}
            />
          </ErrorBoundary>
        ) : null}
        {showSpellCircleCreatorPopup ? (
          <ErrorBoundary FallbackComponent={DefaultFallbackComponent}>
            <SpellCircleCreatorPopUp
              closePopup={this.toggleSpellCircleCreatorPopup}
              onSpellCircleCreation={this.handleSpellCircleCreation}
            />
          </ErrorBoundary>
        ) : null}
        {showPlayerLinkPopUp ? (
          <ErrorBoundary FallbackComponent={DefaultFallbackComponent}>
            <PlayersLinkPopUp
              closePopup={this.togglePlayersLinkPopUp}
              onCopyToClipboard={() =>
                this.showTempMessage("Link copied to clipboard", 1500)
              }
              gameLink={PLAYERS_GAME_URL + this.state.authToken}
            />
          </ErrorBoundary>
        ) : null}
        {showExitWarningPopUp ? (
          <ErrorBoundary FallbackComponent={DefaultFallbackComponent}>
            <ExitWarningPopUp
              closePopup={this.toggleExitWarningPopUp}
              onExitToMenu={this.handleExitToMenu}
            />
          </ErrorBoundary>
        ) : null}
        {showTempMessage ? <TempMessage message={tempMessageText} /> : null}
      </Fragment>
    );
  }

  renderNotLoggedInError() {
    return (
      <div className="HomeBg">
        <div className="HomeBgContent">
          <ul className="MenuUl bg-dark w-100">
            <h4 className="mb-4">
              <span className="creatorHeader">Hey... unknown user!</span>
              <br></br>
              <br></br>
              Oops! You can't see the game map if you're not logged in :)
              <br></br>
              Please log in to play.
            </h4>
            <Link to="/home/login">Login Here</Link>
          </ul>
        </div>
      </div>
    );
  }

  renderMapMainScreen() {
    if (this.state.authToken) {
      return (
        <div className="row h-100 w-100 p-0">
          {this.renderMapArea()}
          {this.renderSideBar()}
          {this.renderPopUps()})
        </div>
      );
    } else {
      return this.renderNotLoggedInError();
    }
  }

  render() {
    return (
      <Fragment>
        <Switch>
          <Redirect exact from="/" to="/home" />
          {this.state.toGameMenu ? (
            <Redirect exact push from="/map" to="/home" />
          ) : null}
          <Route path="/reset">{this.renderPasswordResetScreen()}</Route>
          <Route path="/map">{this.renderMapMainScreen()}</Route>
          <Route path="/home">{this.renderWelcomeScreen()}</Route>
          <Route path="/game">
            <div className="row h-100 w-100 p-0">
              {this.renderMapArea(false)}
            </div>
          </Route>
        </Switch>
        <Persist
          name="dnd-app"
          data={this.state}
          debounce={500}
          onMount={(data) => this.setState(data)}
        />
      </Fragment>
    );
  }
}

export default App;
