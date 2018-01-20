import React from 'react'
import ReactDOM from 'react-dom'
import Post from './post.js'
import PostInputForm from './postinputform.js'
import {Collapse} from 'react-bootstrap'

export default class Feed extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      postInputOpen:false,
    }
    this.togglePostInput = this.togglePostInput.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps != this.props) {
    this.scrollToBottom()
  }
  }

  scrollToBottom() {
    const node = ReactDOM.findDOMNode(this.postsEnd);
    node.scrollIntoView();
    }



  togglePostInput(){
    this.setState((prevState)=>({
      postInputOpen: !prevState.postInputOpen,
    }))

  }


  render() {
    var postList = []
    for (let post of this.props.posts) {

      postList.push(<Post key={post.id} post={post}
                    openLikeList={this.props.openLikeList}
                    deletePost={this.props.deletePost}
                    currentUser={this.props.currentUser}
                    openPostComments={this.props.openPostComments}>
                    </Post>)

    }

    return(
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
        <div className="well feed">
          <div className="feed-posts" id="scroll">
          {postList}
          <div ref={(el) => { this.postsEnd = el; }}></div>
          </div>
          <div style={{marginTop:'10px'}}>
          <button type="button" className="btn btn-primary"
             onClick={this.togglePostInput}>Write a new post!</button>
          <Collapse in={this.state.postInputOpen}>
            <div >
            <PostInputForm togglePostInput={this.togglePostInput} sendNewPost={this.props.sendNewPost}></PostInputForm>
          </div>
          </Collapse>
        </div>
        </div>
      </div>
      </div>
    )


  }

}
