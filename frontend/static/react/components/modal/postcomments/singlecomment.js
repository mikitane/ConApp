import React from 'react'
import {Link} from 'react-router-dom'

export default class SingleComment extends React.Component {
  handleClick() {
    this.props.toggleModal()
    this.props.updateProfileContent()
  }

  render() {
    return(

    <div className='container-fluid post-box' >
      <div className="row">
      <div className="col-sm-2 post-image-box" >

      <img className="post-image" src={this.props.comment.image} ></img>
        </div>
      <div className="col-sm-10">
        <div >
          <Link to={'/profile/'+this.props.comment.user} style={{marginRight:'5px'}}
          onClick={this.handleClick}>

          {this.props.comment.username}
          </Link>

      <p>{this.props.comment.text}</p>
      <div className="post-info">
        <small>{this.props.comment.created}</small>


        </div>
      </div>
      </div>
    </div>
  </div>


    )
  }


}
