import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import {
    Navbar,
    Nav,
    NavDropdown,
    Form,
    FormControl,
    Button,
    Container
} from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from './components/signup.component';
import LogIn from './components/login.component';

function App() {
    return (
        <BrowserRouter> 
            <div className="App">
                {/* Navigation Bar */} 
        <Container fluid>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">IngresoFácil</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/sign-in">Ingresar</Nav.Link>
                        <Nav.Link href="#home">Barrio</Nav.Link>
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
                    <Form inline>
                        <FormControl
                            type="text"
                            placeholder="Search"
                            className="mr-sm-2"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </Container>
        </div>
       
            {/* Route management */}
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <Switch>
                        <Route exact path='/sign-in' component={LogIn} />
                        <Route exact path='/sign-up' component={SignUp} />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}
export default App;
