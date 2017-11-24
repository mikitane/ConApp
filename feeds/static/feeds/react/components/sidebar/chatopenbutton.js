import React from 'react'
import ReactDOM from 'react-dom'



// Single button for opening a new chat
export default class SingleChatButton extends React.Component{

  openNewChat(){
    this.props.openChat(this.props.chatId,this.props.name)
  }

  render(){
    return (
      <button className="list-group-item con-button" data-toggle="modal"
         data-target="#conversation-modal" onClick={this.openNewChat.bind(this)}>
         {this.props.image &&
           <img className="conversation-image" src={this.props.image}></img>
         }
         {this.props.name}
       </button>


    )
  }
}
