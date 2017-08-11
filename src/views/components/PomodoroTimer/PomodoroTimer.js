import React, { Component } from "react";

export default class PomodoroTimer extends Component {
  constructor() {
    super();
    this.elapseTime = this.elapseTime.bind(this);
  }
  state = {
    time: 10,
    play: false,
    title: ""
  };
  elapseTime() {
    if (this.state.time === 0) {
      this.reset(0);
    //   this.alert();
    }
    if (this.state.play === true) {
      let newState = this.state.time - 1;
      this.setState({ time: newState });
    }
  }
  reset(resetFor = this.state.time) {
    clearInterval(this.interval);
    // let time = this.format(resetFor);
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
  togglePlay() {
    if (true === this.state.play) return this.reset();

    return this.play();
  }
  render() {
    return (
      <div>
        <h1>
          {this.props.title}
        </h1>
        <h2>
          {this.format(this.state.time)}
        </h2>
        <button type="button" onClick={() => this.play()}>
          Start
        </button>
        <button type="button" onClick={() => this.reset()}>
          Reset
        </button>
      </div>
    );
  }
}
