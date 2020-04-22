import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import LoginScreen from "../screens/login.screen";
import RegisterScreen from "../screens/register.screen";

function LoginNavigator() {
  return (
    <div>
      <Switch>
        <Route path="/ingresar" component={LoginScreen} />
        <Route path="/registrar" component={RegisterScreen} />
        <Route>
          <Redirect to="/ingresar" />
        </Route>
      </Switch>
    </div>
  );
}

export default LoginNavigator;
