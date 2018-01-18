import React from 'react'
import ReactDOM from 'react-dom'

export default class Likes extends React.Component {

  handleLike() {
    this.props.handleLike()
  }

  handleLikeModal() {
    this.props.handleLikeModal()
  }


render() {
  var buttons = ""

  if (this.props.userInLikes) {
    buttons = <div style={{display:"inline"}}>
              <button type="button" className="btn  btn-xs like-count"
              onClick={this.handleLikeModal.bind(this)}>
              {this.props.likeCount}
              </button>

              <button type="button" className="btn btn-xs btn-primary like-button"
                onClick={this.handleLike.bind(this)}>
                <span className="glyphicon glyphicon-thumbs-up"
                style={{marginRight:'5px'}}></span>
                <p style={{display:'inline'}}>Liked</p>
              </button>
            </div>
  } else {
    buttons = <div style={{display:"inline"}}>
              <button type="button" className="btn  btn-xs like-count"
              onClick={this.handleLikeModal.bind(this)}>
              {this.props.likeCount}
              </button>

              <button type="button" className="btn  btn-xs like-button"
                onClick={this.handleLike.bind(this)}>
                <span className="glyphicon glyphicon-thumbs-up"
                style={{marginRight:'5px'}}></span>
                <p style={{display:'inline'}}>Like</p>
              </button>
            </div>
  }

  return(
    <div style={{display:"inline"}}>
      {buttons}
    </div>



  )
}




}
