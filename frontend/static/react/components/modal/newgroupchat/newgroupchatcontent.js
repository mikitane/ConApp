import React from 'react'
import ReactDOM from 'react-dom'
import {Modal} from 'react-bootstrap'
import UserSelection from './userselection.js'
import NewGroupChatInput from './creategroupchat.js'


export default class NewGroupChatContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allUsers:'',
      selectedUsers:[]
    }
    this.updateUsers = this.updateUsers.bind(this)
    this.selectUser = this.selectUser.bind(this)
    this.createNewGroupChat = this.createNewGroupChat.bind(this)
  }

  componentDidMount() {
    this.updateUsers()
  }

  selectUser(id) {
    var array =this.state.selectedUsers
    if (array.indexOf(id) > -1) {
      var index = array.indexOf(id);
      if (index > -1) {
        array.splice(index, 1);
        this.setState({selectedUsers:array})
      }
    } else {
      array.push(id)
      this.setState({selectedUsers:array})
    }
  }

  createNewGroupChat(chatName) {
    if (this.state.selectedUsers.length > 1 && chatName != '') {
      var info = {participants:this.state.selectedUsers, name:chatName}

      $.ajax({
        type:'POST',
        url:'/messages/api/',
        data: JSON.stringify(info),
        contentType: "application/json",
        success: function(chat){
          this.props.updateSidebar()
          this.props.toggleModal()
          this.props.openChat(chat.id,chatName,chat.participants)
        }.bind(this)


      });
    } else {
      alert('Select at least 2 users and create a chat name.')
    }
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
         <Modal.Body style={{overflow:'auto'}}>
           <div className="modal-list">
          <UserSelection currentUser={this.props.currentUser}
             allUsers={this.state.allUsers} selectUser={this.selectUser}>
          </UserSelection>
          </div>
         </Modal.Body>
         <Modal.Footer>
          <NewGroupChatInput createNewGroupChat={this.createNewGroupChat}></NewGroupChatInput>
         </Modal.Footer>
       </Modal>
    )

  }









}
