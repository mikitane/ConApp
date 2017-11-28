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




  render() {

    return(
      <Feed posts={this.state.allPosts} openLikeList={this.props.openLikeList}>
        
      </Feed>

    )
  }


}
