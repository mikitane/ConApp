import React from 'react'
import ReactDOM from 'react-dom'
import {Modal} from 'react-bootstrap'
import SingleChat from './chat.js'
import NewMessageInput from './sendmessage.js'

export default class ChatContent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      allMessages:"",
      timer:"",
      update:0,


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
          update: prevState.update + 1
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
           <Modal.Title>{this.props.modalTitle}</Modal.Title>
         </Modal.Header>
         <Modal.Body style={{overflow:'auto'}}>
           <SingleChat allMessages={this.state.allMessages}
             chatId={this.props.chatId}
             currentUser={this.props.currentUser}
             update={this.state.update}
             ></SingleChat>
         </Modal.Body>
         <Modal.Footer>
           <NewMessageInput sendNewMessage={this.sendNewMessage}></NewMessageInput>
         </Modal.Footer>
       </Modal>





      )
    }
  }
