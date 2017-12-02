import React from 'react'
import ReactDOM from 'react-dom'


export default class LikedUserButton extends React.Component {

  render(){
    return (
      <a className="list-group-item con-button"
          href={'/profile/'+this.props.id}>
        <img className="conversation-image" src={this.props.image}></img>
         {this.props.name}
       </a>


    )
  }


}
