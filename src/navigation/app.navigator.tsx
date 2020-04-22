import React from "react";
import { useCookies, withCookies } from "react-cookie";
import LoginNavigator from "./login.navigator";
import PanelNavigator from "./panel.navigator";

function AppNavigator() {
  const [cookie] = useCookies();

  const authenticated: boolean = !!cookie.session;

  return authenticated ? <PanelNavigator /> : <LoginNavigator />;
}

export default withCookies(AppNavigator);
