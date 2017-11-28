import React from 'react'
import ReactDOM from 'react-dom'
import LikeContent from './likecontent.js'


export default class Post extends React.Component {

  render() {

    return(
      <div className='container-fluid post-box' >
		<div className="row">
		<div className="col-sm-2 post-image-box" >

		<img className="post-image" src={this.props.post.image} ></img>
		  </div>
		<div className="col-sm-10">
		<p><b>{this.props.post.header}</b></p>

		<p>{this.props.post.text}</p>
		<div className="post-info">
			<a href={'/profiles/'+this.props.post.user} >
      {this.props.post.username}
      </a><small>{this.props.post.created}</small>
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
