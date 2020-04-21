import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";

function LogOutScreen() {
  const [cookie, removeCookie] = useCookies();

  useEffect(() => removeCookie("session", ""));

  return <Redirect to="/" />;
}

export default LogOutScreen;
