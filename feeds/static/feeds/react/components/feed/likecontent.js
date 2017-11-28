import React from 'react'
import ReactDOM from 'react-dom'
import Likes from './like.js'

export default class LikeContent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      allLikes:{like_set:[],user_in_likes:false}
    }
    this.updateLikes = this.updateLikes.bind(this)
    this.handleLike = this.handleLike.bind(this)
    this.handleLikeModal = this.handleLikeModal.bind(this)
  }

  componentDidMount() {
    this.updateLikes()
  }

  updateLikes() {
    var id = this.props.id
    $.ajax({
      type: 'GET',
      url: '/post/'+id+'/likes/api/',
      success: function(likes){
        this.setState({
          allLikes:likes
        })

      }.bind(this)
      });
  }

  handleLike() {
    var id = this.props.id
    $.ajax({
      type: 'PUT',
      url: '/post/'+id+'/likes/api/',
      success: function(likes){
        this.setState({
          allLikes:likes
        })
      }.bind(this)
      });

  }

  handleLikeModal() {
    this.props.openLikeList(this.props.id)
  }

  render() {
    console.log(this.state.allLikes)

    return(
      <Likes
        likeCount={this.state.allLikes.like_set.length}
        userInLikes={this.state.allLikes.user_in_likes}
        handleLike={this.handleLike} handleLikeModal={this.handleLikeModal}>
      </Likes>
    )

  }
}
