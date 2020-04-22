import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import LoginScreen from "../screens/login.screen";
import RegisterScreen from "../screens/register.screen";

function LoginNavigator() {
  return (
    <div>
      <Switch>
        <Route path="/">
          <Redirect to="/ingresar" />
        </Route>
        <Route path="/ingresar" component={LoginScreen} />
        <Route path="/registrar" component={RegisterScreen} />
      </Switch>
    </div>
  );
}

export default LoginNavigator;
