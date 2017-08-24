import React, { Component } from "react";
import PomodoroTimer from "../../components/PomodoroTimer/PomodoroTimer";
import TextField from "material-ui/TextField";

export default class Pomodoro extends Component {
  state = {
    time: 25,
    restTime: 5
  };
  getWorkTime(e, value) {
    this.setState({ workTime: value });
  }
  getRestTime(e, value) {
    this.setState({ restTime: value });
  }
  render() {
    return (
      <div
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          textAlign: "center",
          display: this.props.hide ? "none" : "block"
        }}
      >
        <br />
        <div style={{ display: "flex" }}>
          <TextField
            hintText="Work Time. ex: 25min"
            type="number"
            onChange={(e, v) => this.getWorkTime(e, v)}
            style={{ flex: "1", margin: "0px 10px" }}
          />
          <TextField
            hintText="Rest Time. ex: 5min"
            type="number"
            onChange={(e, v) => this.getRestTime(e, v)}
            style={{ flex: "1", margin: "0px 10px" }}
          />
        </div>
        <PomodoroTimer
          title={this.props.title}
          time={this.state.workTime}
          restTime={this.state.restTime}
        />
      </div>
    );
  }
}
