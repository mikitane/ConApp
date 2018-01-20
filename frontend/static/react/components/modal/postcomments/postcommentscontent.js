import React from 'react'
import {Modal} from 'react-bootstrap'
import NewMessageInput from './sendcomment.js'
import SingleComment from './singlecomment.js'

export default class PostCommentsContent extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      comments:"",
    }
    this.updateComments = this.updateComments.bind(this)
    this.sendNewComment = this.sendNewComment.bind(this)
  }


  componentDidMount(){
    this.updateComments()
  }

  updateComments() {
    var id = this.props.id
    $.ajax({
      type: 'GET',
      url: '/post/'+id+'/comments/api/',
      success: function(comments){

        this.setState((prevState) => ({
          comments:comments,

        }));

      }.bind(this)
      });
  }

  sendNewComment(text){
    var data = {'text':text}
    var id = this.props.id
    $.ajax({

		type: 'POST',
		url: '/post/'+id+'/comments/api/',
		data: data,
		success: function(){
			this.updateComments()

		}.bind(this)

		});
  }

  render(){
  var commentList = []
  for (let comment of this.state.comments) {
    commentList.push(<SingleComment
      updateProfileContent={this.props.updateProfileContent}
      toggleModal={this.props.toggleModal}
      key={comment.id} comment={comment} />)
  }



    return(
    <Modal show={this.props.modalOpen} onHide={this.props.toggleModal}>
       <Modal.Header closeButton>
         <Modal.Title><p>Comments:</p></Modal.Title>
       </Modal.Header>
       <Modal.Body style={{overflow:'auto',height:'60vh'}}>
         <div className="modal-list">
           {commentList}
        </div>
       </Modal.Body>
       <Modal.Footer>
        <NewMessageInput sendNewComment={this.sendNewComment}></NewMessageInput>
       </Modal.Footer>
     </Modal>
   )
  }
}
