import React from 'react'
import ReactDOM from 'react-dom'
import ProfileInfo from './profileinfo.js'
import ProfileChange from './profilechange.js'
import {Switch,Route} from 'react-router-dom'


export default class ProfileMain extends React.Component {
    constructor(props) {
      super(props)

      this.state = {profile:false}
      this.updateProfile = this.updateProfile.bind(this)
      this.saveProfileChanges = this.saveProfileChanges.bind(this)
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.profileNeedsUpdate) {
        this.updateProfile()
        this.props.updateProfileContent()
      }
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

    saveProfileChanges(phone,country,image) {
      var id = this.props.match.params.id
      var fd = new FormData();
      if (image != "") {
        fd.append('image',image);
      }
      fd.append('phone',phone)
      fd.append('country',country)

      $.ajax({
        url: '/messages/user/'+id+'/api/',
        data: fd,
        processData:false,
        contentType:false,
        type: 'POST',

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
                <Switch>
                  <Route exact path="/profile/:id"
                  render={() => <ProfileInfo profile={this.state.profile}
                                    currentUser={this.props.currentUser}
                                    userId={this.props.match.params.id}
                                  openChat = {this.props.openChat}
                                updateSidebar={this.props.updateSidebar}/> } />
                  <Route exact path="/profile/:id/change"
                  render={() => <ProfileChange profile={this.state.profile}
                                    currentUser={this.props.currentUser}
                                    userId={this.props.match.params.id}
                                  saveProfileChanges={this.saveProfileChanges}
                                  />} />
                </Switch>
              </div>
            </div>
		      </div>
		</div>
      )
    }



}
