import React from 'react'
import ReactDOM from 'react-dom'
import Post from './post.js'

export default class Feed extends React.Component {

  componentDidUpdate() {
    this.scrollToBottom()
  }

  scrollToBottom() {
    const node = ReactDOM.findDOMNode(this.postsEnd);
    node.scrollIntoView();
    }


  render() {
    var postList = []
    for (let post of this.props.posts) {

      postList.push(<Post key={post.id} post={post} openLikeList={this.props.openLikeList}>
                    </Post>)

    }

    return(
        <div className="well feed">
          <div className="feed-posts" id="scroll">
          {postList}
          <div ref={(el) => { this.postsEnd = el; }}></div>
          </div>
        </div>
    )


  }

}
