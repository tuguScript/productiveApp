import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import { browserHistory } from "react-router";
import Pomodoro from "../pages/Pomodoro/Pomodoro";

const title = {
  "/pomodoro": "Pomodoro",
  "/todo": "Todo"
};

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      open: null,
      docked: false
    };
  }
  openDrawer() {
    this.setState({
      open: true
    });
  }
  handleClose = () => this.setState({ open: false });
  render() {
    return (
      <div>
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={open => this.setState({ open })}
        >
          <MenuItem
            onTouchTap={() => {
              browserHistory.push("/");
              this.setState({ open: false });
            }}
          >
            Pomodoro
          </MenuItem>
          <MenuItem
            onTouchTap={() => {
              browserHistory.push("/todo");
              this.setState({ open: false });
            }}
          >
            To do
          </MenuItem>
          <MenuItem
            onTouchTap={() => {
              browserHistory.push("/whatispomodoro");
              this.setState({ open: false });
            }}
          >
            What is Pomodoro?
          </MenuItem>
        </Drawer>
        <AppBar
          title={title[window.location.pathname]}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={() => this.openDrawer()}
          style={{ backgroundColor: "#7ce0c3", position: "fixed" }}
        />
        <div
          style={{ paddingTop: "50px", maxWidth: "500px", margin: "0 auto" }}
        >
          <Pomodoro
            hide={this.props.location.pathname === "/" ? false : true}
            title={
              this.props.location.state ? this.props.location.state.task : null
            }
          />
          {this.props.children}
        </div>
      </div>
    );
  }
}
