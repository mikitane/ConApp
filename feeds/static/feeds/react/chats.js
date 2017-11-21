import React from 'react'
import ReactDOM from 'react-dom'

class Chats extends React.Component {
  render() {
    const privateChats = []
    const groupChats = []

    this.props.chats.forEach((chat)=> {
      if (chat.participants.length < 3){
        let currentUser = document.ElementById('grad').getAttribute('data-id')
        console.log(currentUser)
        <PrivateChat >
      } else {
        <GroupChat>
      }
    })

  }



}



ReactDOM.render(
  <div>Hello!</div>,
  document.getElementById('mySidenav')
);
