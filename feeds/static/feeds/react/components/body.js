import React from 'react'
import ReactDOM from 'react-dom'
import NavbarCustom from './navbar.js'
import Sidebar from './sidebar/sidebar.js'
import Main from './main.js'


export default class Body extends React.Component {

  constructor(){
    super();
    this.state = {
      sideBarOpen:false,
      modalContent:false,
      chatId:false,
      modalTitle:false,
      modalOpen:false,
      currentUser:""
    };
    this.toggleSidebar = this.toggleSidebar.bind(this)
    this.openChat = this.openChat.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.openCreateNewGroupChat = this.openCreateNewGroupChat.bind(this)
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
  		url: '/messages/ownprofile/api',
  		success: function(ownprofile){
        this.setState({
          currentUser: ownprofile.username
        });
      }.bind(this)
    });
  }

  toggleModal(){
    this.setState((prevState)=>({
      modalOpen:!prevState.modalOpen,

    }));
  }

  openChat(chatId,chatName){
    this.setState({
      modalContent:'chat',
      chatId:chatId,
      modalTitle:chatName,
    });
    this.toggleModal()

  }

  openCreateNewGroupChat() {
    this.setState({
      modalContent:'newgroupchat',
      modalTitle:'Create a new group chat!'
    })
    this.toggleModal()
  }

  toggleSidebar() {
    this.setState((prevState) => ({
      sideBarOpen:!prevState.sideBarOpen
    }));
  }

  render(){
    return(
      <div>
        <NavbarCustom currentUser = {this.state.currentUser}
          toggleSidebar = {this.toggleSidebar}></NavbarCustom>

        <Main modalContent={this.state.modalContent} chatId={this.state.chatId}
          modalTitle={this.state.modalTitle} modalOpen={this.state.modalOpen}
          toggleModal={this.toggleModal} currentUser={this.state.currentUser}
          openChat={this.openChat} toggleModal={this.toggleModal}></Main>

        <Sidebar openCreateNewGroupChat={this.openCreateNewGroupChat}
          toggleSidebar = {this.toggleSidebar}
           width={this.state.sideBarOpen ? '300px':'0px'}
           openChat={this.openChat} currentUser={this.state.currentUser}></Sidebar>
      </div>
    )
  }
}
