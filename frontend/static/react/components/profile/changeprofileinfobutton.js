import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'

export default class ChangeProfileInfoButton extends React.Component {


  render() {
    return(

      <Link to={"/profile/"+this.props.userId+"/change"}><button className="btn btn-primary"
         style={{marginTop:'20px'}} >Update profile info</button></Link>

    )
  }
}
