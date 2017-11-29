import React from 'react'
import ReactDOM from 'react-dom'
import ModalContent from './modal/modal.js'
import FeedContent from './feed/feedcontent.js'

export default class Main extends React.Component {

  render() {
    return(
      <div>
      <ModalContent modalContent={this.props.modalContent} chatId={this.props.chatId}
        modalTitle={this.props.modalTitle} modalOpen={this.props.modalOpen}
        toggleModal={this.props.toggleModal} currentUser={this.props.currentUser}
        openChat={this.props.openChat} toggleModal={this.props.toggleModal}
        postId={this.props.postId} updateSidebar={this.props.updateSidebar}>
      </ModalContent>

      <div className="row">
        <div className="col-md-4 col-md-offset-4">
      <FeedContent openLikeList={this.props.openLikeList}></FeedContent>
        </div>
      </div>
    </div>
    )
  }


}
