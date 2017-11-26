import React from 'react'
import ReactDOM from 'react-dom'
import ChatsListContent from './chatlist.js'


export default class Sidebar extends React.Component {

  render() {

    const sidebarWidth = {
      width: this.props.width
    }

      return (
        <div style={sidebarWidth} className="sidenav" >
          <ChatsListContent openCreateNewGroupChat={this.props.openCreateNewGroupChat}
            toggleSidebar = {this.props.toggleSidebar}
            openChat = {this.props.openChat}></ChatsListContent>
    	 </div>
      )
    }
}
