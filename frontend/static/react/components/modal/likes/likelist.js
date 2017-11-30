import React from 'react'
import ReactDOM from 'react-dom'
import {Modal} from 'react-bootstrap'
import LikedUserButton from './likeduserbutton.js'

export default class LikeListContent extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      allLikes:{like_set:[],user_in_likes:false}
    }
    this.updateLikes = this.updateLikes.bind(this)
  }

  componentDidMount() {
    this.updateLikes()
  }

  updateLikes() {
    var id = this.props.postId
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


  render(){
    var likeList = []
    console.log(this.state.allLikes)
    for (let user of this.state.allLikes['like_set']) {
      likeList.push(<LikedUserButton key={user.id} id={user.id} image={user.image}
                    name={user.user}></LikedUserButton>)
    }

    const likeListStyle = {
      overflowY:'scroll',
      overflowX:'hidden',
      height:'500px',
      paddingLeft:'15px',
      paddingRight:'15px',

    }

    return(
      <Modal show={this.props.modalOpen} onHide={this.props.toggleModal}>
         <Modal.Header closeButton>
           <Modal.Title>{this.props.modalTitle}</Modal.Title>
         </Modal.Header>
         <Modal.Body style={{overflow:'auto'}}>
          <div style={likeListStyle}>
           {likeList}
         </div>
         </Modal.Body>
         <Modal.Footer>

         </Modal.Footer>
       </Modal>

      )
    }

}
