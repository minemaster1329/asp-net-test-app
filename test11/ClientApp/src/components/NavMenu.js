import React, { Component } from 'react';
import {
  Collapse,
  Container, DropdownItem, DropdownMenu, DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);
    
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar =  () =>  {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">Patient's registration sytem</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret className="text-dark">
                    Patients
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem tag={Link} to="/patients" className="text-dark">
                      Overview
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/addnewpatient" className="text-dark">
                      Add new patient
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret className="text-dark">
                    Doctors
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem tag={Link} to="/doctor/overview" className="text-dark">
                      Overview
                    </DropdownItem>
                    <DropdownItem tag={Link} to="/doctor/addnew" className="text-dark">
                      Add new doctor
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/doctors">Doctors</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
