import React from 'react'
import ReactDOM from 'react-dom'
import SaveChangesButton from './savechangesbutton.js'

export default class ProfileChangeInfo extends React.Component {



  render() {
    var content = ""
    if(this.props.profile.username == this.props.currentUser) {
      content = <div>
      <p><b>Phone: {this.props.profile.phone}</b></p>
      <p><b>Country: {this.props.profile.country}</b></p>
      <SaveChangesButton></SaveChangesButton>
    </div>
  } else {
    content = <p>Eror</p>
  }
    return(

      content
    )
  }
}
