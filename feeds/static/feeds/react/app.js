import React from 'react'
import ReactDOM from 'react-dom'
import {SingleChatButton, ChatsList, ChatsListContent} from './components/sidebar.js'





class SingleChat extends React.Component {




  componentDidMount(){
    var id = this.props.chatId
    $.ajax({
      type: 'GET',
      url: '/messages/'+id+'/api',
      success: function(messages){

        var allMessages = messages

      }.bind(this)
    });
  }

  render(){

  var currentUser = document.getElementById('grad').getAttribute('data-id')
  var messageList = []
  var messageColors = {}
  messageColors[currentUser]=0

  var color = 1
  for (let message of allMessages){

    var messageSent = message.created.split('-')
    var messageSentDate = messageSent[0]
    var messageSentTime = messageSent[1]

    if (!(message.sender in userMessageColors) && message.sender_username != currentUser) {
      messageColors[message.sender] = color
      color += 1
      if (color == 4){
        color = 1
      }
    }


    messageList.push(<Message text={message.text} sender={message.sender_username}
                    created={messageSentTime} color={messageColors[message.sender]}
                    side={message.sender_username == currentUser
                      ? 'right':'left'}></Message>)
  }
  return (<div>{messageList}</div>)
  }


}

class Message extends React.Component {
  render(){
    return(
    <div className="row" style="margin-top:5px;">
      <div className="col-sm-8 col-sm-offset-4 " style="overflow:auto" >
        <div className={"bubble "+this.props.side+'color'+this.props.color}>
          <p>{this.props.text} </p>
        <div style="float:right"><i>{this.props.created}</i>
        </div>
        </div>
      </div>
    </div>
  )
  }
}



ReactDOM.render(
  <ChatsListContent></ChatsListContent>,
  document.getElementById('mySidenav')
);
