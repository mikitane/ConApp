import React from 'react'
import ReactDOM from 'react-dom'

export default class PostInputForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      headerValue:"",
      textValue:""
    }
    this.handleChangeHeader = this.handleChangeHeader.bind(this)
    this.handleChangeText = this.handleChangeText.bind(this)
    this.handleSend = this.handleSend.bind(this)
  }

  handleSend() {
    if (this.state.headerValue != "" && this.state.textValue != "") {
      this.props.sendNewPost(this.state.headerValue,this.state.textValue)
    this.setState({
      headerValue:"",
      textValue:""
    })
  }

  }

  handleChangeHeader(event) {
      this.setState({headerValue:event.target.value})
  }
  handleChangeText(event) {
      this.setState({textValue:event.target.value})
  }


  render() {

    return(
      <div className="container-fluid" style={{marginLeft:'10px'}}>
    		<h3>Write a post!</h3>
      		<div>

      		<div className="row">
      			<div className='col-md-6'>
              <div className="form-group has-danger ">
              <input type="text" className="form-control form-control-danger" id="inputDanger1" value={this.state.headerValue}
                placeholder="Write a post header!" onChange={this.handleChangeHeader}></input>
      			</div>
          </div>
      		</div>
      		<div className="form-group row">
      			<div className='col-md-10' >
              <textarea style={{overflow:'hidden'}} rows="3" className="form-control" value={this.state.textValue}
                placeholder="Write your post here!" onChange={this.handleChangeText}></textarea>
      			</div>
      		</div>
      		<button type="button" className="btn btn-primary" onClick={this.handleSend}>Post!</button>
        </div>


		</div>
    )

  }


}
