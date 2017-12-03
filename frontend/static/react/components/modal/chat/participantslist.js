import React from 'react'
import ReactDOM from 'react-dom'
import {DropdownButton,MenuItem} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

export default class ParticipantsList extends React.Component {

  handleClick() {
    this.props.toggleModal()
    this.props.toggleSidebar()
  }

  renderUserLink(participant,i) {
    return (
      <LinkContainer key={participant.id} to={"/profile/"+participant.id} onClick={this.handleClick.bind(this)}><MenuItem eventKey={i} >{participant.user}</MenuItem></LinkContainer>
    )
  }

  render() {
    return(
      <div style={{marginRight:'30px',display:'inline',float:'right'}}>
      <DropdownButton bsStyle="primary" title="Participants" id="dropdown">

        {this.props.chatParticipants.map(this.renderUserLink.bind(this))}
      </DropdownButton>
    </div>
    )
  }


}
