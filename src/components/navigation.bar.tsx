import React from "react";
import { useCookies, withCookies } from "react-cookie";
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
        {authenticated ? <HomeNavBar /> : <LoginNavBar />}
      </ul>
    </div>
  );
}

export default withCookies(NavigationBar);
