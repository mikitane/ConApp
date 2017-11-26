import React from 'react'
import ReactDOM from 'react-dom'
import ModalContent from './modal/modal.js'

export default class Main extends React.Component {

  render() {
    return(

      <ModalContent modalContent={this.props.modalContent} chatId={this.props.chatId}
        modalTitle={this.props.modalTitle} modalOpen={this.props.modalOpen}
        toggleModal={this.props.toggleModal} currentUser={this.props.currentUser}></ModalContent>

    )
  }


}
