import React from 'react'


export default class DeletePostButton extends React.Component {

  render() {


    return(
      <button className="btn deletePostButton" onClick={()=>this.props.deletePost(this.props.id)}>
          <span className="glyphicon glyphicon-remove"></span>
      </button>
    )
  }

}
