import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import {
    Navbar,
    Nav,
    NavDropdown,
    Container
} from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterScreen from './screens/register.screen';
import LoginScreen from './screens/login.screen';
import PanelScreen from "./screens/panel.screen";
import {Cookies, withCookies } from "react-cookie";


interface Props{
    cookies:Cookies;
}

class App extends Component<Props,any>{

    render(){
        return ( 
            <BrowserRouter> 
                <div className="App">
                    {/* Navigation Bar */} 
            <Container>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">IngresoFácil</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {navbarLink('Ingresar', '/login')}
                            {navbarLink('Registrar', '/register')}
                            <NavDropdown title="Opciones" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">
                                    Agregar usuario
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Container>
            </div>
        
                {/* Route management */}
                <div className="auth-wrapper">
                    <div className="auth-inner">
                        <Switch>
                            <PrivateRoute allow={false} path='/panel'>
                                <PanelScreen/>
                            </PrivateRoute>
                            <Route exact path='/login' component={LoginScreen} />
                            <Route exact path='/register' component={RegisterScreen} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }

}


function PrivateRoute(allow, { children, ...rest }) {

    return (
      <Route
        {...rest}
        render={({ location }) =>
            allow? (
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

const navbarLink = (title: string, url:string) => {
    return(
        <Nav.Link href={url} >
            <label>{title}</label>
        </Nav.Link>
    );
}




export default withCookies(App);