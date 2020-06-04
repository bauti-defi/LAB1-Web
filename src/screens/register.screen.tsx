import React, { useState } from "react";
import { useCookies, withCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import './register.screen.css'

const axios = require("axios").default;

function RegisterScreen() {
  const [cookie] = useCookies();

  const authenticated = !!cookie.session;

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(authenticated);

  function handleSubmit(event) {
    if (isBlank(name)) {
      setMessage("Name is blank!");
    } else if (isBlank(email)) {
      setMessage("Email is blank!");
    } else if (isBlank(password)) {
      setMessage("Password is blank!");
    } else if (password !== confirmPassword) {
      setMessage("Passwords don't match!");
    } else {
      axios({
        method: "post",
        url: "http://localhost:3500/barrio/register",
        data: { email, name, password },
      })
        .then((response) => {
          setIsRegistered(true);
        })
        .catch((error) => setMessage(`Error: ${error.message}`));
    }
  }

  return (
    <React.Fragment>
      {isRegistered || authenticated ? (
        <Redirect to="/login" />
      ) : (
    <div className='form'>
          <h3 className='header'>Registrarse</h3>
          <label>{message}</label>
          <div className="form-group">
            <label>
              Ingrese el nombre de Barrio</label>
              <input
                type="text"
                name="name"
                autoCapitalize="words"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="form-group"
                placeholder="Ejemplo: La Delfina"
              />
          </div>

          <div className="form-group">
            <label>
              Ingrese el correo electrónico del barrio
            </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="form-group"
                placeholder="ejemplo@ejemplo.com"
              />
          </div>

          <div className="form-group">
            <label>
              Ingrese la contraseña
              <input
                type="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="form-group"
                placeholder=""
              />
            </label>
          </div>

          <div className='form-group'>
            <label>
              {" "}
              Ingrese nuevamente la contraseña
              <input
                type="password"
                name="confirm_password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="form-group"
                placeholder=""
              />
            </label>
          </div>

          <button className='button' type="button" onClick={handleSubmit}>
            {" "}
            Registrar{" "}
          </button>
        </div>
      )}
    </React.Fragment>
  );
}

function isBlank(str) {
  return !str || /^\s*$/.test(str);
}

export default withCookies(RegisterScreen);
