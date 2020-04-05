import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import LoginScreen from './screens/login.screen'
import {useCookies} from "react-cookie";
import RegisterScreen from "./screens/register.screen";
import PanelScreen from "./screens/panel.screen";
import NavigationBar from "./components/navigation.bar";

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