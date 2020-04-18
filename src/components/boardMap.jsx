import React, { Component } from "react";
import MapCell from "./MapCell1";
import Character from "./Character1";
import SpellCircle from "./SpellCircle1";
import "./BoardMap.scss";
import { CURSOR_IMAGES } from "../constants";

class BoardMap extends Component {
  render() {
    const {
      matrix,
      selectedChar,
      characters,
      selectedCircle,
      spellCircles,
      cellSize,
      borderWidth,
      onCellClick,
      onCharClick,
      onCalcCharPosition,
      onMouseEnterCell,
      placingChar,
      itemDeletionModeOn,
      onSpellCircleClick,
      onCalcSpellCirclePosition,
      placingCircle,
    } = this.props;

    const bgDesignClass = this.props.itemDeletionModeOn
      ? "deletion-mode-bg"
      : "";

    return (
      <div>
        <div>
          {matrix.map((row, i) => (
            <div key={i}>
              {row.map((cell, j) => (
                <MapCell
                  key={j}
                  cell={cell}
                  cellSize={cellSize}
                  onClick={onCellClick}
                  borderWidth={borderWidth}
                  cursorHover={
                    placingCircle || placingChar
                      ? `url(${CURSOR_IMAGES.pointer}), pointer`
                      : `url(${CURSOR_IMAGES.move}), move`
                  }
                  onMouseEnterCell={onMouseEnterCell}
                />
              ))}
            </div>
          ))}
        </div>
        <div className={bgDesignClass}>
          {spellCircles.map((spellCircle, i) => (
            <SpellCircle
              key={i}
              spellCircle={spellCircle}
              borderWidth={borderWidth}
              position={onCalcSpellCirclePosition(spellCircle)}
              onClick={onSpellCircleClick}
              itemDeletionModeOn={itemDeletionModeOn}
              placingCircle={placingCircle}
              clickable={
                (!placingChar && !placingCircle && !itemDeletionModeOn) ||
                itemDeletionModeOn
              }
              selected={selectedCircle === spellCircle}
            />
          ))}
          {placingCircle ? (
            <SpellCircle
              spellCircle={placingCircle}
              borderWidth={borderWidth}
              position={onCalcSpellCirclePosition(placingCircle)}
              onClick={onSpellCircleClick}
              itemDeletionModeOn={itemDeletionModeOn}
              placingCircle={placingCircle}
              clickable={false}
              selected={false}
            />
          ) : null}
          {characters.map((char, i) => (
            <Character
              key={i}
              character={char}
              selected={selectedChar === char}
              position={onCalcCharPosition(char)}
              onClick={onCharClick}
              borderWidth={borderWidth}
              transparent={placingChar === char}
              itemDeletionModeOn={itemDeletionModeOn}
              clickable={
                (!placingChar && !placingCircle && !itemDeletionModeOn) ||
                itemDeletionModeOn
              }
            />
          ))}
          {placingChar ? (
            <Character
              character={placingChar}
              selected={false}
              position={onCalcCharPosition(placingChar)}
              onClick={onCharClick}
              borderWidth={borderWidth}
              transparent={true}
              itemDeletionModeOn={itemDeletionModeOn}
              clickable={false}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default BoardMap;
