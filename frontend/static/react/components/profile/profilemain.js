import React from 'react'
import ReactDOM from 'react-dom'
import StartChatButton from './startnewchatbutton.js'

export default class ProfileMain extends React.Component {
    constructor(props) {
      super(props)
      
      this.state = {profile:false}
      this.updateProfile = this.updateProfile.bind(this)
    }

    componentDidMount() {
      this.updateProfile()
    }

    updateProfile() {
      var id = this.props.match.params.id
      $.ajax({
        type: 'GET',
        url: '/messages/user/'+id+'/api',
        success: function(profile){
          this.setState({
            profile:profile
          })

        }.bind(this)
        });
      }

    render() {
      return(
        <div className="row">
          <div className="col-md-8 col-md-offset-2">
          <div className="container-fluid" style={{marginTop:'10vh'}}>
      	   <img className="img-responsive center-block"
                src={this.state.profile.image}
                style={{maxHeight:'240px',width:'240px'}}/>

      				<div className="well" style={{backgroundColor:'#ffffff',marginTop:'40px'}}>
        				<h1>User: {this.state.profile.username}</h1>

        				<p><b>Phone: {this.state.profile.phone}</b></p>
        				<p><b>Country: {this.state.profile.country}</b></p>
          			<StartChatButton openChat = {this.props.openChat}
                                  userId={this.props.match.params.id}
                                  userName={this.state.profile.username}>
                </StartChatButton>
              </div>
            </div>
		      </div>
		</div>
      )
    }



}
