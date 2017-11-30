import React from 'react'
import ReactDOM from 'react-dom'


export default class ProfileMain extends React.Component {
    constructor(props) {
      super(props)
      console.log(props.match)
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
      <div className="container-fluid" style={{marginTop:'10vh'}}>
  	   <img className="img-responsive center-block"
            src={this.state.profile.image}
            style={{maxHeight:'240px',width:'240px'}}/>
       <div className="row">
  	    <div className="col-sm-6 col-sm-offset-3"  >
  				<div className="well" style={{backgroundColor:'#ffffff',marginTop:'40px'}}>
    				<h1>User: {this.state.profile.username}</h1>

    				<p><b>Phone: {this.state.profile.phone}</b></p>
    				<p><b>Country: {this.state.profile.country}</b></p>
      			<button className="btn btn-primary" type="button"
               style={{marginTop:'20px'}}>Start conversation!</button>
  			  </div>
  	   </div>
		</div>
		</div>
      )
    }



}
