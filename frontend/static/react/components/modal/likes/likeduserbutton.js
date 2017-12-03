import React from 'react'
import ReactDOM from 'react-dom'
import { LinkContainer } from 'react-router-bootstrap'

export default class LikedUserButton extends React.Component {

  render(){
    return (
      <LinkContainer to={'/profile/'+this.props.id}>
        <button className="list-group-item con-button" onClick={this.props.toggleModal}>
          <img className="conversation-image" src={this.props.image}></img>
           {this.props.name}
        </button>
      </LinkContainer>



    )
  }


}
