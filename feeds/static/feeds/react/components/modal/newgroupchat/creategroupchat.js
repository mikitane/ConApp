import React from 'react'
import ReactDOM from 'react-dom'


export default class NewGroupChatInput extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value:''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
  }

  handleCreate() {
    this.props.createNewGroupChat(this.state.value)
    this.setState({
      value:""
    })
  }

  handleChange(event) {
      this.setState({value:event.target.value})
  }

  render(){
    return (
      <div className="row">
    			<div className="col-xs-8">
    			<input type="text" className="form-control" value={this.state.value}
            placeholder="Write a name for the chat..." onChange={this.handleChange}></input>

    			</div>
    			<div className="col-xs-4">

    			<button type="button" className="btn btn-primary"
            onClick={this.handleCreate}>Create</button>
    			</div>
    	</div>
    )
  }

}
