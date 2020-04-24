import React from "react";
import { Link } from "react-router-dom";
import "./nav.bar.css";

function PanelNavBar() {
  return (
    <div className="nav-bar">
      <ul>
        <li>
          <Link to="/" id="home">
            IngresoFácil
          </Link>
        </li>
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

export default PanelNavBar;
