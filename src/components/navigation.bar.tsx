import React from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import HomeNavBar from "./home.nav.bar";
import LandingNavBar from "./landing.nav.bar";
import "./nav.bar.css";

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
        {!authenticated ? <LandingNavBar /> : <HomeNavBar />}
      </ul>
    </div>
  );
}

export default NavigationBar;
