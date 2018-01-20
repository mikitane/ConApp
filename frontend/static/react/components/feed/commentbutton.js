import React from 'react'

export default class CommentButton extends React.Component {


    render() {
      return(

          <button className="btn btn-xs btn-primary comment"
            onClick={()=>this.props.openPostComments(this.props.id)}>
            <span className="glyphicon glyphicon-comment"
              style={{marginRight:"10px"}}></span>
            {this.props.count}
          </button>

      )
    }


}
