import React from "react";
import { Link } from "react-router-dom";

function HomeNavBar() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/lotes">Lotes</Link>
        </li>
        <li>
          <Link to="/salir">Salir</Link>
        </li>
      </ul>
    </div>
  );
}

export default HomeNavBar;
