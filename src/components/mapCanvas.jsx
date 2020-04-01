import React, { Component } from "react";
import { MapInteractionCSS } from "react-map-interaction";
import "bootstrap/dist/css/bootstrap.min.css";

class MapCanvas extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      scale: 1,
      translation: { x: 0, y: 0 }
    };
  }

  render() {
    const { scale, translation } = this.state;
    return (
      <MapInteractionCSS
        scale={scale}
        translation={translation}
        onChange={({ scale, translation }) =>
          this.setState({ scale, translation })
        }
      >
        <img
          src="https://dicegrimorium.com/wp-content/uploads/2019/07/ForestPathPublic-1024x1024.jpg"
          alt="Map Image"
          className="img-fluid mx-auto d-block"
          style={{
            height: "100%",
            width: "96%",
            align: "center",
            border: "10px red double",
            overflow: "hidden"
          }}
        />
      </MapInteractionCSS>
    );
  }
}

export default MapCanvas;
