import React from 'react'
import ReactDOM from 'react-dom'
import {Modal} from 'react-bootstrap'
import SingleChat from './chat.js'


export default class ModalCustom extends React.Component{
  render(){
    return(
      <Modal show={this.props.modalOpen} onHide={this.props.toggleModal}>
         <Modal.Header closeButton>
           <Modal.Title>{this.props.modalTitle}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <SingleChat chatId={this.props.chatId} currentUser={this.props.currentUser}></SingleChat>
         </Modal.Body>
         <Modal.Footer>
           <button onClick={this.props.toggleModal}>Close</button>
         </Modal.Footer>
       </Modal>
     )
     }
     }
