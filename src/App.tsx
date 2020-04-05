import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useCookies } from "react-cookie";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/navigation.bar";
import LoginScreen from './screens/login.screen';
import Table from './screens/lote.screen';
import PanelScreen from "./screens/panel.screen";
import RegisterScreen from "./screens/register.screen";

function App(){

  const [cookie] = useCookies(['session'])

  const authenticated = !!cookie.session

  return ( 
    <BrowserRouter>
        <NavigationBar/>
        <Switch>
            <PrivateRoute path='/panel'>
                <PanelScreen/>
            </PrivateRoute>
            <Route path='/login' component={LoginScreen}/>
            <Route path='/register' component={RegisterScreen}/>
            <Route path='/lotescreen' component={Table}/>
            <Route path='/'>
                {authenticated?
                <Redirect to='/panel'/>
                :
                <Redirect to='/login'/>}
            </Route>
        </Switch>
    </BrowserRouter>
  );

}

function PrivateRoute({ children, ...rest }) {
  const [cookie] = useCookies(['session'])

  const authenticated = !!cookie.session

  return (
    <Route
      {...rest}
      render={({ location }) =>
      authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
  }

export default App