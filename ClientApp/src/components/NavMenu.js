import React, { Component } from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import $ from "jquery";
import "./NavMenu.css";
import cookie from "js-cookie";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      modal: false,
      clicked: "",
    };
  }

  componentDidMount = () => {
    this.jQueryCode(this);
  };

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  jQueryCode = (nav) => {
    $(document).click(function () {
      if (nav.props.clicked !== nav.state.clicked) {
        nav.setState({
          collapsed: true,
        });
      }
    });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  handleLogout = () => {
    cookie.remove("UserId");
    window.location.replace("");
  };

  render() {
    // if user is looged in
    if (cookie.get("UserId")) {
      return (
        <header>
          <Navbar className="navbar-expand-sm navbar-toggleable-sm mb-3" dark>
            <Container onClick={(e) => this.setState({ clicked: e.target })}>
              <NavbarBrand
                tag={Link}
                to={`/users/${cookie.get("UserId")}/games`}
                onClick={() => this.setState({ collapsed: true })}
              >
                (DwF)
              </NavbarBrand>
              <NavbarToggler onClick={this.toggleNavbar} />
              <Collapse
                className="d-sm-inline-flex flex-sm-row-reverse"
                isOpen={!this.state.collapsed}
                navbar
              >
                <ul
                  className="navbar-nav flex-grow"
                  onClick={this.toggleNavbar}
                >
                  <NavItem>
                    <NavLink
                      tag={Link}
                      to={`/users/${cookie.get("UserId")}/games`}
                    >
                      Games
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      tag={Link}
                      to={`/users/${cookie.get("UserId")}/heroes`}
                    >
                      Heroes
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="#">
                      <span onClick={this.toggle}>Logout</span>
                      <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle}
                        className="text-dark"
                      >
                        <ModalHeader toggle={this.toggle}>Logout?</ModalHeader>
                        <ModalFooter>
                          <Button color="light" onClick={this.toggle}>
                            Cancel
                          </Button>
                          <Button color="secondary" onClick={this.handleLogout}>
                            Logout
                          </Button>{" "}
                        </ModalFooter>
                      </Modal>
                    </NavLink>
                  </NavItem>
                </ul>
              </Collapse>
            </Container>
          </Navbar>
        </header>
      );
    } else {
      // if user is not logged in
      return (
        <header>
          <Navbar className="navbar-expand-sm navbar-toggleable-sm mb-3" dark>
            <Container onClick={(e) => this.setState({ clicked: e.target })}>
              <NavbarBrand
                tag={Link}
                to="/"
                onClick={() => this.setState({ collapsed: true })}
              >
                (DwF)
              </NavbarBrand>
              <NavbarToggler onClick={this.toggleNavbar} />
              <Collapse
                className="d-sm-inline-flex flex-sm-row-reverse"
                isOpen={!this.state.collapsed}
                navbar
              >
                <ul
                  className="navbar-nav flex-grow"
                  onClick={this.toggleNavbar}
                >
                  <NavItem>
                    <NavLink tag={Link} to="/">
                      Login
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={Link} to="/register">
                      Register
                    </NavLink>
                  </NavItem>
                </ul>
              </Collapse>
            </Container>
          </Navbar>
        </header>
      );
    }
  }
}
