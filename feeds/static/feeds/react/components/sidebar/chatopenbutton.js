import React from 'react'
import ReactDOM from 'react-dom'



// Single button for opening a new chat
export class SingleChatButton extends React.Component{
  constructor(props){
    super(props)
    this.state = {chatOpen:false}
  }

  componentDidUpdate(prevProps, prevState){

  }

  handleClick(id) {
    this.setState({chatOpen:true})
  }

  render(){
    return (
      <button className="list-group-item con-button" data-toggle="modal"
         data-target="#conversation-modal" onClick={this.handleClick.bind(this)}>
         {this.props.image &&
           <img className="conversation-image" src={this.props.image}></img>
         }
         {this.props.name}
       </button>


    )
  }
}
