import React, { Component } from "react";
const gridSide = 500; //pixel width/height of graph view

export default class Graph extends Component {
  state = {
    intendedDepth: 9, //initial precision of graph
    showGrid: false //whether grid lines are visible,
  };
  componentDidMount() {
    // set 1 second timer to increment depth of recursion till 9, remove grid, and reset
    setInterval(() => {
      if (!this.props.showAnimation) {
        this.setState({
          intendedDepth: 9,
          showGrid: false
        });
      } else if (!this.state.showGrid) {
        this.setState({ showGrid: true, intendedDepth: 1 });
      } else if (this.state.intendedDepth === 9) {
        this.setState({ showGrid: false });
      } else {
        this.setState({ intendedDepth: this.state.intendedDepth + 1 });
      }
    }, 1000);
  }
  isSignChange = (a, b) => {
    //return whether a and b have different signs
    return (a >= 0 && b <= 0) || (a <= 0 && b >= 0);
  };
  getPixelBounds = (i, j, granularity) => {
    const { magnitude } = this.props;
    //get real value bounds of 'pixel' [[xMin,xMax],[yMin,yMax]]
    return [
      [
        -1 * magnitude + (j * 2 * magnitude) / granularity,
        -1 * magnitude + ((j + 1) * 2 * magnitude) / granularity
      ],
      [
        magnitude - ((i + 1) * 2 * magnitude) / granularity,
        magnitude - (i * 2 * magnitude) / granularity
      ]
    ];
  };
  randomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };
  isValidPixel = (i, j, granularity) => {
    const { eqn } = this.props;

    let pixelBounds = this.getPixelBounds(i, j, granularity);

    let xMin = pixelBounds[0][0];
    let xMax = pixelBounds[0][1];
    let yMin = pixelBounds[1][0];
    let yMax = pixelBounds[1][1];

    //return whether a sign change occurs within 'pixel' by checking diagonal corners
    if (
      this.isSignChange(eqn(xMin, yMin), eqn(xMax, yMax)) ||
      this.isSignChange(eqn(xMin, yMax), eqn(xMax, yMin))
    ) {
      return true;
    }

    //randomly sample 50 pairs of points to check for a possible sign change
    for (let i = 0; i < 50; i++) {
      if (
        this.isSignChange(
          eqn(this.randomNumber(xMin, xMax), this.randomNumber(yMin, yMax)),
          eqn(this.randomNumber(xMin, xMax), this.randomNumber(yMin, yMax))
        )
      ) {
        return true;
      }
    }
    return false;
  };
  recursivelyGenerateGraph = (x, y, granularity, width, factor, depth) => {
    //base case - draw shaded in pixel
    if (depth === this.state.intendedDepth) {
      return (
        <div
          style={{
            backgroundColor: "#499DF5",
            width: width,
            height: width
          }}
        />
      );
    }
    //further divide graph and if pixel is contained within square, re-call 'recursivelyGenerateGraph'
    return (
      <div>
        {Array(factor)
          .fill()
          .map((_, i) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row"
                }}
              >
                {Array(factor)
                  .fill()
                  .map((_, j) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          boxSizing: "border-box",
                          border:
                            this.state.showGrid && depth <= 4
                              ? "1px solid lightGray"
                              : null,
                          width: width / factor,
                          height: width / factor,
                          backgroundColor: "white"
                        }}
                      >
                        {this.isValidPixel(
                          x * factor + i,
                          y * factor + j,
                          granularity * factor
                        )
                          ? this.recursivelyGenerateGraph(
                              x * factor + i,
                              y * factor + j,
                              granularity * factor,
                              width / factor,
                              factor,
                              depth + 1
                            )
                          : null}
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    );
  };
  render() {
    return (
      // begin with single square and recursively generate graph
      this.recursivelyGenerateGraph(0, 0, 1, gridSide, 2, 0)
    );
  }
}
