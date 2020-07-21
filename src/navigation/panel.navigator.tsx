import React from "react";
import { useCookies, withCookies } from "react-cookie";
import { Redirect, Route, Switch } from "react-router-dom";
import GuardiaScreen from "../screens/guardias/guardias.screen";
import LogOutScreen from "../screens/logout.screen";
import LoteScreen from "../screens/lotes/lotes.screen";
import trabajadoresScreen from "../screens/trabajadores/trabajadores.screen";
import propietariosScreen from "../screens/propietarios/propietarios.screen";

function PanelNavigator() {
  const [cookie] = useCookies();

  const authenticated = !!cookie.session;

  if (!authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Switch>
      <Route path="/salir" component={LogOutScreen} />
      <Route path="/lotes" component={LoteScreen} />
      {/* <Route path="/trabajadores" component={trabajadoresScreen} /> */}
      <Route path="/guardias" component={GuardiaScreen} />
      <Route path="/propietarios" component={propietariosScreen}/>
      <Route>
        <Redirect to="/lotes" />
      </Route>
    </Switch>
  );
}

export default withCookies(PanelNavigator);
