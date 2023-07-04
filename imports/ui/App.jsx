import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";

import { TaskForm } from "./TaskForm.jsx";
import { Task } from "./Task.jsx";
import { TasksCollection } from "../db/TasksCollection.js";
import { LoginForm } from "./LoginForm.jsx";
import { logout } from "../api/user.js";

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } };

  const user = useTracker(() => Meteor.user());
  const userFilter = user ? { userId: user._id } : {};
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendongTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe("tasks");

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasks = TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();

    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();

    return { tasks, pendingTasksCount };
  });

  const handleToggleChacked = ({ _id, isChecked }) =>
    Meteor.call("tasks.setIsChecked", _id, isChecked);

  const handleDeleteTask = ({ _id }) => Meteor.call("tasks.remove", _id);

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>
              Welcome to Meteor!
              {pendingTasksCount ? `(${pendingTasksCount})` : ""}
            </h1>
          </div>
        </div>
      </header>
      {user ? (
        <>
          <div className="user" onClick={logout}>
            {user.username || user.profile.name} Log Out
          </div>
          <TaskForm />
          <div className="filter">
            <button
              type="button"
              onClick={() => setHideCompleted(!hideCompleted)}
            >
              {hideCompleted ? "Show All" : "Hide Completed"}
            </button>
          </div>
          <ul className="tasks">
            {tasks.map((task) => (
              <Task
                key={task._id}
                task={task}
                onCheckboxClick={handleToggleChacked}
                onDeleteClick={handleDeleteTask}
              />
            ))}
          </ul>
        </>
      ) : (
        <LoginForm />
      )}
      <div className="main"></div>
    </div>
  );
};
