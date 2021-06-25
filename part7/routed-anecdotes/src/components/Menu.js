import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link to="/" style={padding}>
              anecdotes
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/create" style={padding}>
              create new
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/about" style={padding}>
              about
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;
