import React from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import { useCookies } from "react-cookie";

function NavigationBar() {
  const [cookie, removeCookie] = useCookies();

  const authenticated = !!cookie.session;

  return (
    <Navbar expand="xl" bg="dark" variant="dark">
      <Navbar.Brand href="/">
        <label>IngresoFácil</label>
      </Navbar.Brand>
      {!authenticated ? (
        <Nav>
          <Nav.Link href="/login">Ingresar</Nav.Link>
          <Nav.Link href="/register">Registrar</Nav.Link>
        </Nav>
      ) : (
        <Nav>
          <Button variant="outline-light" href="/lotescreen">
            {" "}
            Lotes{" "}
          </Button>
          <Button
            variant="outline-light"
            href="/"
            onClick={() => removeCookie("session", "")}
          >
            {" "}
            Salir{" "}
          </Button>
        </Nav>
      )}
    </Navbar>
  );
}

export default NavigationBar;
