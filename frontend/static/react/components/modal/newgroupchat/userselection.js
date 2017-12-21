import React from 'react'
import ReactDOM from 'react-dom'
import UserSelectionButton from './userselectbutton.js'

export default class UserSelection extends React.Component {

  render(){
    var userList = []
    var key=1
    for (let user of this.props.allUsers){
      if (this.props.currentUser != user.username) {

        userList.push(<UserSelectionButton key={key} user={user}
          selectUser={this.props.selectUser}></UserSelectionButton>)
      }
      key++

    }

    return(
      <ul >{userList}</ul>
    )

  }


}
