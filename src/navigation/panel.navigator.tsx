import React from "react";
import { useCookies, withCookies } from "react-cookie";
import { Redirect, Route, Switch } from "react-router-dom";
import LogOutScreen from "../screens/logout.screen";
import LoteScreen from "../screens/lotes/lotes.screen";
import GuardiaScreen from '../screens/guardias/guardias.screen'

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
      <Route>
        <Redirect to="/lotes" />
      </Route>
    </Switch>
  );
}

export default withCookies(PanelNavigator);
