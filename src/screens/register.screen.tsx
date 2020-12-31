import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "./register.form";

const RegisterScreen = () => {
  return (
    <div>
      <RegisterForm />
      <Link replace to="/ingresar">
        Ya tenes un usuario?
      </Link>
    </div>
  );
};

export default RegisterScreen;
