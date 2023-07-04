import { Mongo } from "meteor/mongo";

export const TasksCollection = new Mongo.Collection("tasks");

export const insertTask = (text, userId) =>
  TasksCollection.insert({
    text: text.trim(),
    userId,
    createdAt: new Date(),
  });

export const toggleChecked = (taskId, isChecked) => {
  TasksCollection.update(taskId, {
    $set: {
      isChecked: isChecked,
    },
  });
};

export const deleteTask = (taskId) => TasksCollection.remove(taskId);
