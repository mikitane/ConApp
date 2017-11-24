import React from 'react'
import ReactDOM from 'react-dom'
import {Navbar,Nav,NavItem,NavDropdown,MenuItem} from 'react-bootstrap'

export default class NavbarCustom extends React.Component{

render() {
  const menuItemStyle = {
    color: 'black'
  };
  return(
    <Navbar inverse collapseOnSelect>

       <Navbar.Header>
         <Navbar.Brand>
           <a href="/">ConApp</a>
         </Navbar.Brand>
         <Navbar.Toggle />
       </Navbar.Header>
       <Navbar.Collapse>
         <Nav>
           <NavItem eventKey={1} href="/">Feed</NavItem>
         </Nav>
         <Nav pullRight>
           <NavItem eventKey={1} onClick={this.props.toggleSidebar}>Chats</NavItem>
           <NavDropdown  eventKey={2} title={this.props.currentUser} id="basic-nav-dropdown">
             <MenuItem eventKey={2.1} href="/profile"><p style={menuItemStyle}>Me</p></MenuItem>
             
             <MenuItem eventKey={2.2} href="/logout"><p style={menuItemStyle}>Log out</p></MenuItem>
           </NavDropdown>
         </Nav>
       </Navbar.Collapse>

     </Navbar>
)
  }
}
