import React from "react";
import DefaultItem from "./DefaultItem";
import "../App.css";

function DefaultList(props) {
  return (
    <div className="list">
      {props.defTodos.map((defTodo) => {
        return (
          <DefaultItem
            defTodo={defTodo}
            onChoose={props.onChoose}
            onDelete={props.onDelete}
            locStorTodo={props.locStorTodo}
            key={defTodo.id}
          />
        );
      })}
    </div>
  );
}

export default DefaultList;
