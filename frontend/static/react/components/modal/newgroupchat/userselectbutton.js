import React from 'react'
import ReactDOM from 'react-dom'


export default class UserSelectionButton extends React.Component {

constructor(props) {
  super(props)
  this.state={
    selected:false
  }
  this.handleClick = this.handleClick.bind(this)
}


handleClick() {
  this.setState((prevState)=>({
    selected:!prevState.selected,
  }));
  this.props.selectUser(this.props.user.id)
}


render(){

  if (this.state.selected) {
    var btnStyle = {
      backgroundColor:'#92ff8e',
      border:'2px solid #278423'
    }
  } else {
    var btnStyle = {}
  }

  return(
    <div>
      <button className="btn select-user" style={btnStyle} onClick={this.handleClick}>
      <img className="conversation-image" src={this.props.user.image}>
      </img>{this.props.user.username}
      </button>
    </div>
    )
  }
}
