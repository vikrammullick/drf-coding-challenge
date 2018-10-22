import React, { Component } from "react";
import ToggleButton from "react-toggle-button";
import Graph from "./Graph";

// add implicit graphs equations here to try it out!!!
// eqn is the equation in the form f(x,y) = 0
// magnitude is the intended axes length for the graph

const graphs = {
  circle: {
    eqn: (x, y) => {
      //implict function for a circle
      return 1 - x * x - y * y;
    },
    magnitude: 1.1
  },
  heart: {
    eqn: (x, y) => {
      //implict function for a heart
      return Math.pow(x * x + y * y - 1, 3) - x * x * y * y * y;
    },
    magnitude: 1.7
  },
  pattern: {
    eqn: (x, y) => {
      //implict function for a neat pattern
      return Math.sin(x * x + y * y) - Math.cos(x * y);
    },
    magnitude: 3
  },
  clover: {
    eqn: (x, y) => {
      //implict function for a clover
      return Math.pow(x * x + y * y, 3) - 12 * x * x * y * y;
    },
    magnitude: 2
  },
  wacky: {
    eqn: (x, y) => {
      //implicit function for wacky pattern
      return Math.sin(x + 2 * Math.sin(y)) - Math.cos(y + 3 * Math.cos(x));
    },
    magnitude: 10
  },
  ellipse: {
    eqn: (x, y) => {
      //implict function for an ellipse
      return 1 - (x * x) / 2 - y * y;
    },
    magnitude: 2
  },
  hyperbola: {
    eqn: (x, y) => {
      //implict function for a hyperbola
      return 1 - x * x + y * y;
    },
    magnitude: 3
  },
  sin: {
    eqn: (x, y) => {
      //implict function for a sin curve
      return y - Math.sin(x);
    },
    magnitude: 3
  },
  concentric_circles: {
    eqn: (x, y) => {
      //implict function for concentric circles
      return Math.sin(Math.PI * Math.sqrt(x * x + y * y));
    },
    magnitude: 5
  }
};

export default class App extends Component {
  state = {
    type: "circle",
    showAnimation: false
  };
  handleGraphChange = event => {
    this.setState({ type: event.target.value });
  };
  render() {
    const { type, showAnimation } = this.state;
    return (
      <div
        style={{
          marginTop: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <div
          style={{
            width: 500,
            padding: 20,
            borderRadius: 20,
            border: "1px solid black"
          }}
        >
          {/* Graph component is below */}
          <Graph
            eqn={graphs[type].eqn}
            magnitude={graphs[type].magnitude}
            showAnimation={showAnimation}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 500,
              marginTop: 20
            }}
          >
            <text style={{ marginBottom: 5 }}>Choose Graph</text>
            {/* Drop down to choose graph */}
            <select value={type} onChange={this.handleGraphChange}>
              {Object.keys(graphs).map(key => {
                return <option value={key}>{key}</option>;
              })}
            </select>

            <text style={{ marginTop: 5, marginBottom: 5 }}>
              Toggle Animation
            </text>
            <ToggleButton
              value={showAnimation}
              onToggle={value => {
                this.setState({ showAnimation: !value });
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
