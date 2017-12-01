import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'

export default class ChangeProfileInfoButton extends React.Component {


  render() {
    return(

      <a className="btn btn-primary"
         style={{marginTop:'20px'}} href="/profile/change" >Change profile info</a>

    )
  }
}
