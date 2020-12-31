import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import LogInScreen from "./screens/log.in.screen";
import RegisterScreen from "./screens/register.screen";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/ingresar" component={LogInScreen} />
        <Route exact path="/registrar" component={RegisterScreen} />
        <Route path="/" component={LogInRedirect} />
      </Switch>
    </BrowserRouter>
  );
}

const LogInRedirect = () => <Redirect to={{ pathname: "/ingresar" }} />;

export default App;
