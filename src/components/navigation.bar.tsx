import React from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import "../styling/nav.bar.css";
import HomeNavBar from "./home.nav.bar";
import LoginNavBar from "./login.nav.bar";

function NavigationBar() {
  const [cookie] = useCookies();

  const authenticated = !!cookie.session;

  return (
    <div className="nav-bar">
      <ul>
        <li>
          <Link to="/" id="home">
            IngresoFácil
          </Link>
        </li>
        {!authenticated ? <LoginNavBar /> : <HomeNavBar />}
      </ul>
    </div>
  );
}

export default NavigationBar;
