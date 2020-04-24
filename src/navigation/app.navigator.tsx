import React from "react";
import { useCookies, withCookies } from "react-cookie";
import LoginNavBar from "../components/login.nav.bar";
import PanelNavBar from "../components/panel.nav.bar";
import LoginNavigator from "./login.navigator";
import PanelNavigator from "./panel.navigator";

function AppNavigator() {
  const [cookie] = useCookies();

  const authenticated: boolean = !!cookie.session;

  return authenticated ? (
    <div className="main-container">
      <header>
        <PanelNavBar />
      </header>
      <div className="body-container">
        <PanelNavigator />
      </div>
    </div>
  ) : (
    <div className="main-container">
      <header>
        <LoginNavBar />
      </header>
      <div className="body-container">
        <LoginNavigator />
      </div>
    </div>
  );
}

export default withCookies(AppNavigator);
