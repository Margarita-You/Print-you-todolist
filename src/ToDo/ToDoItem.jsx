import React from "react";
import "../App.css";

function ToDoItem(props) {
  return (
    <div className="parentDel" onClick={() => props.onDelete(props.todo)}>
      <div className="child">{props.todo.title}</div>
    </div>
  );
}

export default ToDoItem;
