import React from 'react'
import ReactDOM from 'react-dom'
import ModalCustom from './modal/modal.js'

export default class Main extends React.Component {

  render() {
    return(

      <ModalCustom modalContent={this.props.modalContent} chatId={this.props.chatId}
        modalTitle={this.props.modalTitle} modalOpen={this.props.modalOpen}
        toggleModal={this.props.toggleModal} currentUser={this.props.currentUser}></ModalCustom>

    )
  }


}
