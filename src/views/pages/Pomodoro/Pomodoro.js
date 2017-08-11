import React, { Component } from "react";
import PomodoroTimer from '../../components/PomodoroTimer/PomodoroTimer'

export default class Pomodoro extends Component {
  render() {
    return (
      <div>
        <PomodoroTimer title="jisheeGarchig" time="25"/>
      </div>
    );
  }
}
