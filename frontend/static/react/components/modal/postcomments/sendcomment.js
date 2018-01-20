import React from 'react'




export default class NewCommentInput extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value:''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSend = this.handleSend.bind(this)
  }

  handleSend() {
    if(this.state.value != "") {
      this.props.sendNewComment(this.state.value)
      this.setState({
        value:""
      })
    }

  }

  handleChange(event) {
      this.setState({value:event.target.value})
  }

  render(){
    return (
      <div className="row">
    			<div className="col-xs-8">
    			<input type="text" className="form-control" value={this.state.value}
            placeholder="Write a new comment..." onChange={this.handleChange}>

          </input>

    			</div>
    			<div className="col-xs-4">

    			<button type="button"  className="btn btn-primary"
            onClick={this.handleSend}>Send</button>
    			</div>
    	</div>
    )
  }

}
