import { Meteor } from "meteor/meteor";
import React from "react";

import { TaskForm } from "./TaskForm.jsx";
import { Task } from "./Task.jsx";
import { LoginForm } from "./LoginForm.jsx";
import { logout } from "../api/user.js";
import { useAppContext } from "../provider/ContextProvider.jsx";

export const App = () => {
  const {
    tasks,
    user,
    pendingTasksCount,
    hideCompleted,
    setHideCompleted,
    isLoading,
  } = useAppContext();

  const handleToggleChacked = ({ _id, isChecked }) =>
    Meteor.call(
      "tasks.setIsChecked",
      _id,
      !isChecked
      // (error) => {
      // alert(error.error);
      // }
    );

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
