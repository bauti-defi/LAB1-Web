import React, { useState } from "react";
import { useCookies, withCookies } from "react-cookie";
import './login.screen.css'

const axios = require("axios").default;

function LoginScreen() {
  const [cookie, setCookie] = useCookies();

  const authenticated = !!cookie.session;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleLogin(event) {
    if (isBlank(email) || isBlank(password)) {
      setMessage("Email o contraseña mala.");
    } else {
      axios({
        method: "post",
        url: "http://localhost:3500/auth/login",
        //Barrios use a random number instead of mac address bc there are no working packages for getting mac address
        data: { email, password, mid: Math.random(), type: "web" },
      })
        .then((response) => {
          if (response.data === "Invalid credentials.") {
            setMessage("Email o contraseña mala.");
          } else {
            setCookie("session", response.data);
          }
        })
        .catch((error) => setMessage("Email o contraseña mala."));
    }
  }

  return (
    <React.Fragment>
    <div className = 'form'>
      <h3 className="header">Ingresar</h3>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          className="form-group"
          placeholder="email"
          onChange={(event) => setEmail(event.target.value)}
        />
    </div>

      <div className="form-group">
        <label> Contraseña </label>
        <input
          type="password"
          name="password"
          className="form-group"
          placeholder="Contraseña"
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <label>{message}</label>
      </div>

      <button type="button" className='button'onClick={handleLogin}>
        Ingresar{" "}
      </button>
      <p className="form-group">
        Aun no tiene un usuario? <a href="/registrar"> Registrarse</a>
      </p>
    
      </div>
</React.Fragment>
  );
}

function isBlank(str) {
  return !str || /^\s*$/.test(str);
}

export default withCookies(LoginScreen);
