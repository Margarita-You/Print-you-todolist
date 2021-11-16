import React from "react";

function Print() {
  return (
    <div>
      <button className="buttons" onClick={() => window.print()}>
        Распечатать
      </button>
    </div>
  );
}

export default Print;
