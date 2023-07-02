import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../imports/api/TasksCollection";
// import { LinksCollection } from '/imports/api/links';

const tasks = [
  "First Task",
  "Second Task",
  "Third Task",
  "Fourth Task",
  "Fifth Task",
  "Sixth Task",
  "Seventh Task",
];

Meteor.startup(() => {
  if (TasksCollection.find().count() === 0) {
    tasks.forEach((task) => TasksCollection.insert({ text: task }));
  }
});

// async function insertLink({ title, url }) {
//   await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
// }

// Meteor.startup(async () => {
//   // If the Links collection is empty, add some data.
//   if (await LinksCollection.find().countAsync() === 0) {
//     await insertLink({
//       title: 'Do the Tutorial',
//       url: 'https://www.meteor.com/tutorials/react/creating-an-app',
//     });

//     await insertLink({
//       title: 'Follow the Guide',
//       url: 'https://guide.meteor.com',
//     });

//     await insertLink({
//       title: 'Read the Docs',
//       url: 'https://docs.meteor.com',
//     });

//     await insertLink({
//       title: 'Discussions',
//       url: 'https://forums.meteor.com',
//     });
//   }

//   // We publish the entire Links collection to all clients.
//   // In order to be fetched in real-time to the clients
//   Meteor.publish("links", function () {
//     return LinksCollection.find();
//   });
// });
