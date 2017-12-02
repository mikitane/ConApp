import React from 'react'
import ReactDOM from 'react-dom'
import ChatsList from './chatlist.js'

// Gets all conversations from API
export default class ChatsListContent extends React.Component{

  constructor(props){
    super(props)
    this.state = {chats:[]}
    this.updateChats = this.updateChats.bind(this)
  }

  componentDidMount(){
    this.updateChats()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sidebarNeedsUpdate==true) {
      this.updateChats()
      this.props.updateSidebar()
    }
  }


  updateChats() {
    $.ajax({
      type: 'GET',
  		url: '/messages/api',
  		success: function(conversations){

        this.setState({
          chats: conversations
        });
      }.bind(this)
    });

  }

  render(){
    return(
      <ChatsList openCreateNewGroupChat={this.props.openCreateNewGroupChat}
         toggleSidebar = {this.props.toggleSidebar} chats={this.state.chats}
         openChat={this.props.openChat} currentUser={this.props.currentUser}>

         </ChatsList>
    )
  }
};
