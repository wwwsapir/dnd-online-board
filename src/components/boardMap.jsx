import React, { Component } from "react";
import MapCell from "./mapCell";
import Character from "./character";
import "./boardMap.css";

class BoardMap extends Component {
  getBackgroundClass() {
    return this.props.itemDeletionModeOn ? "DeletionMode" : "";
  }

  render() {
    const {
      matrix,
      selectedChar,
      characters,
      circles,
      cellSize,
      borderWidth,
      onCellClick,
      onCharClick,
      onCalcCharPosition,
      onMouseEnterCell,
      placingChar,
      itemDeletionModeOn
    } = this.props;

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
                  cursorHover={selectedChar ? "pointer" : "move"}
                  onMouseEnterCell={onMouseEnterCell}
                />
              ))}
            </div>
          ))}
        </div>
        <div className={this.getBackgroundClass()}>
          {characters.map((char, i) => (
            <Character
              key={i}
              character={char}
              selected={selectedChar === char}
              position={onCalcCharPosition(char)}
              onClick={onCharClick}
              borderWidth={borderWidth}
              cursorHover={selectedChar ? "auto" : "pointer"}
              transparent={placingChar === char}
              itemDeletionModeOn={itemDeletionModeOn}
            />
          ))}
          {/* {Circles drawing area} */}
        </div>
      </div>
    );
  }
}

export default BoardMap;
