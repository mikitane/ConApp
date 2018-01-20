import React from 'react'
import ReactDOM from 'react-dom'
import ChatContent from './chat/chatcontent.js'
import NewGroupChatContent from './newgroupchat/newgroupchatcontent.js'
import LikeListContent from './likes/likelist.js'
import PostCommentsContent from './postcomments/postcommentscontent.js'

export default class ModalContent extends React.Component{
  render(){

    let content = null
    if (this.props.modalContent == 'chat' && this.props.modalOpen==true) {
      content = <ChatContent chatId={this.props.chatId}
        modalTitle={this.props.modalTitle} modalOpen={this.props.modalOpen}
        toggleModal={this.props.toggleModal} currentUser={this.props.currentUser}
        chatParticipants={this.props.chatParticipants}
        toggleSidebar={this.props.toggleSidebar}
        updateProfileContent ={this.updateProfileContent}>
        </ChatContent>
    } else if (this.props.modalContent == 'likes' && this.props.modalOpen==true) {
      content = <LikeListContent postId={this.props.postId} modalOpen={this.props.modalOpen}
                toggleModal={this.props.toggleModal} modalOpen={this.props.modalOpen}
                toggleSidebar={this.props.toggleSidebar}
                modalTitle={this.props.modalTitle}
                updateProfileContent = {this.props.updateProfileContent}></LikeListContent>

    } else if (this.props.modalContent == 'newgroupchat' && this.props.modalOpen==true) {
      content = <NewGroupChatContent modalTitle={this.props.modalTitle}
        modalOpen={this.props.modalOpen}
      toggleModal={this.props.toggleModal} currentUser={this.props.currentUser}
      openChat={this.props.openChat} updateSidebar={this.props.updateSidebar}>

      </NewGroupChatContent>

    } else if (this.props.modalContent == 'postcomments' && this.props.modalOpen==true) {
      content = <PostCommentsContent id={this.props.postId} modalOpen={this.props.modalOpen}
      toggleModal={this.props.toggleModal} currentUser={this.props.currentUser}
      updateProfileContent = {this.props.updateProfileContent}/>
    }

    return(
        content
        )
      }
     }
