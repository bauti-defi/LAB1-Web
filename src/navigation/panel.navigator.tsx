import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import LogOutScreen from "../screens/logout.screen";
import LoteScreen from "../screens/lotes/lote.screen";

function PanelNavigator() {
  return (
    <div>
      <Switch>
        <Route path="/">
          <Redirect to="/lotes" />
        </Route>
        <Route path="/lotes" component={LoteScreen} />
        <Route path="/salir" component={LogOutScreen} />
      </Switch>
    </div>
  );
}

export default PanelNavigator;
