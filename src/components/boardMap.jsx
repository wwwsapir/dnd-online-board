import React, { Component } from "react";
import MapCell from "./mapCell";
import Character from "./character";

class BoardMap extends Component {
  render() {
    const {
      matrix,
      selectedChar,
      characters,
      cellSize,
      borderWidth,
      onCellClick,
      onCharClick,
      onCalcCharPosition
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
                />
              ))}
            </div>
          ))}
        </div>
        <div>
          {characters.map((char, i) => (
            <Character
              key={i}
              character={char}
              selected={selectedChar === char}
              position={onCalcCharPosition(char)}
              onClick={onCharClick}
              borderWidth={borderWidth}
              cursorHover={selectedChar ? "auto" : "pointer"}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default BoardMap;
