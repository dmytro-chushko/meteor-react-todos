import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";

import { TaskForm } from "./TaskForm.jsx";
import { Task } from "./Task.jsx";
import {
  TasksCollection,
  deleteTask,
  toggleChecked,
} from "../api/TasksCollection.js";

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } };

  const pendingTasksCount = useTracker(() =>
    TasksCollection.find(hideCompletedFilter).count()
  );

  const tasks = useTracker(() =>
    TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {
      sort: { createdAt: -1 },
    }).fetch()
  );

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>
              Welcome to Meteor!{" "}
              {pendingTasksCount ? `(${pendingTasksCount})` : ""}
            </h1>
          </div>
        </div>
      </header>
      <div className="main">
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
              onCheckboxClick={toggleChecked}
              onDeleteClick={deleteTask}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
