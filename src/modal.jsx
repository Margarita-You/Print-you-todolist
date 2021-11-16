import React from "react";
import "./App.css";

function Modal(props) {
  return (
    <React.Fragment>
      {props.isOpen && (
        <div className="modal">
          <div className="modal-body">
            <h1>Что-то пошло не так</h1>
            <p>{props.errorMessage}</p>
            <button className="buttons" onClick={props.onClose}>
              Понятно
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Modal;
