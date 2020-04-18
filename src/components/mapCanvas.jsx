import React, { Component } from "react";
import { MapInteractionCSS } from "react-map-interaction";
import "./MapCanvas.scss";
import BoardMap from "./BoardMap";

class MapCanvas extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      scale: 1.8,
      translation: { x: 0, y: 0 },
    };
  }

  getDynamicStyle() {
    const { mapImage } = this.props;
    const backgroundImage = mapImage.url
      ? `url(${mapImage.url})`
      : mapImage.file;
    return {
      height: this.props.cellSize * this.props.rowCount,
      width: this.props.cellSize * this.props.colCount,
      backgroundImage,
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
      onCalcCharPosition,
      onMouseEnterCell,
      placingChar,
      itemDeletionModeOn,
      spellCircles,
      onSpellCircleClick,
      onCalcSpellCirclePosition,
      placingCircle,
      selectedCircle,
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
        <div className="MapCanvas-bg-img" style={this.getDynamicStyle()}>
          <BoardMap
            rowCount={rowCount}
            colCount={colCount}
            matrix={matrix}
            cellSize={cellSize}
            borderWidth={borderWidth}
            selectedChar={selectedChar}
            characters={characters}
            selectedCircle={selectedCircle}
            spellCircles={spellCircles}
            onCellClick={onCellClick}
            onCharClick={onCharClick}
            onCalcCharPosition={onCalcCharPosition}
            onMouseEnterCell={onMouseEnterCell}
            placingChar={placingChar}
            itemDeletionModeOn={itemDeletionModeOn}
            onSpellCircleClick={onSpellCircleClick}
            onCalcSpellCirclePosition={onCalcSpellCirclePosition}
            placingCircle={placingCircle}
          />
        </div>
      </MapInteractionCSS>
    );
  }
}

export default MapCanvas;
