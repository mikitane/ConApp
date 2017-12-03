import React from 'react'
import ReactDOM from 'react-dom'


export default class StartChatButton extends React.Component {

  handleNewChat() {
    var info = {participants:[this.props.userId]}
    $.ajax({

			type:'POST',
			url:'/messages/api/',
			data: JSON.stringify(info),
			contentType: "application/json",
			success: function(chat){
				var chatId = chat.id
        this.props.updateSidebar()
        this.props.openChat(chatId,this.props.userName,chat.participants)

			}.bind(this)


		});



  }


  render() {
    return(
      <button className="btn btn-primary" type="button"
         style={{marginTop:'20px'}} onClick={this.handleNewChat.bind(this)}>Start conversation!</button>



    )
  }


}
