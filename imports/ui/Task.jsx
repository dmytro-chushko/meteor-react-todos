import React from "react";

export const Task = ({ task, onCheckboxClick, onDeleteClick }) => {
  return (
    <li>
      <input
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
        readOnly
      />
      <span>{task.text}</span>
      <button type="button" onClick={() => onDeleteClick(task)}>
        &times;
      </button>
    </li>
  );
};
