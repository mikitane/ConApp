import React from 'react'
import ReactDOM from 'react-dom'
import NavbarCustom from './navbar.js'
import Sidebar from './sidebar/sidebar.js'



export default class Body extends React.Component {

  constructor(){
    super();
    this.state = {
      sideBarOpen:false,
      modalContent:false,
      chatOpen:false,
      updateModal:false,
    };
    this.toggleSidebar = this.toggleSidebar.bind(this)
    this.openChat = this.openChat.bind(this)
  }

  componentDidMount() {

  }

  openChat(chatId){
    this.setState({
      updateModal:true,
      modalContent:'chat',
      chatOpen:chatId,
    })
  }

  toggleSidebar() {
    this.setState((prevState) => ({
      sideBarOpen:!prevState.sideBarOpen
    }));
  }

  render(){
    return(
      <div>
        <NavbarCustom onClickSidebar = {this.toggleSidebar}></NavbarCustom>

          <Sidebar width={this.state.sideBarOpen ? '300px':'0px'} openChat={this.openChat}></Sidebar>
      </div>
    )
  }
}
/*  */
