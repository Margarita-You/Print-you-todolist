/*Это программа для родителей, дети которых еще не пользуются гаджетами.
Здесь можно собрать свой собственный ToDo-List для ребенка,
распечатать и вручить ему.
Есть задачи по умолчанию, и можно добавлять свои собственные задачи и
свои собственные задачи по умолчанию (они хранятся в LocalStorage,
в реальной хранились бы в БД).
*/

import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"

ReactDOM.render(<App />, document.getElementById("root"))
