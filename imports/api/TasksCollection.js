import { Mongo } from "meteor/mongo";

export const TasksCollection = new Mongo.Collection("tasks");

export const insertTask = (text, userId) =>
  TasksCollection.insert({
    text: text.trim(),
    userId,
    createdAt: new Date(),
  });

export const toggleChecked = ({ _id, isChecked }) => {
  TasksCollection.update(_id, {
    $set: {
      isChecked: !isChecked,
    },
  });
};

export const deleteTask = ({ _id }) => TasksCollection.remove(_id);
