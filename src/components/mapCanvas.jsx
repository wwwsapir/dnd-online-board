import React, { Component } from "react";
import { MapInteractionCSS } from "react-map-interaction";
import "./mapCanvas.css";
import BoardMap from "./boardMap";

class MapCanvas extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      scale: 2,
      translation: { x: 0, y: 0 }
    };
  }

  getStyle() {
    return {
      mapBgImg: {
        height: this.props.cellSize * this.props.rowCount,
        width: this.props.cellSize * this.props.colCount
      }
    };
  }

  render() {
    const {
      rowCount,
      colCount,
      matrix,
      cellSize,
      borderWidth,
      selectedChar,
      characters,
      onCellClick,
      onCharClick,
      onCalcCharPosition
    } = this.props;
    const { scale, translation } = this.state;

    return (
      <MapInteractionCSS
        scale={scale}
        translation={translation}
        onChange={({ scale, translation }) =>
          this.setState({ scale, translation })
        }
      >
        <div className="MapBgImg" style={this.getStyle().mapBgImg}>
          <BoardMap
            rowCount={rowCount}
            colCount={colCount}
            matrix={matrix}
            cellSize={cellSize}
            borderWidth={borderWidth}
            selectedChar={selectedChar}
            characters={characters}
            onCellClick={onCellClick}
            onCharClick={onCharClick}
            onCalcCharPosition={onCalcCharPosition}
          />
        </div>
      </MapInteractionCSS>
    );
  }
}

export default MapCanvas;
