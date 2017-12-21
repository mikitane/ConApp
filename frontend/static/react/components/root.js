import React from 'react'
import ReactDOM from 'react-dom'
import NavbarCustom from './navbar.js'
import Sidebar from './sidebar/sidebar.js'
import ModalContent from './modal/modal.js'
import {Switch,Route} from 'react-router-dom'
import FeedMain from './feed/feedmain.js'
import ProfileMain from './profile/profilemain.js'

export default class Root extends React.Component {

  constructor(){
    super();
    this.state = {
      sideBarOpen:false,
      sidebarNeedsUpdate:false,
      modalContent:false,
      chatId:false,
      postId:false,
      modalTitle:false,
      modalOpen:false,
      currentUser:"",
      currentUserId:"",
      chatParticipants:"",
      profileNeedsUpdate:false

    };
    this.toggleSidebar = this.toggleSidebar.bind(this)
    this.openChat = this.openChat.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.openCreateNewGroupChat = this.openCreateNewGroupChat.bind(this)
    this.openLikeList = this.openLikeList.bind(this)
    this.updateSidebar = this.updateSidebar.bind(this)
    this.updateProfileContent = this.updateProfileContent.bind(this)
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
  		url: '/messages/ownprofile/api',
  		success: function(ownprofile){
        this.setState({
          currentUser: ownprofile.username,
          currentUserId:ownprofile.id
        });
      }.bind(this)
    });
  }

  toggleModal(){
    this.setState((prevState)=>({
      modalOpen:!prevState.modalOpen,

    }));
  }

  openChat(chatId,chatName,participants){
    this.setState({
      modalContent:'chat',
      chatId:chatId,
      modalTitle:chatName,
      chatParticipants:participants
    });
    this.toggleModal()

  }

  openLikeList(postId) {
    this.setState({
      modalContent:'likes',
      modalTitle:'Likes',
      postId:postId
    })
    this.toggleModal()
  }

  openCreateNewGroupChat() {
    this.setState({
      modalContent:'newgroupchat',
      modalTitle:'Create a new group chat!'
    })
    this.toggleModal()
  }

  toggleSidebar() {
    this.setState((prevState) => ({
      sideBarOpen:!prevState.sideBarOpen,
      sidebarNeedsUpdate:!prevState.sidebarNeedsUpdate
    }));
  }

  updateSidebar() {
    this.setState((prevState) => ({
      sidebarNeedsUpdate:!prevState.sidebarNeedsUpdate
    }))
  }

  updateProfileContent() {
    this.setState((prevState) => ({
      profileNeedsUpdate:!prevState.profileNeedsUpdate
    }))
  }


  render(){

    return(
      <div style={{overflowX:'hidden'}}>
        <NavbarCustom currentUser = {this.state.currentUser}
          toggleSidebar = {this.toggleSidebar}
          currentUserId={this.state.currentUserId}></NavbarCustom>

          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <Switch>
                <Route exact path="/"
                render={() => <FeedMain openLikeList= {this.openLikeList}
                              currentUser={this.state.currentUser} />} />
                <Route path="/profile/:id"
                render={(props) => <ProfileMain {...this.props} {...props}
                  openChat = {this.openChat} currentUser={this.state.currentUser}
                updateSidebar={this.updateSidebar}
                updateProfileContent={this.updateProfileContent}
                profileNeedsUpdate={this.state.profileNeedsUpdate}/>}
                  />
              </Switch>
            </div>
          </div>

        <Sidebar openCreateNewGroupChat={this.openCreateNewGroupChat}
          toggleSidebar = {this.toggleSidebar}
           width={this.state.sideBarOpen ? '300px':'0px'}
           openChat={this.openChat} currentUser={this.state.currentUser}
           sidebarNeedsUpdate={this.state.sidebarNeedsUpdate}
           updateSidebar={this.updateSidebar}></Sidebar>

         <ModalContent modalContent={this.state.modalContent} chatId={this.state.chatId}
           modalTitle={this.state.modalTitle} modalOpen={this.state.modalOpen}
           currentUser={this.state.currentUser}
           openChat={this.openChat} toggleModal={this.toggleModal}
           postId={this.state.postId} updateSidebar={this.updateSidebar}
           chatParticipants={this.state.chatParticipants}
           toggleSidebar={this.toggleSidebar}
           updateProfileContent ={this.updateProfileContent}>

         </ModalContent>
      </div>
    )
  }
}
