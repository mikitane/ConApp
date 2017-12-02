import React from 'react'
import ReactDOM from 'react-dom'
import {Navbar,Nav,NavItem,NavDropdown,MenuItem} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

export default class NavbarCustom extends React.Component{

render() {
  const menuItemStyle = {
    backgroundColorcolor: 'black'
  };
  return(
    <Navbar fluid inverse collapseOnSelect className="navbar">

       <Navbar.Header>

         <Navbar.Brand>
           <LinkContainer to="/">
              <a>ConApp</a>
            </LinkContainer>
         </Navbar.Brand>

         <Navbar.Toggle />
       </Navbar.Header>

       <Navbar.Collapse>
         <Nav >
           <LinkContainer to="/" activeClassName="navitem">
           <NavItem eventKey={1} >Feed</NavItem>
         </LinkContainer>
         </Nav>
         <Nav pullRight>
           <NavItem eventKey={2} onClick={this.props.toggleSidebar}>Chats</NavItem>
           <NavDropdown eventKey={3} title={this.props.currentUser} id="basic-nav-dropdown">

             <MenuItem className="menuitem" eventKey={3.1}
               href={"/profile/"+this.props.currentUserId}>
               <p>Me</p>
             </MenuItem>

             <MenuItem className="menuitem" eventKey={3.2} href="/logout">
             <p >Log out</p>
           </MenuItem>

           </NavDropdown>
         </Nav>
       </Navbar.Collapse>

     </Navbar>
)
  }
}
