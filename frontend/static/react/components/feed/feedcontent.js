import React from 'react'
import ReactDOM from 'react-dom'
import Feed from './feed.js'

export default class FeedContent extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      allPosts:"",

    }
    this.updatePosts = this.updatePosts.bind(this)
    this.sendNewPost = this.sendNewPost.bind(this)
    this.deletePost = this.deletePost.bind(this)
  }

  componentDidMount() {
    this.updatePosts()
  }

  updatePosts() {

    $.ajax({
      type: 'GET',
      url: '/posts/api',
      success: function(posts){
        this.setState({
          allPosts:posts
        })

      }.bind(this)
      });
  }

  sendNewPost(header,text) {
    var info = {'header':header,'text':text}
    $.ajax({

		type: 'POST',
		url: '/posts/api/',
    dataType:'json',
		data: JSON.stringify(info),
    contentType: "application/json; charset=utf-8",
		success: function(posts){
      this.updatePosts()
		}.bind(this)

		});

  }

  deletePost(id) {
    var info = {id:id}


    $.ajax({

		type: 'DELETE',
		url: '/posts/api/',
    dataType:'json',
		data: JSON.stringify(info),
    contentType: "application/json; charset=utf-8",
		success: function(deletedPost){
      var posts = this.state.allPosts
      posts.forEach((post)=> {
        if (post.id == deletedPost.id) {
          var index = posts.indexOf(post)
          posts.splice(index,1)
          console.log(posts)
          this.setState({
            allPosts:posts
          })
        }
      })
		}.bind(this)

		});


  }




  render() {

    return(
      <Feed posts={this.state.allPosts} openLikeList={this.props.openLikeList}
            sendNewPost={this.sendNewPost} deletePost={this.deletePost}
            currentUser={this.props.currentUser}>

      </Feed>

    )
  }


}
