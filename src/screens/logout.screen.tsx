import React from "react";
import { useCookies, withCookies } from "react-cookie";
import { Redirect } from "react-router-dom";

function LogOutScreen() {
  const [cookie, removeCookie] = useCookies();

  removeCookie("session", "");

  return <Redirect to="/" />;
}

export default withCookies(LogOutScreen);
