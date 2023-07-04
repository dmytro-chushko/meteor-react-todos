import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import {
  deleteTask,
  insertTask,
  toggleChecked,
  TasksCollection,
} from "../db/TasksCollection";

Meteor.methods({
  "check.authentication"() {
    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }
  },

  "check.authorization"(taskId) {
    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error("Access denied");
    }
  },

  "tasks.insert"(text) {
    check(text, String);

    Meteor.call("check.authentication");

    insertTask(text, this.userId);
  },

  "tasks.remove"(taskId) {
    check(taskId, String);

    Meteor.call("check.authentication");

    Meteor.call("check.authorization", taskId);

    deleteTask(taskId);
  },

  "tasks.setIsChecked"(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    Meteor.call("check.authentication");

    Meteor.call("check.authorization", taskId);

    toggleChecked(taskId, isChecked);
  },
});
