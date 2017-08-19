import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import MenuItem from "material-ui/MenuItem";
import { browserHistory } from "react-router";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      open: null,
      docked: false
    };
  }
  componentWillMount() {
    browserHistory.push("/todo");
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
              browserHistory.push("/pomodoro");
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
              browserHistory.push("/routine");
              this.setState({ open: false });
            }}
          >
            Morning Routine
          </MenuItem>
          <MenuItem
            onTouchTap={() => {
              browserHistory.push("/lifehacks");
              this.setState({ open: false });
            }}
          >
            Lifehacks
          </MenuItem>
        </Drawer>
        <AppBar
          title="Title"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={() => this.openDrawer()}
          style={{backgroundColor: '#7ce0c3'}}
        />
        {this.props.children}
      </div>
    );
  }
}
