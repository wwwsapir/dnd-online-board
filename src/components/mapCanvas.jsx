import React, { Component } from "react";
import { MapInteractionCSS } from "react-map-interaction";
import "bootstrap/dist/css/bootstrap.min.css";
import "./mapCanvas.css";
import BoardMap from "./boardMap";

class MapCanvas extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      scale: 1,
      translation: { x: 0, y: 0 }
    };
  }

  //   className="MapBgImg"
  //             style={this.style.mapBgImg}
  //             rowCount={rowCount}
  //             colCount={colCount}
  //             walls={walls}
  //             cellSize={this.state.cellSize}
  //             borderWidth={this.state.borderWidth}
  //             characters={this.state.characters}

  //   componentDidMount() {
  //     const canvas = this.refs.canvas;
  //     const ctx = canvas.getContext("2d");
  //     const img = this.refs.bgImage;
  //     img.onload = () => {
  //       ctx.drawImage(img, 0, 0);
  //     };
  //   }

  getStyle() {
    return {
      mapBgImg: {
        height:
          (this.props.cellSize + this.props.borderWidth * 2) *
          this.props.rowCount,
        width:
          (this.props.cellSize + this.props.borderWidth * 2) *
          this.props.colCount
      }
    };
  }

  render() {
    const {
      rowCount,
      colCount,
      walls,
      cellSize,
      borderWidth,
      characters
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
        {/* <canvas ref="canvas" className="canvas mx-auto d-block"></canvas>
        <img
          ref="bgImage"
          src="https://dicegrimorium.com/wp-content/uploads/2019/07/ForestPathPublic-1024x1024.jpg"
          alt="Map Image"
          className="img-fluid mx-auto d-none bgImage"
          hidden
        />
        <img
          ref="fighterImage"
          src="https://drive.google.com/uc?id=1HJxgNpcvnkyH2Bx36ynbQgIhmBPK1XfA"
          alt="Fighter Image"
          className="d-none"
        /> */}
        <div className="MapBgImg">
          <BoardMap
            style={this.getStyle().mapBgImg}
            rowCount={rowCount}
            colCount={colCount}
            walls={walls}
            cellSize={cellSize}
            borderWidth={borderWidth}
            characters={characters}
          />
        </div>
      </MapInteractionCSS>
    );
  }
}

export default MapCanvas;
