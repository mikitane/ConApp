import React from 'react'
import ReactDOM from 'react-dom'
import ChangeProfileInfoButton from './changeprofileinfobutton.js'
import StartChatButton from './startnewchatbutton.js'

export default class ProfileInfo extends React.Component {



  render() {
    return(
      <div>
      <p><b>Phone: {this.props.profile.phone}</b></p>
      <p><b>Country: {this.props.profile.country}</b></p>
      {this.props.currentUser == this.props.profile.username ?
         (<ChangeProfileInfoButton userId={this.props.userId}/>):
         (<StartChatButton openChat = {this.props.openChat}
                        userId={this.props.userId}
                        userName={this.props.profile.username}
                      updateSidebar={this.props.updateSidebar} />)}
        </div>
    )
  }
}
