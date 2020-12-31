import React from "react";
import { Link } from "react-router-dom";
import LogInForm from "./log.in.form";

const LogInScreen = () => {
  return (
    <div>
      <LogInForm />
      <Link to="/registrar">Aun no esta registrado?</Link>
    </div>
  );
};

export default LogInScreen;
