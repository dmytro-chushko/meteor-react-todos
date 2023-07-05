import { Meteor } from "meteor/meteor";
import React, { createContext, useContext, useState } from "react";
import { useTracker } from "meteor/react-meteor-data";

import { TasksCollection } from "../db/TasksCollection.js";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export const ContextProvider = ({ children }) => {
  const [hideCompleted, setHideCompleted] = useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } };

  const user = useTracker(() => Meteor.user());
  const userFilter = user ? { userId: user._id } : {};
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe("tasks");
    console.log(handler);

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

  const appData = {
    tasks,
    user,
    pendingTasksCount,
    hideCompleted,
    setHideCompleted,
    isLoading,
  };

  return <AppContext.Provider value={appData}>{children}</AppContext.Provider>;
};
