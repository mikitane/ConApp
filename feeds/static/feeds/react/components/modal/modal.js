import React from 'react'
import ReactDOM from 'react-dom'
import ChatContent from './chat/chatcontent.js'
import NewGroupChatContent from './newgroupchat/newgroupchatcontent.js'


export default class ModalContent extends React.Component{
  render(){

    let content = null
    if (this.props.modalContent == 'chat' && this.props.modalOpen==true) {
      content = <ChatContent chatId={this.props.chatId}
        modalTitle={this.props.modalTitle} modalOpen={this.props.modalOpen}
        toggleModal={this.props.toggleModal} currentUser={this.props.currentUser}>
        </ChatContent>
    } else if (this.props.modalContent == 'likes') {

    } else if (this.props.modalContent == 'newgroupchat') {
      content = <NewGroupChatContent modalTitle={this.props.modalTitle}
        modalOpen={this.props.modalOpen}
      toggleModal={this.props.toggleModal} currentUser={this.props.currentUser}
      openChat={this.props.openChat} toggleModal={this.props.toggleModal}>

      </NewGroupChatContent>

    }

    return(
        content
        )
      }
     }
