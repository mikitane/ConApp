import React from 'react'
import ReactDOM from 'react-dom'


export default class UserSelection extends React.Component {

  render(){
    var userList = []
    for (let user of this.props.allUsers){
      if (this.props.currentUser != user.username) {

        userList.push(<button className="btn select-user" check="0" value="">
          <img className="conversation-image" src={user.image}></img>{user.username}
          </button>)
      }


    }
    const userListStyle = {
      overflowY:'scroll',
      overflowX:'visible',
      height:'250px',
      paddingLeft:'15px',
      paddingRight:'15px',
      marginLeft:'10px',
      marginRight:'10px',
    }
    return(
      <div style={userListStyle}>{userList}</div>
    )

  }


}
