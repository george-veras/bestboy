import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { loadFile } from './../actions'

class FileSelector extends Component {
  render() {
    return (
      <Fragment>
        <input type="file" onChange={this.props.onFileSelection} />
        <div>
          {
            JSON.stringify(this.props.subtitles)
          }
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    subtitles: state.subtitles
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFileSelection: (e) => dispatch(loadFile(e))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileSelector)