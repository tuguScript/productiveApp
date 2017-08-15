import React, { Component } from "react";
import CircularProgress from "material-ui/CircularProgress";

const styles = {
  root: {
    display: "flex",
    margin: "0 auto",
    maxWidth: "500px",
    // justifyContent: 'center',
    flexDirection: "column"
  }
};

const getFormatTypes = [
  { type: "code", time: 1500 },
  { type: "rest", time: 300 },
  { type: "social", time: 900 }
];

export default class PomodoroTimer extends Component {
  constructor() {
    super();
    this.elapseTime = this.elapseTime.bind(this);
    this.state = {
      time: 1500,
      play: false,
      type: 0,
      title: "",
      interval: 0,
      circumference: 1230,
      anhniiTime: 1500
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.time != null) {
      let millisecond = nextProps.time * 60;
      this.setState({ time: millisecond, anhniiTime: millisecond, play: false, circumference: 1230 });
    }
  }
  updateCircle() {}
  elapseTime() {
    if (this.state.time === 0) {
      this.reset(0);
      //   this.alert();
    }
    if (this.state.play === true) {
      let newState = this.state.time - 1;
      let too = 1230 / this.state.anhniiTime;
      this.setState({
        time: newState,
        circumference: this.state.circumference - too
      });
    }
  }
  reset(resetFor = this.state.time) {
    clearInterval(this.interval);
    switch (this.state.type) {
      case 0:
        this.setState({
          type: 1,
          time: getFormatTypes[1].time,
          interval: ++this.state.interval,
          circumference: 1230
        });
        break;
      case 1:
        this.setState({
          type: 0,
          time: getFormatTypes[0].time,
          circumference: 1230
        });
        break;
      case 2:
        this.setState({
          type: 0,
          time: getFormatTypes[0].time,
          circumference: 1230
        });
        break;
      default:
        this.setState({
          type: 0,
          time: getFormatTypes[0].time,
          circumference: 1230
        });
        break;
    }
    this.setState({ play: false });
  }
  restartInterval() {
    clearInterval(this.interval);
    this.interval = setInterval(this.elapseTime, 1000);
  }
  format(seconds) {
    let m = Math.floor(seconds % 3600 / 60);
    let s = Math.floor(seconds % 3600 % 60);
    let timeFormated = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
    return timeFormated;
  }
  play() {
    if (true === this.state.play) return;

    this.restartInterval();

    this.setState({
      play: true
    });
  }
  render() {
    return (
      <div style={styles.root}>
        <div style={{ margin: "0 auto" }}>
          <svg
            width="400"
            height="400"
            class="progress"
            // style={{ transform: "rotate(-90deg)" }}
          >
            <circle
              cx="200"
              cy="200"
              r="192"
              fill="none"
              stroke="#e6e6e6"
              strokeWidth="8"
            />
            <circle
              cx="200"
              cy="200"
              r="192"
              fill="none"
              stroke="#f77a52"
              strokeWidth="8"
              strokeDasharray="1230"
              strokeDashoffset={this.state.circumference}
            />
            <text x="150" y="197" text-anchor="middle" fill="black" style={{textSize: '20px'}}>
              <tspan>
                <a style={{fontSize: '3em'}}>{this.format(this.state.time)}</a>
              </tspan>
            </text>
          </svg>

          {this.state.play
            ? <button
                type="button"
                onClick={() => this.setState({ play: false })}
              >
                Pause
              </button>
            : <button type="button" onClick={() => this.play()}>
                Start
              </button>}
          <h2 style={{ textAlign: "center" }}>
            Today: {this.state.interval}/10
          </h2>
        </div>
      </div>
    );
  }
}
