import React from 'react'
import ReactDOM from 'react-dom'

import FeedContent from './feedcontent.js'

export default class FeedMain extends React.Component {

  render() {
    return(
      <FeedContent openLikeList={this.props.openLikeList}
        currentUser={this.props.currentUser}></FeedContent>
    )
  }


}
