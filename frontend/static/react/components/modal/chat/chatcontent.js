import React from 'react'
import ReactDOM from 'react-dom'
import {Modal} from 'react-bootstrap'
import SingleChat from './chat.js'
import NewMessageInput from './sendmessage.js'
import ParticipantsList from './participantslist.js'

export default class ChatContent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      allMessages:"",
      timer:"",



    }
    this.sendNewMessage = this.sendNewMessage.bind(this)
    this.updateMessages = this.updateMessages.bind(this)

  }



  componentDidMount(){

    this.updateMessages()

    var timer = setInterval(this.updateMessages,5000)
    this.setState({timer:timer})

  }


  componentWillUnmount(){
    clearInterval(this.state.timer)
  }


  updateMessages() {
    var id = this.props.chatId
    $.ajax({
      type: 'GET',
      url: '/messages/'+id+'/api',
      success: function(messages){

        this.setState((prevState) => ({
          allMessages:messages,

        }));

      }.bind(this)
      });
  }

  sendNewMessage(text) {
    var info = {'text':text}
    var id = this.props.chatId
    $.ajax({

		type: 'POST',
		url: '/messages/'+id+'/api/',
		data: info,
		success: function(){
			this.updateMessages()

		}.bind(this)

		});

  }



  render(){


    return(
      <Modal show={this.props.modalOpen} onHide={this.props.toggleModal}>
         <Modal.Header closeButton>
           <Modal.Title><p style={{display:'inline'}}>{this.props.modalTitle}</p>
             {this.props.chatParticipants.length != 2 && <ParticipantsList chatParticipants={this.props.chatParticipants}
             toggleModal={this.props.toggleModal} toggleSidebar={this.props.toggleSidebar}/>}
           </Modal.Title>
         </Modal.Header>
         <Modal.Body style={{overflow:'auto',height:'70vh'}}>
           <SingleChat allMessages={this.state.allMessages}
             chatId={this.props.chatId}
             currentUser={this.props.currentUser}

             ></SingleChat>
         </Modal.Body>
         <Modal.Footer>
           <NewMessageInput sendNewMessage={this.sendNewMessage}></NewMessageInput>
         </Modal.Footer>
       </Modal>





      )
    }
  }
