import React from 'react'
import ReactDOM from 'react-dom'


export default class SaveChangesButton extends React.Component {

  render() {
    return(
      <button className="btn btn-primary" onClick={this.props.saveChanges}>Save changes</button>
    )
  }


}
