import React from 'react'
import ReactDOM from 'react-dom'
import Body from './components/body.js'


class App extends React.Component {

  render(){
    return(
      <Body></Body>
    )
  }
}




ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);
