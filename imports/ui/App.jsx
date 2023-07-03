import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";

import { TaskForm } from "./TaskForm.jsx";
import { Task } from "./Task.jsx";
import {
  TasksCollection,
  deleteTask,
  toggleChecked,
} from "../api/TasksCollection.js";
import { LoginForm } from "./LoginForm.jsx";
import { logout } from "../api/user.js";

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } };

  const user = useTracker(() => Meteor.user());
  const userFilter = user ? { userId: user._id } : {};
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const pendingTasksCount = useTracker(() => {
    if (!user) {
      return 0;
    }

    return TasksCollection.find(pendingOnlyFilter).count();
  });

  const tasks = useTracker(() => {
    if (!user) {
      return [];
    }

    return TasksCollection.find(
      hideCompleted ? hideCompletedFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
  });

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
          <TaskForm user={user} />
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
                onCheckboxClick={toggleChecked}
                onDeleteClick={deleteTask}
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
