import React, { Component, Fragment } from "react";
import "./App.scss";
import "./.common.scss";
import DiceRoller from "./DiceRoller";
import "bootstrap/dist/css/bootstrap.min.css";
import MapCanvas from "./MapCanvas";
import CharacterCreatorPopUp from "./CharacterCreatorPopUp";
import ActionsMenu from "./ActionsMenu";
import CloneDeep from "lodash/cloneDeep";
import ErrorBoundary from "react-error-boundary";
import {
  DefaultFallbackComponent,
  GUEST_NAME_CHARS,
  GUEST_NAME_LENGTH,
} from "../constants";
import getGameData from "../services/getUserGameData";
import saveNewGameData from "../services/saveNewGameData";
import updateGameData from "../services/updateGameData";
import eraseGameData from "../services/eraseUserGameData";
import SpellCircleCreatorPopUp from "./SpellCircleCreatorPopUp";
import WelcomeScreen from "./WelcomeScreen";
import TempMessage from "./TempMessage";
import ResetPasswordForm from "./ResetPasswordForm";
import ExitToMenuWarningPopUp from "./ExitToMenuWarningPopUp";
import ExitToHomeWarningPopUp from "./ExitToHomeWarningPopUp";
import { Persist } from "react-persist";
import { Route, Redirect, Switch, Link } from "react-router-dom";
import PlayersLinkPopUp from "./PlayersLinkPopUp";
import { PLAYERS_GAME_URL } from "../constants";
import withSizes from "react-sizes";
import registerNewUser from "../services/registerNewUser";
import loginUser from "../services/loginUser";

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
    toHomeScreen: false,
    updating: false,
    showPlayerLinkPopUp: false,
    gameMaster: true,
    initializing: false,
    isGuest: false,
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
    this.setState({ characters }, () => {
      this.handleSaveGame();
      if (characters.length === 0 && this.state.spellCircles.length === 0) {
        this.toggleItemDeletionMode();
      }
    });
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
    this.setState({ spellCircles }, () => {
      this.handleSaveGame();
      if (this.state.characters.length === 0 && spellCircles.length === 0) {
        this.toggleItemDeletionMode();
      }
    });
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
      this.setState({ gameMaster: false });
      const authToken = this.getAuthTokenFromParams();
      if (authToken) {
        this.setState({ authToken });
      }
    }
    this.updateMapIntervalID = setInterval(() => {
      const { authToken, selectedChar, selectedCircle } = this.state;
      if (authToken && !selectedChar && !selectedCircle) {
        this.handleContinueSavedGame();
      }
    }, 1000);
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.handleKeyUp, false);
    if (this.updateMapIntervalID) clearInterval(this.updateMapIntervalID);
    // I need to add deletion of guest users in server here, but currently I leave them in the DB because I want to see if someone new had visited my app.
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

  toggleExitToMenuWarningPopUp = () => {
    const { showExitToMenuWarningPopUp } = { ...this.state };
    this.setState({ showExitToMenuWarningPopUp: !showExitToMenuWarningPopUp });
  };

  toggleExitToHomeWarningPopUp = () => {
    const { showExitToHomeWarningPopUp } = { ...this.state };
    this.setState({ showExitToHomeWarningPopUp: !showExitToHomeWarningPopUp });
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

  async createOrUpdateGameState(body_object, authToken) {
    this.setState({ updating: true });
    const resGet = await getGameData(authToken);
    if (!resGet) return;
    const serviceCall =
      resGet.status !== 200 ? saveNewGameData : updateGameData;

    const resPost = await serviceCall(body_object, authToken);
    if (!resPost) return;
    this.setState({ updating: false, initializing: false });
    if (resPost.status !== 200) console.error(resPost.body.error.message);
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

  handleStartNewGame = async () => {
    this.setState({
      showGameMenu: false,
      toHomeScreen: false,
      gameMaster: true,
      updating: true,
      initializing: true,
    });
    const res = await eraseGameData(this.state.authToken);
    if (!res) return;
    this.setState({ updating: false });
    if (
      res.status === 200 ||
      res.body.error.message == "Couldn't find game data to delete"
    ) {
      this.initiateGame();
      this.handleSaveGame();
    } else {
      console.debug(res.body.error.message);
      this.setState({ initializing: false });
    }
  };

  handleContinueSavedGame = async () => {
    this.setState({ showGameMenu: false, toHomeScreen: false });
    const res = await getGameData(this.state.authToken);
    if (!res) return;
    if (
      res.status !== 200 &&
      res.body.error != "Couldn't find game data to retrieve"
    ) {
      console.debug(res.body.error.message);
    } else {
      if (
        !this.state.selectedChar &&
        !this.state.selectedCircle &&
        !this.state.updating
      )
        this.setStateFromSavedGameData(res.body.gameState);
    }
  };

  handleEnterSavedGameAsMaster = () => {
    this.setState({ gameMaster: true });
    this.handleContinueSavedGame();
  };

  handlePasswordResetComplete = () => {
    this.showTempMessage("Password changed successfully!", 2000);
  };

  handleExitToMenu = () => {
    this.setState({ toHomeScreen: true });
  };

  handleExitToHome = () => {
    this.setState({ toHomeScreen: true, authToken: "", isGuest: false });
  };

  handleLogIn = (userName, authToken) => {
    this.setState({ authToken, userName, isGuest: userName === "Guest" });
  };

  handleGuestEntry = async () => {
    this.setState({ initializing: true, showGameMenu: false });
    const randomUserName = this.getGuestRandomUserName();
    const guestEmail = randomUserName + "@fakeemail.com";
    const guestPassword = "fakepassword";
    const registerRes = await registerNewUser({
      userName: randomUserName,
      email: guestEmail,
      password: guestPassword,
    });
    if (!registerRes) return;
    if (registerRes.status !== 200) {
      this.setState({ initializing: false });
    } else {
      this.loginGuest({ email: guestEmail, password: guestPassword });
    }
  };

  async loginGuest(guestDetails) {
    const loginRes = await loginUser(guestDetails);
    if (!loginRes) return;
    if (loginRes.status !== 200) {
      this.setState({ initializing: false });
    } else {
      this.handleLogIn("Guest", loginRes.body.authToken);
      this.handleStartNewGame();
    }
  }

  getGuestRandomUserName() {
    let userName = "Guest_";
    for (let i = 0; i < GUEST_NAME_LENGTH; i++) {
      userName += GUEST_NAME_CHARS.charAt(
        Math.floor(Math.random() * GUEST_NAME_CHARS.length)
      );
    }
    return userName;
  }

  cancelRedirectFromMap = () => {
    this.setState({ toHomeScreen: false });
  };

  getAuthTokenFromParams() {
    const hrefParts = window.location.href.split("/");
    const authToken = hrefParts[hrefParts.length - 1];
    return authToken;
  }

  renderWelcomeScreen() {
    return (
      <ErrorBoundary FallbackComponent={DefaultFallbackComponent}>
        <WelcomeScreen
          onNewGame={this.handleStartNewGame}
          onContinueSavedGame={this.handleEnterSavedGameAsMaster}
          onRegisteredNewUser={this.handleRegisteredNewUser}
          authToken={this.state.authToken}
          userName={this.state.userName}
          onLogOut={() => this.setState({ authToken: null, userName: "" })}
          onLogIn={this.handleLogIn}
          cancelRedirectFromMap={this.cancelRedirectFromMap}
          onGuestEntry={this.handleGuestEntry}
          isGuest={this.state.isGuest}
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
    const {
      characters,
      spellCircles,
      itemDeletionModeOn,
      gameMaster,
      isGuest,
    } = this.state;
    const sideBarClass = `side-bar bg-primary col-${
      this.props.isSmallerScreen ? 4 : 3
    }`;
    return (
      <div className={sideBarClass}>
        <ErrorBoundary FallbackComponent={DefaultFallbackComponent}>
          <ActionsMenu
            onCharacterCreation={this.toggleCharacterCreatorPopup}
            onSpellCircleCreation={this.toggleSpellCircleCreatorPopup}
            onCharacterCircleDelete={this.toggleItemDeletionMode}
            onShowPlayersLink={this.togglePlayersLinkPopUp}
            enableDeletion={characters.length > 0 || spellCircles.length > 0}
            itemDeletionModeOn={itemDeletionModeOn}
            onFinishDeletion={this.toggleItemDeletionMode}
            onExitToMenu={this.toggleExitToMenuWarningPopUp}
            onExitToHome={this.toggleExitToHomeWarningPopUp}
            gameMaster={gameMaster}
            isGuest={isGuest}
          />
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={DefaultFallbackComponent}>
          <DiceRoller />
        </ErrorBoundary>
      </div>
    );
  }

  renderMapArea() {
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

    const mapAreaClass = `map-area h-100 p-0 col-${
      this.props.isSmallerScreen ? 8 : 9
    }`;

    return (
      <div className={mapAreaClass}>
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
      showExitToMenuWarningPopUp,
      showExitToHomeWarningPopUp,
      gameMaster,
      initializing,
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
        {showPlayerLinkPopUp && gameMaster ? (
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
        {showExitToMenuWarningPopUp && gameMaster ? (
          <ErrorBoundary FallbackComponent={DefaultFallbackComponent}>
            <ExitToMenuWarningPopUp
              closePopup={this.toggleExitToMenuWarningPopUp}
              onExitToMenu={this.handleExitToMenu}
            />
          </ErrorBoundary>
        ) : null}
        {showExitToHomeWarningPopUp && gameMaster ? (
          <ErrorBoundary FallbackComponent={DefaultFallbackComponent}>
            <ExitToHomeWarningPopUp
              closePopup={this.toggleExitToHomeWarningPopUp}
              onExitToHome={this.handleExitToHome}
            />
          </ErrorBoundary>
        ) : null}
        {showTempMessage ? <TempMessage message={tempMessageText} /> : null}
        {initializing ? <TempMessage message={"Initializing..."} /> : null}
      </Fragment>
    );
  }

  renderNotLoggedInError() {
    return (
      <div className="menu-bg-home">
        <div className="menu-window">
          <ul className="menu bg-dark w-100">
            <h4 className="mb-4">
              <span className="menu-header">Hey... unknown user!</span>
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
    if (this.state.authToken || this.state.initializing) {
      return (
        <div className="row h-100 w-100 p-0">
          {this.renderMapArea()}
          {this.renderSideBar()}
          {this.renderPopUps()}
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
          {this.state.toHomeScreen ? (
            <Redirect exact push from="/map" to="/home" />
          ) : null}
          <Route path="/reset">{this.renderPasswordResetScreen()}</Route>
          <Route path="/map">{this.renderMapMainScreen()}</Route>
          <Route path="/home">{this.renderWelcomeScreen()}</Route>
          <Route path="/game">{this.renderMapMainScreen()}</Route>
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

const mapSizesToProps = ({ width }) => ({
  isSmallerScreen: width < 1800,
});

export default withSizes(mapSizesToProps)(App);
