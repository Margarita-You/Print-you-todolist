import React, { useState } from "react";
import "../App.css";

function AddItem({ onCreate }) {
  const [value, setValue] = useState("");

  function submitHandler(event) {
    event.preventDefault();
    onCreate(value, event.target.dataset.todotype);
    setValue("");
  }

  return (
    <form onSubmit={submitHandler} data-todotype="notDefault">
      <label>Моя задача:</label>
      &nbsp;
      <input
        type="text"
        maxLength="50"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      ></input>
      &nbsp;
      <button type="submit" className="buttons">
        Добавить
      </button>
    </form>
  );
}

export default AddItem;
