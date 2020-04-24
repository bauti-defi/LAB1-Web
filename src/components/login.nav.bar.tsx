import React from "react";
import { Link } from "react-router-dom";
import "./nav.bar.css";

function LoginNavBar() {
  return (
    <div className="nav-bar">
      <ul>
        <li>
          <Link to="/" id="home">
            IngresoFácil
          </Link>
        </li>
        <li>
          <Link to="/ingresar">Ingresar</Link>
        </li>
        <li>
          <Link to="registrar">Registrar</Link>
        </li>
      </ul>
    </div>
  );
}

export default LoginNavBar;
