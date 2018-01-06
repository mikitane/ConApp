import React from 'react'
import ReactDOM from 'react-dom'
import LikeContent from './likecontent.js'
import DeletePostButton from './deletebutton.js'
import {Link} from 'react-router-dom'

export default class Post extends React.Component {

  render() {

    return(
      <div className='container-fluid post-box' >
		<div className="row">
		<div className="col-sm-2 post-image-box" >

		<img className="post-image" src={this.props.post.image} ></img>
		  </div>
		<div className="col-sm-10">
      <div >
        <p style={{display:"inline-block"}}><b>{this.props.post.header}</b></p>
        {this.props.currentUser==this.props.post.username && <DeletePostButton
        id={this.props.post.id} deletePost={this.props.deletePost}/>}
      </div>

		<p>{this.props.post.text}</p>
		<div className="post-info">
      <Link to={'/profile/'+this.props.post.user} style={{marginRight:'5px'}}>

      {this.props.post.username}
    </Link><small>{this.props.post.created}</small>
      <LikeContent id={this.props.post.id}
        openLikeList={this.props.openLikeList}>
      </LikeContent>
			</div>
		</div>
		</div>
		</div>


    )
  }

}
