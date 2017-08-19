import React, { Component } from "react";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import { List, ListItem } from "material-ui/List";
import Avatar from "material-ui/Avatar";
import ClearFolder from "material-ui/svg-icons/content/clear";
import Done from "material-ui/svg-icons/action/done";
import Undo from "material-ui/svg-icons/content/undo";
import idb from "idb";
import Divider from "material-ui/Divider";

const dbPromise = idb.open("IndexedDB", 1, upgradeDB => {
  upgradeDB.createObjectStore("todoList", { keyPath: "date" });
});

export default class TodoComponent extends Component {
  constructor() {
    super();
    this.state = { task: [], taskInput: "", taskInputError: false };
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
    if (taskInput === "") {
      this.setState({ taskInputError: true });
      return;
    } else {
      let task = { date: new Date().getTime(), task: taskInput, done: false };
      let test = async () => {
        let retreivedData = await this.retreiveData();
        this.setState({
          task: retreivedData,
          taskInput: "",
          taskInputError: false
        });
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
  taskDone(date) {
    let test = async () => {
      let retreivedData = await this.retreiveData();
      this.setState({
        task: retreivedData,
        taskInputError: false
      });
    };
    dbPromise.then(db => {
      const tx = db.transaction("todoList", "readwrite");
      tx.objectStore("todoList").get(date).then(task => {
        let taskBucket = task;
        let taskObj = {
          date: date,
          task: taskBucket.task,
          done: !taskBucket.done
        };
        tx.objectStore("todoList").put(taskObj).then(() => {
          test();
        });
      });
      return tx.complete;
    });
  }
  render() {
    let task = this.state.task.map((data, i) => {
      if (data.done) {
        return (
          <div key={i}>
            <del>
              <ListItem
                onClick={() => {
                  this.taskDone(data.date);
                }}
                style={{ color: "grey" }}
                leftAvatar={
                  <Avatar
                    icon={<Undo />}
                    onClick={() => {
                      this.taskDone(data.date);
                    }}
                  />
                }
                rightIcon={
                  <ClearFolder onClick={() => this.deleteTask(data.date)} />
                }
                primaryText={data.task}
              />
            </del>
            <Divider inset={true} />
          </div>
        );
      } else {
        return (
          <div key={i}>
            <ListItem
              onClick={() => {
                this.taskDone(data.date);
              }}
              leftAvatar={
                <Avatar
                  icon={<Done />}
                  onClick={() => {
                    this.taskDone(data.date);
                  }}
                />
              }
              rightIcon={
                <ClearFolder onClick={() => this.deleteTask(data.date)} />
              }
              primaryText={data.task}
            />
            <Divider inset={true} />
          </div>
        );
      }
    });
    return (
      <div style={{ textAlign: "center" }}>
        <div style={{ padding: "10px 10px 0px 10px" }}>
          <TextField
            errorText={this.state.taskInputError ? "Insert a new task." : null}
            hintText="Task"
            fullWidth={true}
            onChange={(e, newvalue) => {
              this.setState({
                taskInput: newvalue
              });
            }}
            value={this.state.taskInput}
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
