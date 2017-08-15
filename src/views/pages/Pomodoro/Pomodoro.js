import React, { Component } from "react";
import PomodoroTimer from "../../components/PomodoroTimer/PomodoroTimer";
import ReactDOM from "react-dom";

export default class Pomodoro extends Component {
  state = {
    time: 25,
    restTime: 5
  };
  getWorkTime() {
    this.setState({ workTime: ReactDOM.findDOMNode(this.refs.workTime).value });
  }
  getRestTime() {
    this.setState({ restTime: ReactDOM.findDOMNode(this.refs.restTime).value });
  }
  render() {
    return (
      <div style={{maxWidth: '400px', margin: '0 auto', textAlign: 'center'}}>
        <p>Work Time</p>
        <input ref="workTime" onChange={() => this.getWorkTime()} />
        <p>Rest Time</p>
        <input ref="restTime" onChange={() => this.getRestTime()} />
        <PomodoroTimer title="Work" time={this.state.workTime} restTime={this.state.restTime}/>
      </div>
    );
  }
}
