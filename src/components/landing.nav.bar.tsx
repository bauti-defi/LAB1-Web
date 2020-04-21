import React from "react";
import { Link } from "react-router-dom";

function LandingNavBar() {
  return (
    <div>
      <li>
        <Link to="/ingresar">Ingresar</Link>
      </li>
      <li>
        <Link to="registrar">Registrar</Link>
      </li>
    </div>
  );
}

export default LandingNavBar;
