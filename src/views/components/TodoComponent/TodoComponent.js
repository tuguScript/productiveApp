import React, { Component } from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { List, ListItem } from "material-ui/List";
import Avatar from "material-ui/Avatar";
import ClearFolder from "material-ui/svg-icons/content/clear";
import idb from "idb";

const dbPromise = idb.open("IndexedDB", 1, upgradeDB => {
  upgradeDB.createObjectStore("todoList", { keyPath: "date" });
});

export default class TodoComponent extends Component {
  constructor() {
    super();
    this.state = { task: [] };
    this.addTask = this.addTask.bind(this);
  }
  retreiveData() {
    return dbPromise
      .then(function(db) {
        var tx = db.transaction("todoList", "readonly");
        var store = tx.objectStore("todoList");
        return store.getAll();
      })
      .then(function(val) {
        return val;
      });
  }
  async componentDidMount() {
    let retreivedData = await this.retreiveData();
    this.setState({ task: retreivedData });
  }
  addTask() {
    let taskInput = this.state.taskInput;
    let task = { date: new Date().getTime(), task: taskInput, done: false };
    let test = async () => {
      let retreivedData = await this.retreiveData();
      this.setState({ task: retreivedData });
    };
    dbPromise
      .then(db => {
        const tx = db.transaction("todoList", "readwrite");
        tx.objectStore("todoList").put(task);
        return tx.complete;
      })
      .then(function() {
        test();
      });
  }
  deleteTask(date) {
    let test = async () => {
      let retreivedData = await this.retreiveData();
      this.setState({ task: retreivedData });
    };
    return dbPromise
      .then(db => {
        const tx = db.transaction("todoList", "readwrite");
        tx.objectStore("todoList").delete(date);
        return tx.complete;
      })
      .then(test());
  }
  render() {
    let task = this.state.task.map((data, i) => {
      return (
        <ListItem
          key={i}
          leftAvatar={<Avatar icon={<ClearFolder />} />}
          rightIcon={<ClearFolder onClick={() => this.deleteTask(data.date)} />}
          primaryText={data.task}
        />
      );
    });
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ padding: "0px 10px" }}>
          <TextField
            hintText="Task"
            fullWidth={true}
            onChange={(e, newvalue) => {
              this.setState({
                taskInput: newvalue
              });
            }}
          />
        </div>
        <br />
        <RaisedButton
          backgroundColor={"#E1315A"}
          labelColor="#fff"
          label="Add Task"
          primary={false}
          style={{ margin: "0 auto" }}
          onTouchTap={() => {
            this.addTask();
          }}
        />
        <br />
        <List>
          {task}
        </List>
      </div>
    );
  }
}
