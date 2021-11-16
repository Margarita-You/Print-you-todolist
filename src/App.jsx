import React, { useEffect, useState, useRef } from "react";
import Header from "./header";
import Footer from "./footer";
import Print from "./ToDo/Print";
import AddItem from "./ToDo/AddItem";
import ToDoList from "./ToDo/ToDoList";
import DefaultList from "./ToDo/DefaultList";
import AddDefaultItem from "./ToDo/AddDefaultItem";
import Modal from "./modal";
import "./App.css";
import data from "./todosList.json";
function App() {
  const [todos, setState] = useState([]); //для текущего списка

  const [defTodos, setDefTodos] = useState([]); //для списка по умолчанию

  const [isOpen, setModal] = useState(false); //открытие, закрытие модального окна

  /*С помощью useEffect подгружаем задачи из файла JSON и LocalStorage.
  Я тут делаю вид, как будто загружаю JSON откуда-то с промисом.
 Список зависимостей пустой, т.к. мы это делаем только один раз.*/

  useEffect(() => {
    let defaultList = [];
    defaultList = defaultList.concat(downloadLocStor());
    setDefTodos(defaultList);
    loadTodosFromFile(data).then(
      (result) => {
        defaultList = defaultList.concat(result);
        defaultList.sort((a, b) => {
          if (a.id > b.id) {
            return 1;
          }
          if (a.id < b.id) {
            return -1;
          }
        });
        setDefTodos(defaultList);
      },
      (error) => {
        errorMessage.current = error.message;
        setModal(true);
      }
    );
  }, []);

  const errorMessage = useRef("");

  async function loadTodosFromFile(todos) {
    let promise = new Promise((resolve, reject) => {
      if (todos.length > 1) {
        /*придумала удобное мне рандомное условие
        если в файле, оставить одну задачу, то сработает reject */
        setTimeout(() => resolve(todos), 1000);
      } else {
        setTimeout(
          () => reject(new Error("Не удалось загрузить список по умолчанию")),
          0
        );
      }
    });
    let result = await promise;
    return result;
  }

  //Функция загружает задачи из LocalStorage

  function downloadLocStor() {
    let locDefTodos = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      let item = localStorage[key];
      item = JSON.parse(item);
      item.default && locDefTodos.push(item);
    }
    return locDefTodos;
  }

  //Фукнция удаляет задачу из локального хранилища

  function deleteLocStor(item) {
    setDefTodos(defTodos.filter((todo) => todo.id !== item.id));
    localStorage.removeItem(String(item.id));
  }

  //Когда выбрали задачу из задач по умолчанию

  function onChoose(chTodo) {
    setState(() => {
      todos.push(chTodo);
      return todos;
    });
    setDefTodos(defTodos.filter((defTodo) => defTodo.id !== chTodo.id));
  }

  //Функция для глубокого копирования массива объектов (без вложенных объектов)

  Array.prototype.deepCopy = function () {
    let array2 = new Array(this.length).fill("");
    for (let i = 0; i < this.length; i++) {
      array2[i] = { ...this[i] };
    }
    return array2;
  };

  /*Функция удаляет задачу, при нажатии кнопки. Если это дефолтная задача,
то она возвращается назад в первоначальный список. Алгоритм переделать,
он не всегда работает, как нужно*/

  function returnToItsPosition(elem, todos) {
    let array = todos.deepCopy();
    array.push(elem);
    array = array.sort((a, b) => {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
    });
    return array;
  }

  //Удаляем одну задачу

  function onDelete(delTodo) {
    if (delTodo.default) {
      setDefTodos(() => {
        return returnToItsPosition(delTodo, defTodos);
      });
    }
    setState(todos.filter((todo) => todo.id !== delTodo.id));
  }

  /*Функция очищает весь список задач. Если это дефолтная задача,
то она возвращается назад в первоначальный список*/

  function deleteAll(todos) {
    let array = defTodos.deepCopy();
    todos.map((todo) => {
      if (todo.default) {
        array = returnToItsPosition(todo, array);
      }
    });
    setDefTodos(array);
    setState([]);
  }

  /* У нас есть 2 формы, в которых пользователь может добавить либо
  просто новую задачу в список, либо новую задачу по умолчанию.
  Для них работает одна функция, с условиями*/

  function onAddItem(title, todoType, idx) {
    if (title.trim() !== "") {
      if (todoType === "notDefault") {
        addObj(todos, setState, title, false);
      } else {
        if (todoType === "default") {
          addObj(defTodos, setDefTodos, title, true, idx);
        }
      }
    } else {
      errorMessage.current = "Вы ничего не написали";
      setModal(true);
    }
  }

  function addObj(arr, func, title, isDefault, idx) {
    if (isDefault) {
      func(arr.concat([{ title, id: idx, default: isDefault }]));
    } else {
      func(arr.concat([{ title, id: new Date(), default: isDefault }]));
    }
  }

  return (
    <div className="App">
      <Header />
      <div className="printable">
        <h1 id="printTitle">СПИСОК ДЕЛ</h1>
        {!todos.length ? (
          <div className="emptyList">
            <p
              style={{
                margin: "0px",
                fontSize: "calc(10px + 2vmin)",
                textDecoration: "underline",
              }}
            >
              Список пуст
            </p>
            <p style={{ fontSize: "calc(10px + 1vmin)" }}>
              Добавь свои задачи или выбери задачи из списка внизу
            </p>
          </div>
        ) : (
          <ToDoList todos={todos} onDelete={onDelete} />
        )}
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setModal(false)}
        errorMessage={errorMessage.current}
      />
      <AddItem onCreate={onAddItem} />
      <div id="containerForButtons">
        <button className="buttons" onClick={() => deleteAll(todos)}>
          Очистить список
        </button>
        <Print />
      </div>
      <div className="header">
        <h2>Выбери подходящие задачи</h2>
        <p>*или добавь свои, которые чаще всего используешь</p>
      </div>
      <DefaultList
        defTodos={defTodos}
        onChoose={onChoose}
        onDelete={deleteLocStor}
        locStorTodo={downloadLocStor()}
      />
      <AddDefaultItem onCreate={onAddItem} defTodos={defTodos} />
      <Footer />
    </div>
  );
}

export default App;
