import React from 'react'
import ReactDOM from 'react-dom'
import {FormGroup,ControlLabel,FormControl,HelpBlock} from 'react-bootstrap'

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
    this.headerValidation = this.headerValidation.bind(this)
    this.textValidation = this.textValidation.bind(this)
    this.headerCharsRemaining = this.headerCharsRemaining.bind(this)
    this.textCharsRemaining = this.textCharsRemaining.bind(this)
  }

  handleSend() {
    if (this.state.headerValue != "" && this.state.textValue != ""
        && this.state.headerValue.length < 36 &&
        this.state.textValue.length < 301) {
      this.props.sendNewPost(this.state.headerValue,this.state.textValue)
    this.setState({
      headerValue:"",
      textValue:""
    })
    this.props.togglePostInput()
  }

  }

  handleChangeHeader(event) {
      this.setState({headerValue:event.target.value})
  }
  handleChangeText(event) {
      this.setState({textValue:event.target.value})
  }

  headerValidation() {
    if (this.state.headerValue.length < 36) {
      return (null)
    } else {
      return ("error")
    }
  }

  textValidation() {
    if (this.state.textValue.length < 301) {
      return null
    } else {
      return "error"
    }
  }

  headerCharsRemaining() {
    if (this.state.headerValue.length > 34) {
      return 0
    } else {
      return (35 - this.state.headerValue.length)
    }
  }

  textCharsRemaining() {
    if (this.state.textValue.length > 299) {
      return 0
    } else {
      return (300 - this.state.textValue.length)
    }

  }


  render() {

    return(

      <div className="container-fluid" style={{marginLeft:'10px'}}>
    		<h3>Write a post!</h3>



            <form>
              <div className="row">
          			<div className='col-md-8'>
            <FormGroup controlId="formControlsTextarea"
              validationState={this.headerValidation()}>
                <FormControl type="text"
                  placeholder="Write a header for your post!"
                  onChange={this.handleChangeHeader}
                  value={this.state.headerValue} >
                </FormControl>
            </FormGroup>
            </div>
                <div className='col-md-4'>

              <HelpBlock>{this.headerCharsRemaining()}</HelpBlock>

              </div>
            </div>
              <div className="row">
          			<div className='col-md-10'>
            <FormGroup controlId="formControlsTextarea"
              validationState={this.textValidation()}>
                <FormControl style={{resize:"none",overflow:'hidden'}} type="text"
                  componentClass="textarea"  rows="4"
                  placeholder="Write your post here!"
                  onChange={this.handleChangeText}
                  value={this.state.textValue}>
                </FormControl>
            </FormGroup>
              </div>
              <div className='col-md-2'>
                <HelpBlock>{this.textCharsRemaining()}</HelpBlock>
              </div>
            </div>
          </form>


      		<button type="button" className="btn btn-primary" onClick={this.handleSend}>Post!</button>



		</div>
    )

  }


}
