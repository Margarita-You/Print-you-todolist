import React from "react";
import "./App.css";

function Header() {
  return (
    <header>
      <h1 style={{ textTransform: "uppercase" }}>Список дел</h1>
      <p>
        *выбери нужные задания или добавь свои собственные, распечатай и повесь
        на видном месте
      </p>
    </header>
  );
}

export default Header;
