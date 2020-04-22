import React from "react";
import { Redirect } from "react-router-dom";

export type Props = { onLogOut: () => void; to: string };

function LogOut({ onLogOut, to }) {
  onLogOut();
  return <Redirect to={to} />;
}

export default LogOut;
