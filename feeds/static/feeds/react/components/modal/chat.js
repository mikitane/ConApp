import React from 'react'
import ReactDOM from 'react-dom'

export default class SingleChat extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      allMessages:""
    }
    this.scrollToBottom = this.scrollToBottom.bind(this)
  }



  componentDidMount(){
    var id = this.props.chatId
    $.ajax({
      type: 'GET',
      url: '/messages/'+id+'/api',
      success: function(messages){

        this.setState({
          allMessages:messages
        })

      }.bind(this)
      });
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  scrollToBottom() {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView();
    }


  render(){

  var currentUser = this.props.currentUser
  var messageList = []
  var messageColors = {}
  messageColors[currentUser]=0

  var key = 1
  var color = 1
  var latestMessageDate = ""
  for (let message of this.state.allMessages){

    var messageSent = message.created.split('-')
    var messageSentDate = messageSent[0]
    var messageSentTime = messageSent[1]

    if (messageSentDate != latestMessageDate) {
      messageList.push(<center>{messageSentDate}</center>)
      latestMessageDate = messageSentDate
    }

    if (!(message.sender in messageColors) && message.sender_username != currentUser) {
      messageColors[message.sender] = color
      color += 1
      if (color == 4){
        color = 1
      }
    }


    messageList.push(<Message key={key} text={message.text} sender={message.sender_username}
                    created={messageSentTime} color={messageColors[message.sender]}
                    side={message.sender_username == currentUser? 'right':'left'}
                    offset={message.sender_username == currentUser ? 'col-sm-offset-4':''}>
                      </Message>)
    key++
  }
  const messageListStyle = {
    overflowY:'scroll',
    overflowX:'visible',
    height:'500px',
    paddingLeft:'15px',
    paddingRight:'15px',
  }
  return (<div style={messageListStyle}>{messageList}<div ref={(el) => { this.messagesEnd = el; }}></div></div>)
  }


}

class Message extends React.Component {


  render(){
    const rowStyle = {
      marginTop:'5px'
    }

    const colStyle = {
      overflow:'auto'
    }

    const createdStyle = {
      float:'right'
    }


    return(
    <div className="row" style={rowStyle}>
      <div className={"col-sm-8 "+this.props.offset }  style={colStyle} >
        <div className={"bubble "+this.props.side+' color'+this.props.color}>
          <p><b>{this.props.sender}</b></p>
          <p>{this.props.text} </p>
        <div style={createdStyle}><i>{this.props.created}</i>
        </div>
        </div>
      </div>
    </div>
  )
  }
}
