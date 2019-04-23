import React, { Component } from 'react'
import { connect } from 'react-redux'

import { selectFile } from './../actions'

class FileSelector extends Component {
  render() {
    return (
      <input type="file" onChange={this.props.onFileSelection} />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFileSelection: (e) => dispatch(selectFile(e))
  }
}

export default connect(null, mapDispatchToProps)(FileSelector)
