import React, { Component } from 'react'
import { connect } from 'react-redux'

// import 

class FileSelector extends Component {
  render() {
    return (
      <input type="file" onChange={this.handleFileSelection} />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChange: () => dispatch(onChange)
  }
}

export default FileSelector
