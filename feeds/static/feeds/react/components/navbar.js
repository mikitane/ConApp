import React from 'react'
import ReactDOM from 'react-dom'
import {Navbar,Nav,NavItem,NavDropdown,MenuItem} from 'react-bootstrap'

export default class NavbarCustom extends React.Component{

render() {
  const menuItemStyle = {
    padding: '0px'
  };
  return(
    <Navbar style={menuItemStyle} inverse collapseOnSelect>

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
           <NavItem eventKey={1} onClick={this.props.onClickSidebar}>Chats</NavItem>
           <NavDropdown eventKey={2} title="request.username from API" id="basic-nav-dropdown">
             <MenuItem  eventKey={2.1} href="/profile">Me</MenuItem>
             <MenuItem divider />
             <MenuItem eventKey={2.2} href="/logout">Log out</MenuItem>
           </NavDropdown>
         </Nav>
       </Navbar.Collapse>

     </Navbar>
)
  }
}
