import React from "react";
import { Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import './Navbar.css';
const Navbar = () => {
  return (
    <NavbarBs
      sticky="top"
      collapseOnSelect
      expand="md"
      className="bg-white shadow-sm mb-3"
    >
      <Container>
        <NavbarBs.Brand to="/" as={NavLink}>
          BeTareeqak
        </NavbarBs.Brand>
        <NavbarBs.Toggle aria-controls="responsive-navbar-nav" />
        <NavbarBs.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
         
            <Nav.Link to="/Map" as={NavLink}>
              Map
            </Nav.Link>

            <Nav.Link to="/Rode" as={NavLink}>
              Ride
            </Nav.Link>
            <Nav.Link to="/Profile" as={NavLink}>
            Profile
            </Nav.Link>
            <Nav.Link to="/about" as={NavLink}>
              Contact us
            </Nav.Link>
          </Nav>
        </NavbarBs.Collapse>
      </Container>
      <style type="text/css">
        {`
          @media (max-width: 767px) {
            .navbar-brand {
              display: block;
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
            }
          }
        `}
      </style>
    </NavbarBs>
  );
};

export default Navbar;
