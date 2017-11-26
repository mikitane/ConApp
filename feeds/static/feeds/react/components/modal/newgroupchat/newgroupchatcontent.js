import React from 'react'
import ReactDOM from 'react-dom'
import {Modal} from 'react-bootstrap'
import UserSelection from './userselection.js'

export default class NewGroupChatContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allUsers:''
    }
    this.updateUsers = this.updateUsers.bind(this)
  }

  componentDidMount() {
    this.updateUsers()
  }

  updateUsers(){
    $.ajax({
      type: 'GET',
      url: '/messages/users/api/',
      success: function(users){
        this.setState({
          allUsers:users
        })

      }.bind(this)
      });
      }


  render() {


    return(
      <Modal show={this.props.modalOpen} onHide={this.props.toggleModal}>
         <Modal.Header closeButton>
           <Modal.Title>{this.props.modalTitle}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
          <UserSelection currentUser={this.props.currentUser}
             allUsers={this.state.allUsers}></UserSelection>
         </Modal.Body>
         <Modal.Footer>

         </Modal.Footer>
       </Modal>
    )

  }









}
