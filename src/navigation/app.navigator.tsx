import React from "react";
import { useCookies } from "react-cookie";
import LoginNavigator from "./login.navigator";

function AppNavigator() {
  const [cookie] = useCookies();

  const authenticated = !!cookie.session;

  return (
    <div>
      <LoginNavigator />
    </div>
  );
}

export default AppNavigator;
