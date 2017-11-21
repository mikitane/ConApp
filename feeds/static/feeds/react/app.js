import React from 'react'
import ReactDOM from 'react-dom'
import {SingleChatButton, ChatsList, ChatsListContent} from './components/sidebar.js'
import {Message,SingleChat} from './components/chat.js'








ReactDOM.render(
  <ChatsListContent></ChatsListContent>,
  document.getElementById('mySidenav')
);
