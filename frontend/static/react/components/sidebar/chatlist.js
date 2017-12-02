import React from 'react'
import ReactDOM from 'react-dom'
import SingleChatButton from './chatopenbutton.js'
import NewGroupChatButton from './newgroupchatbutton.js'

// Consists all the sidebar content
class ChatsList extends React.Component {

  render() {

    const privateChats = [];
    const groupChats = [];
    var currentUser = this.props.currentUser

    for (let chat of this.props.chats) {

      if (chat.participants.length < 3) {

        for (let participant of chat.participants){
          if (participant.user != currentUser){
            var chatName = participant.user
            var chatImage = participant.image
          }
        }
        privateChats.push(<SingleChatButton name={chatName}
          image={chatImage} key={chat.id}
          chatId={chat.id} openChat={this.props.openChat}></SingleChatButton>)
      } else {
        groupChats.push(<SingleChatButton name={chat.name} key={chat.id}
          chatId={chat.id} openChat={this.props.openChat}></SingleChatButton>)
      }
    }
      return (
        <div>
          <a href="javascript:void(0)" id="close-sidebar-button"
              className="closebtn" onClick={this.props.toggleSidebar}>&times;</a>
          <div className="list-group">
          <h2 className="special-font" style={{marginBottom:'10px'}}>Chats:</h2>
          {privateChats}

			    <div style={{marginBottom:'10px'}} >
            <h2 className="special-font" style={{display:'inline'}}>Group chats:</h2>
            <NewGroupChatButton
              openCreateNewGroupChat={this.props.openCreateNewGroupChat}>
            </NewGroupChatButton>
			    </div>


          {groupChats}
        </div>
        </div>


      )

    };


  }


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