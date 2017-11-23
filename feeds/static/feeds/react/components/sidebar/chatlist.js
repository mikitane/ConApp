import React from 'react'
import ReactDOM from 'react-dom'


// Consists all the sidebar content
export class ChatsList extends React.Component {

  render() {

    const privateChats = [];
    const groupChats = [];
    let currentUser = document.getElementById('grad').getAttribute('data-id')

    for (let chat of this.props.chats) {

      if (chat.participants.length < 3) {
        let currentUser = document.getElementById('grad').getAttribute('data-id')
        for (let participant of chat.participants){
          if (participant.user != currentUser){
            var chatName = participant.user
            var chatImage = participant.image
          }
        }
        privateChats.push(<SingleChatButton name={chatName}
                          image={chatImage} key={chat.id} chatId={chat.id}></SingleChatButton>)
      } else {
        groupChats.push(<SingleChatButton name={chat.name} key={chat.id} chatId={chat.id}></SingleChatButton>)
      }
    }
      return (
        <div>
          <a href="javascript:void(0)" id="close-sidebar-button"
              className="closebtn">&times;</a>
          <div className="list-group">
          <h2 className="special-font">Chats:</h2>
          {privateChats}
          <h2 className="special-font">Group Chats:</h2>
          {groupChats}
        </div>
        </div>


      )

    };


  }


// Gets all conversations from API
export class ChatsListContent extends React.Component{

  constructor(props){
    super(props)
    this.state = {chats:[]}
  }

  componentDidMount(){
    $.ajax({
      type: 'GET',
  		url: '/messages/api',
  		success: function(conversations){
        console.log(conversations)
        this.setState({
          chats: conversations
        });
      }.bind(this)
    });
  }

  render(){
    return(
      <ChatsList chats={this.state.chats}></ChatsList>
    )
  }
};
