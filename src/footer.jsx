import React from "react";
import "./App.css";

function Footer() {
  return (
    <footer>
      <p style={{ textAlign: "left" }}>Такой список будет полезен:</p>
      <ul style={{ textAlign: "left" }}>
        <li>детям;</li>
        <li>родителям этих детей;</li>
        <li>людям, которые любят, чтобы список был перед глазами;</li>
        <li>тем, кто хочет красивый список дел, но не хочет его писать.</li>
      </ul>
      <p style={{ textAlign: "right" }}>
        2021 год<br></br>Для личного пользования
      </p>
    </footer>
  );
}

export default Footer;
