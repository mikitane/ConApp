import React from 'react'
import ReactDOM from 'react-dom'
import {Navbar,Nav,NavItem,NavDropdown,MenuItem} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

export default class NavbarCustom extends React.Component{

render() {
  const menuItemStyle = {
    color: 'black'
  };
  return(
    <Navbar fluid inverse collapseOnSelect className="navbar">

       <Navbar.Header>
         <Navbar.Brand>
           <LinkContainer to="/">
           <a href="/">ConApp</a>
         </LinkContainer>
         </Navbar.Brand>
         <Navbar.Toggle />
       </Navbar.Header>
       <Navbar.Collapse>
         <Nav>
           <LinkContainer to="/">
           <NavItem eventKey={1}>Feed</NavItem>
         </LinkContainer>
         </Nav>
         <Nav pullRight>
           <NavItem eventKey={2} onClick={this.props.toggleSidebar}>Chats</NavItem>
           <NavDropdown  eventKey={3} title={this.props.currentUser} id="basic-nav-dropdown">
             <MenuItem eventKey={3.1} href="/profile"><p style={menuItemStyle}>Me</p></MenuItem>

             <MenuItem eventKey={3.2} href="/logout"><p style={menuItemStyle}>Log out</p></MenuItem>
           </NavDropdown>
         </Nav>
       </Navbar.Collapse>

     </Navbar>
)
  }
}
