import React, { useState } from "react";
import "../App.css";

function AddDefaultItem(props) {
  const [value, setValue] = useState("");

  function findMaxId(array) {
    let max = array[0].id;
    for (let i = 1; i < array.length; i++) {
      if (max < array[i].id) {
        max = array[i].id;
      }
    }
    return max;
  }

  // Пользователь может добавить свои дефолтные задачи.

  function onAdd(event) {
    let numberOfDefaultElem = findMaxId(props.defTodos);
    numberOfDefaultElem++;
    if (value.trim() !== "") {
      let todo = {
        title: value,
        id: numberOfDefaultElem,
        default: true,
      };
      localStorage[String(todo.id)] = JSON.stringify(todo);
    }
    event.preventDefault();
    props.onCreate(value, event.target.dataset.todotype, numberOfDefaultElem);
    setValue("");
  }

  return (
    <div style={{ margin: "10px" }}>
      <form onSubmit={onAdd} data-todotype="default">
        <label>Добавить свою: </label>
        &nbsp;
        <input
          type="text"
          maxLength="50"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        ></input>
        &nbsp;
        <button className="buttons" type="submit">
          Добавить
        </button>
      </form>
    </div>
  );
}

export default AddDefaultItem;
