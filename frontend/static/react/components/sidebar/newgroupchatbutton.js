import React from 'react'
import ReactDOM from 'react-dom'

export default class NewGroupChatButton extends React.Component{

  openNewGroupChat(){
    this.props.openCreateNewGroupChat()
  }

  render(){
    return (
      <button className="btn start-group-con"
        onClick={this.openNewGroupChat.bind(this)}>
			<span className="glyphicon glyphicon-plus" style={{color:'#42f450'}}>
      </span>
    </button>


    )
  }
}
