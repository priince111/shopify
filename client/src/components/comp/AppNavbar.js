import React, { useState, Fragment } from "react";
import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";
import LogoutModal from "../auth/LogoutModal";
import "../css_comp/Navbar.css"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  NavLink
} from "reactstrap";
import { NavLink as RRNavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import { clear_error } from "../../actions/errorActions";

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useSelector((state) => state.authReducer);
  console.log("auth", auth);
  const { isAuthenticated, user } = auth;
  console.log("user", user);
  const toggle = () => {
    clear_error();
    setIsOpen(!isOpen);
  };
  const authLinks = (
    <Fragment>
      <NavItem>
        <span className="navbar-text mr-3">
          <strong>{user ? `Welcome ${user.name}` : ""}</strong>
        </span>
      </NavItem>
      <NavItem>
        <NavLink tag={RRNavLink} to="/">Home</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={RRNavLink} to='/cart'>
          Cart
        </NavLink>
      </NavItem>
      <NavItem className="mr-2">
        <NavLink tag={RRNavLink} to="/orders">Orders</NavLink>
      </NavItem>
      <NavItem>
        <LogoutModal />
      </NavItem>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </Fragment>
  );
  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5 navbar-fixed-top">
        <Container>
          <NavbarBrand tag={RRNavLink} to="/">E Commerce Store</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default AppNavbar;
