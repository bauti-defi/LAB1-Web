import React from "react";
import { Link } from "react-router-dom";
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

function App() {
    return (
        <Container fluid>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">IngresoFácil</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Barrio</Nav.Link>
                        <NavDropdown title="Opciones" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">
                                Agregar trabajador
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Agregar propietario
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
    );
}
export default App;
