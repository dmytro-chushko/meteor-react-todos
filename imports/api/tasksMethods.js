import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { deleteTask, insertTask, toggleChecked } from "../db/TasksCollection";

Meteor.methods({
  "tasks.insert"(text) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    insertTask(text, this.userId);
  },

  "tasks.remove"(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    deleteTask(taskId);
  },

  "tasks.setIsChecked"(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    toggleChecked(taskId, isChecked);
  },
});
