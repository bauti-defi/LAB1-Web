import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import LoginScreen from './screens/login.screen'
import {Cookies, withCookies } from "react-cookie";
import RegisterScreen from "./screens/register.screen";
import PanelScreen from "./screens/panel.screen";
import { Nav, Navbar, Container, Button } from "react-bootstrap";


interface Props{
    cookies:Cookies;
}

const axios = require('axios').default;

class App extends Component<Props,any>{

    constructor(props){
      super(props)

      this.handleLogOut = this.handleLogOut.bind(this)
      this.sessionCookieListener = this.sessionCookieListener.bind(this)
    }

    componentDidMount(){
      this.props.cookies.addChangeListener(this.sessionCookieListener)
    }

    sessionCookieListener(event){
      if(event.name === 'session'){
        this.forceUpdate()
      }
    }

    handleLogOut(event){
      this.props.cookies.remove('session')
    }

    render(){
        const authenticated = !!this.props.cookies.get('session')
        return ( 
        <BrowserRouter>
            <Navbar expand='xl' bg="dark" variant="dark"  >
                <Navbar.Brand href="/">
                    <label>IngresoFácil</label>
                </Navbar.Brand>
                  {!authenticated?
                    <Nav>
                      <Nav.Link href="/login">Ingresar</Nav.Link>
                      <Nav.Link href="/register">Registrar</Nav.Link>
                    </Nav>
                    :
                    <Nav>
                      <Button variant='outline-light' href='/' onClick={this.handleLogOut}> Salir </Button>
                    </Nav>
                  }
            </Navbar>
            <Switch>
                <PrivateRoute authenticated path='/panel' component={PanelScreen}/>
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
}

function PrivateRoute(isAuthenticated, { children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
        isAuthenticated ? (
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

export default withCookies(App);