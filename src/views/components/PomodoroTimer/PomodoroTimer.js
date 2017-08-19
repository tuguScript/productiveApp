import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import PlayArrow from "material-ui/svg-icons/av/play-arrow";
import Pause from "material-ui/svg-icons/av/pause";

const styles = {
  root: {
    display: "flex",
    margin: "0 auto",
    maxWidth: "500px",
    // justifyContent: 'center',
    flexDirection: "column"
  },
  button: {
    margin: 12
  },
  headline: {
    fontSize: 24,
    marginBottom: 12,
    fontWeight: 400
  }
};

const getFormatTypes = [
  { type: "code", time: 1500 },
  { type: "rest", time: 300 },
  { type: "social", time: 900 }
];

const circumference = 916;

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
      circumference: circumference,
      anhniiTime: 1500
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.time != null) {
      let millisecond = nextProps.time * 60;
      this.setState({
        time: millisecond,
        anhniiTime: millisecond,
        play: false,
        circumference: circumference
      });
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
      let too = circumference / this.state.anhniiTime;
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
          circumference: circumference
        });
        break;
      case 1:
        this.setState({
          type: 0,
          time: getFormatTypes[0].time,
          circumference: circumference
        });
        break;
      case 2:
        this.setState({
          type: 0,
          time: getFormatTypes[0].time,
          circumference: circumference
        });
        break;
      default:
        this.setState({
          type: 0,
          time: getFormatTypes[0].time,
          circumference: circumference
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
        <h2 style={styles.headline}>{this.props.title || null}</h2>
        {this.state.play
          ? <RaisedButton
              label="Pause"
              onClick={() => this.setState({ play: false })}
              style={styles.button}
              secondary={true}
              icon={<Pause />}
            />
          : <RaisedButton
              label="Start"
              onClick={() => this.play()}
              primary={true}
              style={styles.button}
              icon={<PlayArrow />}
            />}
        <br />
        <div style={{ margin: "0 auto", width: "100%" }}>
          <svg
            width="300"
            height="300"
            className="progress"
            // style={{ transform: "rotate(-90deg)" }}
          >
            <circle
              cx="150"
              cy="150"
              r="146"
              fill="none"
              stroke="#e6e6e6"
              strokeWidth="8"
            />
            <circle
              cx="150"
              cy="150"
              r="146"
              fill="none"
              stroke="#f77a52"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={this.state.circumference}
            />
            <text
              x="150"
              y="158"
              textAnchor="middle"
              fill="black"
              style={{ textSize: "20px" }}
            >
              <tspan>
                <a style={{ fontSize: "3em"}}>
                  {this.format(this.state.time)}
                </a>
              </tspan>
            </text>
          </svg>

          <h2 style={{ textAlign: "center", marginTop: '25px' }}>
            Today: {this.state.interval}/10
          </h2>
        </div>
      </div>
    );
  }
}
