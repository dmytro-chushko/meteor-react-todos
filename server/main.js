import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { TasksCollection } from "../imports/api/TasksCollection";
import { ServiceConfiguration } from "meteor/service-configuration";

const tasks = [
  "First Task",
  "Second Task",
  "Third Task",
  "Fourth Task",
  "Fifth Task",
  "Sixth Task",
  "Seventh Task",
];

const insertTask = (taskText, user) =>
  TasksCollection.insert({
    text: taskText,
    userId: user._id,
    createdAt: new Date(),
  });

const SEED_USERNAME = "dmytro";
const SEED_PASSWORD = "123456";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (TasksCollection.find().count() === 0) {
    tasks.forEach((taskText) => insertTask(taskText, user));
  }
});

ServiceConfiguration.configurations.upsert(
  { service: "github" },
  {
    $set: {
      loginStyle: "popup",
      clientId: "00675835ebf9ec6cde13",
      secret: "2ebbc66a1ab351404a4a53e62d49c9741eeef67f",
    },
  }
);
