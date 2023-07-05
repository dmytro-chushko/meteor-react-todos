import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { TasksCollection, insertTask } from "../imports/db/TasksCollection";
import { ServiceConfiguration } from "meteor/service-configuration";
import "/imports/api/tasksMethods";
import "/imports/api/tasksPublications";

const tasks = [
  "First Task",
  "Second Task",
  "Third Task",
  "Fourth Task",
  "Fifth Task",
  "Sixth Task",
  "Seventh Task",
];

// const insertTask = (taskText, user) =>
//   TasksCollection.insert({
//     text: taskText,
//     userId: user._id,
//     createdAt: new Date(),
//   });
// const Users = new Mongo.Collection("users");

const SEED_USERNAME = "dmytro1";
const SEED_PASSWORD = "123456";

Meteor.startup(() => {
  console.log(Meteor.users.findOne({ username: SEED_USERNAME }));
  if (!Meteor.users.findOne({ username: SEED_USERNAME })) {
    console.log("user");
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (TasksCollection.find({}).count() === 0) {
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
