import React from 'react'
import ReactDOM from 'react-dom'
import NavbarCustom from './navbar.js'




export default class Body extends React.Component {

  constructor(props){
    super(props);
    this.state = {sideBarOpen:false};

  }

  componentDidMount() {

  }

  toggleSidebar() {
    this.setState((prevState) => ({
      sideBarOpen:!prevState.sideBarOpen
    }));
  }

  render(){
    return(
     <NavbarCustom onClickSidebar = {this.toggleSidebar.bind(this)}></NavbarCustom>
      /* <Main></Main>
      <Sidebar width={this.state.sideBarOpen ? '300px':'0px'}></Sidebar> */
    )
  }
}
