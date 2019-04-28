import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { handleFileLoading, handleSubtitlesShifting } from './../actions'

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
        <input type="button" onClick={this.shiftSubtitles} value="+1 second" />
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
    onFileSelection: (e) => dispatch(handleFileLoading(e)),
    shiftSubtitles: (e) => dispatch(handleSubtitlesShifting(e))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileSelector)
