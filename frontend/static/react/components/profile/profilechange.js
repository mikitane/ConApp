import React from 'react'
import ReactDOM from 'react-dom'
import {Redirect} from 'react-router-dom'
import SaveChangesButton from './savechangesbutton.js'

export default class ProfileChange extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      phoneValue:this.props.profile.phone,
      countryValue:this.props.profile.country,
      image:"",
      redirect:false,
    }
    this.handlePhoneChange = this.handlePhoneChange.bind(this)
    this.handleCountryChange = this.handleCountryChange.bind(this)
    this.handleImageChange = this.handleImageChange.bind(this)
    this.saveChanges = this.saveChanges.bind(this)
  }

  handlePhoneChange(event) {
    this.setState({
      phoneValue:event.target.value
    })
  }

  handleCountryChange(event) {
    this.setState({
      countryValue:event.target.value
    })
  }

  handleImageChange(event) {
    let file = event.target.files[0];
    this.setState({
        image: file,
      });
    }



  saveChanges() {
    this.props.saveProfileChanges(this.state.phoneValue,
                  this.state.countryValue,this.state.image)
    this.setState({
      redirect:true
    })
  }

  render() {
    var content = ""
    if (this.state.redirect) {
      content = <Redirect to={"/profile/"+this.props.userId} />
    } else {
    content =
    <div>
        <div >
         <p style={{display:'inline'}}><b>Phone: </b></p>
         <input value={this.state.phoneValue} onChange={this.handlePhoneChange}
         />
       </div>
       <div style={{marginTop:'15px',marginBottom:'15px'}}>
         <p style={{display:'inline'}}><b>Country: </b></p>
         <input value={this.state.countryValue} onChange={this.handleCountryChange}/>
         <br></br>
       </div>
       <div style={{marginTop:'15px',marginBottom:'15px'}}>
         <p style={{display:'inline'}}><b>Image: </b></p>
         <input type="file" onChange={this.handleImageChange}/>
         <br></br>
       </div>
        <SaveChangesButton saveChanges={this.saveChanges}></SaveChangesButton>

      </div>
    }
    return(
      content

    )
  }



}
