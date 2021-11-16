import React from "react";
import ToDoItem from "./ToDoItem";
import "../App.css";

function ToDoList(props) {
  return (
    <div className="list printable">
      {props.todos.map((todo, index) => {
        return (
          <ToDoItem
            todo={todo}
            index={index}
            onDelete={props.onDelete}
            key={todo.id}
          />
        );
      })}
    </div>
  );
}

export default ToDoList;
