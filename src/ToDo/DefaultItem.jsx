/*Пользовательские задачи по умолчанию - в зеленых квадратах.*/

import React from "react";
import "../App.css";

function DefaultItem(props) {
  function isYourTodo(locStorTodo, todo) {
    return locStorTodo.findIndex((elem) => elem.title === todo.title) >= 0
      ? true
      : false;
  }

  return (
    <div
      className="parentAdd"
      id="defaultItem"
      style={
        isYourTodo(props.locStorTodo, props.defTodo)
          ? { backgroundColor: "rgb(130, 175, 119)" }
          : { backgroundColor: "rgb(243, 224, 116)" }
      }
      onClick={() => props.onChoose(props.defTodo)}
    >
      <div className="child">{props.defTodo.title}</div>
      {isYourTodo(props.locStorTodo, props.defTodo) && (
        <button
          className="close"
          title="Удалить из списка по умолчанию"
          onClick={(event) => {
            props.onDelete(props.defTodo);
            event.stopPropagation();
          }}
        ></button>
      )}
    </div>
  );
}

export default DefaultItem;
